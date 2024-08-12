import type { SQLUpdate } from '@paima/node-sdk/db';
import type { ISaveTransactionParams } from '@harvest-flow/db';
import { saveTransaction } from '@harvest-flow/db';
import type { NftHistoryEventType } from '@harvest-flow/utils';

export function saveEventToHistory(
  eventType: NftHistoryEventType,
  chainId: string,
  ownerAddress: string,
  contractAddress: string,
  tokenId: bigint,
  amount: bigint,
  timestamp: Date,
  evmTxHash: string,
  paimaTxHash: string
): SQLUpdate {
  const persistTransactionParams: ISaveTransactionParams = {
    type: eventType,
    amount: amount,
    chainId: chainId,
    owner_address: ownerAddress,
    contract_address: contractAddress,
    token_id: tokenId,
    timestamp: timestamp,
    evm_tx_hash: evmTxHash,
    paima_tx_hash: paimaTxHash,
  };

  return [saveTransaction, persistTransactionParams];
}
