import type { SQLUpdate } from '@paima/node-sdk/db';
import type { ISaveTransactionParams } from '@harvest-flow/db';
import { saveTransaction } from '@harvest-flow/db';
import type { NftHistoryEventType } from '@harvest-flow/utils';

export function saveEventToHistory(
  eventType: NftHistoryEventType,
  chainId: string,
  contractAddress: string,
  tokenId: bigint,
  amount: bigint,
  timestamp: Date,
  txHash: string
): SQLUpdate {
  const persistTransactionParams: ISaveTransactionParams = {
    type: eventType,
    amount: amount,
    chainId: chainId,
    contract_address: contractAddress,
    token_id: tokenId,
    timestamp: timestamp,
    tx_hash: txHash,
  };

  return [saveTransaction, persistTransactionParams];
}
