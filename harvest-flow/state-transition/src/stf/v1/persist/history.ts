import {SQLUpdate} from "@paima/node-sdk/db";
import {ISaveTransactionParams, saveTransaction} from "@harvest-flow/db";

export function saveEventToHistory(
    eventType: "mint" | "claim",
    chainId: string,
    contractAddress: string,
    tokenId: string,
    amount: number,
    timestamp: Date,
    txHash: string
): SQLUpdate {
    const persistTransactionParams: ISaveTransactionParams = {
        type: eventType,
        amount: amount, // TODO Price
        chainId: chainId,
        contract_address: contractAddress,
        token_id: tokenId,
        timestamp: timestamp,
        tx_hash: txHash
    };

    return [saveTransaction, persistTransactionParams];
}
