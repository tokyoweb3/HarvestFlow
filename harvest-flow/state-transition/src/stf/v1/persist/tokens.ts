import type { SQLUpdate } from '@paima/node-sdk/db';
import type {
  IAddClaimedAmountToTokenParams,
  IInsertTokenParams,
  ISetTokenRedeemedParams,
} from '@harvest-flow/db';
import { addClaimedAmountToToken, insertToken, setTokenRedeemed } from '@harvest-flow/db';

export function persistTokenOwnership(
  chainId: string,
  contractAddress: string,
  tokenId: bigint,
  minter: string
): SQLUpdate {
  const persistTokenOwnershipParams: IInsertTokenParams = {
    chainId: chainId,
    contract_address: contractAddress,
    minter_address: minter,
    token_id: tokenId,
  };

  return [insertToken, persistTokenOwnershipParams];
}

export function updateClaimedYieldAmount(
  chainId: string,
  contractAddress: string,
  tokenId: bigint,
  claimedYieldAmount: bigint
): SQLUpdate {
  const updateClaimedYieldParams: IAddClaimedAmountToTokenParams = {
    chainId: chainId,
    contractAddress: contractAddress,
    tokenId: tokenId.toString(),
    amount: claimedYieldAmount.toString(),
  };

  return [addClaimedAmountToToken, updateClaimedYieldParams];
}

export function updateTokenRedeemed(
  chainId: string,
  contractAddress: string,
  tokenId: bigint
): SQLUpdate {
  const setTokenRedeemedParams: ISetTokenRedeemedParams = {
    chainId: chainId,
    contractAddress: contractAddress,
    tokenId: tokenId.toString(),
  };

  return [setTokenRedeemed, setTokenRedeemedParams];
}
