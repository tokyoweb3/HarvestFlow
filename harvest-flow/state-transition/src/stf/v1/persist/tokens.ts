import {SQLUpdate} from "@paima/node-sdk/db";
import {
    addClaimedAmountToToken,
    IAddClaimedAmountToTokenParams,
    IInsertTokenParams,
    insertToken, ISetTokenRedeemedParams,
    setTokenRedeemed,
} from "@harvest-flow/db";


export function persistTokenOwnership(
  chainId: string,
  contractAddress: string,
  tokenId: bigint,
  owner: string,
): SQLUpdate {
  const persistTokenOwnershipParams: IInsertTokenParams = {
      chainId: chainId,
      contract_address: contractAddress,
      owner_address: owner,
      token_id: tokenId,
  };

  return [insertToken, persistTokenOwnershipParams];
}

export function updateClaimedYieldAmount(
  chainId: string,
  contractAddress: string,
  tokenId: bigint,
  claimedYieldAmount: bigint,
): SQLUpdate {
  const updateClaimedYieldParams: IAddClaimedAmountToTokenParams = {
      chainId: chainId,
      contractAddress: contractAddress,
      tokenId: tokenId,
      amount: claimedYieldAmount,
  };

  return [addClaimedAmountToToken, updateClaimedYieldParams];
}

export function updateTokenRedeemed(
  chainId: string,
  contractAddress: string,
  tokenId: bigint,
): SQLUpdate {
  const setTokenRedeemedParams: ISetTokenRedeemedParams = {
      chainId: chainId,
      contractAddress: contractAddress,
      tokenId: tokenId,
  };

  return [setTokenRedeemed, setTokenRedeemedParams];
}