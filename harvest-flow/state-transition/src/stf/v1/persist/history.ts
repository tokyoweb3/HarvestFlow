
import {SQLUpdate} from "@paima/node-sdk/db";
import {ISaveTransactionParams, saveTransaction} from "@harvest-flow/db";

export function saveMintTransaction(
    chainId: string,
    contractAddress: string,
    tokenId: string,
    amount: number,
    timestamp: Date
): SQLUpdate {
    const persistTransactionParams: ISaveTransactionParams = {
        type: "mint",
        amount: amount, // TODO Price
        chainId: chainId,
        contract_address: contractAddress,
        token_id: tokenId,
        timestamp: timestamp,
    };

    return [saveTransaction, persistTransactionParams];
}
