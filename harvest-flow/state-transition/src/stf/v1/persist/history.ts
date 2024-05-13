import {ISaveTransactionParams, saveTransaction} from "@harvest-flow/db/build/insert.queries";
import {SQLUpdate} from "@paima/node-sdk/db";

export function saveMintTransaction(
    chainId: string,
    contractAddress: string,
    tokenId: string,
    owner: string,
    amount: number,
): SQLUpdate {
    const persistTransactionParams: ISaveTransactionParams = {
        type: "mint",
        amount: amount, // TODO Price
        chainId: chainId,
        contract_address: contractAddress,
        token_id: tokenId,
        timestamp: new Date(), // TODO get from blockheight
    };

    return [saveTransaction, persistTransactionParams];
}
