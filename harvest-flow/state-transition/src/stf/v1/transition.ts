import {SQLUpdate, createScheduledData} from "@paima/node-sdk/db";
import {persistContractActivation, updateMintedAmount} from "./persist/contract";
import {CalcPointsInput, ClaimedInput, ContractActivatedInput, NftMintedInput, RedeemedInput} from "./types";
import {saveEventToHistory} from "./persist/history";
import {ethers} from "ethers";
import {ENV} from "@paima/sdk/utils";
import {persistTokenOwnership, updateClaimedYieldAmount, updateTokenRedeemed} from "./persist/tokens";
import {NftHistoryEventType} from "@harvest-flow/utils";
import {addUserPoints} from "./persist/points";
import {Pool} from "pg";
import {getActiveTokensByUsersAndContract, getContract} from "@harvest-flow/db";
import {PARSER_KEYS} from "./constants";

const contractAddress = process.env.TOKTOK_NFT_CONTRACT_ADDRESS!;
const chainId = process.env.CHAIN_ID!;
export const contractActivated = async (
    input : ContractActivatedInput
): Promise<SQLUpdate[]> => {

    console.log(`Contract ${contractAddress} activated on chain ${chainId}`);

    const persistActivation = persistContractActivation(chainId, contractAddress);
    return [persistActivation];
};

export const nftMinted = async (
    input : NftMintedInput,
    blockHeight: number,
    dbConn: Pool
): Promise<SQLUpdate[]> => {
    console.log(`NFT from ${input.startTokenId} to ${input.startTokenId + input.amount} minted for contract ${contractAddress} on chain ${chainId} for ${input.receiver} with cost ${input.cost}`);

    // get timestamp from blockheight
    const provider = new ethers.JsonRpcProvider(ENV.CHAIN_URI);
    const block = (await provider.getBlock(blockHeight,true))!;
    const timestamp = new Date(block.timestamp * 1000);

    // TODO: replace with new Paima feature
    // get transaction hash based on from and to values
    const mintingTransaction = block.prefetchedTransactions
        .find(transaction => transaction.from === input.receiver && transaction.to === contractAddress);

    const transactionHash = mintingTransaction?.hash ?? '0x0';

    const persistOwnerShips : SQLUpdate[] = [];
    const persistMintEvents : SQLUpdate[] = [];

    const pricePerToken = input.cost / input.amount;

    for (let i = 0; i < input.amount; i++) {
        const tokenId = input.startTokenId + BigInt(i);
        const persistOwnerShip = persistTokenOwnership(chainId, contractAddress, tokenId, input.receiver);
        persistOwnerShips.push(persistOwnerShip);

        const persistTransaction = saveEventToHistory(NftHistoryEventType.MINT,chainId, contractAddress, tokenId, pricePerToken, timestamp, transactionHash);
        persistMintEvents.push(persistTransaction);
    }

    const persistUpdateMintedAmount = updateMintedAmount(chainId, contractAddress, input.amount);

    const pointsForMinting = Number(ethers.formatEther(BigInt(await getNftPrice(contractAddress, dbConn)) * input.amount)) * 0.5;
    const addPointsForMinting = addUserPoints(input.receiver, pointsForMinting);

    return [
        persistUpdateMintedAmount,
        ...persistOwnerShips,
        ...persistMintEvents,
        addPointsForMinting
    ];

}

export const interestClaimed = async (
    input : ClaimedInput,
    blockHeight: number
): Promise<SQLUpdate[]> => {
    console.log(`Interest claimed for NFT ${input.tokenId} on chain ${chainId} for ${input.receiver} with amount ${input.amount}`);

    // get timestamp from blockheight
    const provider = new ethers.JsonRpcProvider(ENV.CHAIN_URI);
    const block = (await provider.getBlock(blockHeight,true))!;
    const timestamp = new Date(block.timestamp * 1000);


    // TODO: replace with new Paima feature
    // get transaction hash based on from and to values
    const claimTransaction = block.prefetchedTransactions
        .find(transaction => transaction.from === input.receiver && transaction.to === contractAddress);

    const transactionHash = claimTransaction?.hash ?? '0x0';

    const persistTransaction = saveEventToHistory(NftHistoryEventType.CLAIM,chainId, contractAddress, input.tokenId, input.amount, timestamp, transactionHash);
    const updateClaimedYield = updateClaimedYieldAmount(chainId, contractAddress, input.tokenId, input.amount);

    return [persistTransaction, updateClaimedYield];
}

