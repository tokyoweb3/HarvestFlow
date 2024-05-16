import {SQLUpdate} from "@paima/node-sdk/db";
import {persistContractActivation, updateMintedAmount} from "./persist/contract";
import {ClaimedInput, ContractActivatedInput, NftMintedInput} from "./types";
import {saveEventToHistory} from "./persist/history";
import {ethers} from "ethers";
import {ENV} from "@paima/sdk/utils";
import {persistTokenOwnership} from "./persist/ownership";
import {NftHistoryEventType} from "@harvest-flow/utils";

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
    blockHeight: number
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
    return persistOwnerShips.concat([persistUpdateMintedAmount], persistMintEvents);

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
    return [persistTransaction];
}