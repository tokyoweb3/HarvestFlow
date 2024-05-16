import {SQLUpdate} from "@paima/node-sdk/db";
import {IInsertTokenParams, insertToken} from "@harvest-flow/db";


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