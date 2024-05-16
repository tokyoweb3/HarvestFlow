import {SQLUpdate} from "@paima/node-sdk/db";
import {persistContractActivation, updateMintedAmount} from "./persist/contract";
import {ClaimedInput, ContractActivatedInput, NftMintedInput} from "./types";
import {persistMintOwnership} from "./persist/ownership";
import {saveEventToHistory} from "./persist/history";
import {ethers} from "ethers";
import {ENV} from "@paima/sdk/utils";

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
    console.log(`NFT ${input.tokenId} minted for contract ${contractAddress} on chain ${chainId} for ${input.receiver} with amount ${input.amount}`);

    // get timestamp from blockheight
    const provider = new ethers.JsonRpcProvider(ENV.CHAIN_URI);
    const block = (await provider.getBlock(blockHeight,true))!;
    const timestamp = new Date(block.timestamp * 1000);

    // get transaction hash based on from and to values
    const mintingTransaction = block.prefetchedTransactions
        .find(transaction => transaction.from === input.receiver && transaction.to === contractAddress);

    const transactionHash = mintingTransaction?.hash ?? '0x0';

    const persistOwnerShip = persistMintOwnership(chainId, contractAddress, input.tokenId, input.receiver, input.amount);
    const persistUpdateMintedAmount = updateMintedAmount(chainId, contractAddress, input.amount);
    const persistTransaction = saveEventToHistory("mint",chainId, contractAddress, input.tokenId, input.amount, timestamp, transactionHash);
    return [persistOwnerShip, persistUpdateMintedAmount, persistTransaction];

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
    const mintingTransaction = block.prefetchedTransactions
        .find(transaction => transaction.from === input.receiver && transaction.to === contractAddress);

    const transactionHash = mintingTransaction?.hash ?? '0x0';

    const persistTransaction = saveEventToHistory("claim",chainId, contractAddress, input.tokenId, input.amount, timestamp, transactionHash);
    return [persistTransaction];
}