export const principalRedeemed = async (
    input : RedeemedInput,
    blockHeight: number
): Promise<SQLUpdate[]> => {
    console.log(`Principal redeemed for NFT ${input.tokenId} on chain ${chainId} for ${input.receiver} with amount ${input.amount}`);

    // get timestamp from blockheight
    const provider = new ethers.JsonRpcProvider(ENV.CHAIN_URI);
    const block = (await provider.getBlock(blockHeight, true))!;
    const timestamp = new Date(block.timestamp * 1000);

    const redeemTransaction = block.prefetchedTransactions
        .find(transaction => transaction.from === input.receiver && transaction.to === contractAddress);

    const transactionHash = redeemTransaction?.hash ?? '0x0';

    return [
        saveEventToHistory(NftHistoryEventType.REDEEM, chainId, contractAddress, input.tokenId, input.amount, timestamp, transactionHash),
        updateTokenRedeemed(chainId, contractAddress, input.tokenId)
    ];
}

export const calculateDailyPoints = async (
    input : CalcPointsInput,
    dbConn: Pool
): Promise<SQLUpdate[]> => {
    console.log(`Calculating points`);
    const calculationReferenceTimestamp = new Date();

    const persistNextCalculation = createScheduledData(
        `${PARSER_KEYS.calcPoints}|${calculationReferenceTimestamp.getTime()}`,
        await getNextMidnightBlockHeight(calculationReferenceTimestamp)
    );

    const pointsByUsers = await getDailyPointsByUsers(new Date(input.lastCalculationTimestamp), calculationReferenceTimestamp, dbConn);
    const persistUsersPoints = [...pointsByUsers].map(([user, points]) => addUserPoints(user, points));

    return [
        persistNextCalculation,
        ...persistUsersPoints
    ];
}

async function getNftPrice(contractAddress : string, dbConn: Pool)  {
    const getContractDataResult = await getContract.run(
        {  address: contractAddress.toLowerCase(), chain_id: chainId, },
        dbConn
    );

    if(getContractDataResult.length !== 0) {
        return getContractDataResult[0].price;
    } else {
        throw new Error(`Contract not found: ${contractAddress}`);
    }
}

async function getNextMidnightBlockHeight  (
    currentReferenceTimestamp: Date,
): Promise<number> {
    const provider = new ethers.JsonRpcProvider(ENV.CHAIN_URI);

    const currentBlockNumber = await provider.getBlockNumber();
    const currentBlockTimestamp = (await provider.getBlock(currentBlockNumber))!.timestamp;

    // next execution will be next day at midnight
    const currentDate = new Date(currentReferenceTimestamp.getTime());
    currentDate.setHours(0,0,0,0);
    currentDate.setDate(currentDate.getDate() + 1);

    const nextExecutionTimestamp = currentDate.getTime() / 1000;
    const remainingTime = nextExecutionTimestamp - currentBlockTimestamp;
    const remainingBlocks = (remainingTime / ENV.BLOCK_TIME) >> 0;

    return  currentBlockNumber + remainingBlocks;

}

async function getDailyPointsByUsers(lastCalculationTimestamp: Date, currentReferenceTimestamp : Date, dbConn: Pool): Promise<Map<string,number>> {
    const usersPoints = new Map<string,number>();

    const getTokensByUsersAndContractResult = await getActiveTokensByUsersAndContract.run(
        void { },
        dbConn
    );

    for (const token of getTokensByUsersAndContractResult) {
        const lendingPeriod = token.lease_end.getTime() - token.lease_start.getTime();
        const pointsForHold = Number(ethers.formatEther(token.price)) * 0.5;
        const currentPeriodStart = Math.max(token.lease_start.getTime(), lastCalculationTimestamp.getTime());
        const currentPeriodEnd = Math.min(token.lease_end.getTime(), currentReferenceTimestamp.getTime());
        let currentPeriod = currentPeriodEnd - currentPeriodStart;
        if (currentPeriod < 0) {
            currentPeriod = 0;
        }

        const points = (token.token_ids?.length ?? 0) * pointsForHold * currentPeriod / lendingPeriod;

        if (usersPoints.has(token.owner_address)) {
            usersPoints.set(token.owner_address, usersPoints.get(token.owner_address)! + points);
        } else {
            usersPoints.set(token.owner_address, points);
        }
    }

    return usersPoints;
}
