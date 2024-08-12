import type { SQLUpdate } from '@paima/node-sdk/db';
import type {
  IActivateContractParams,
  IAddMintedAmountParams,
  ISaveNewContractParams,
  ISetBaseUriParams,
  ISetPresalePriceParams,
  ISetPresaleStatusParams,
  ISetPublicsalePriceParams,
  ISetPublicsaleStatusParams,
} from '@harvest-flow/db';
import {
  activateContract,
  setBaseUri,
  setPresalePrice,
  setPresaleStatus,
  setPublicsalePrice,
  setPublicsaleStatus,
  addMintedAmount,
  saveNewContract,
} from '@harvest-flow/db';
import type { ContractParams } from '../types';

export function persistContractActivation(chainId: string, contractAddress: string): SQLUpdate {
  const activateContractParams: IActivateContractParams = {
    chainId: chainId,
    contractAddress: contractAddress,
  };

  return [activateContract, activateContractParams];
}

export function persistBaseUriChanged(
  chainId: string,
  contractAddress: string,
  newUri: string
): SQLUpdate {
  const params: ISetBaseUriParams = {
    chainId: chainId,
    contractAddress: contractAddress,
    base_uri: newUri,
  };

  return [setBaseUri, params];
}
export function persistPresaleStatusChanged(
  chainId: string,
  contractAddress: string,
  newStatus: boolean
): SQLUpdate {
  const params: ISetPresaleStatusParams = {
    chainId: chainId,
    contractAddress: contractAddress,
    status: newStatus,
  };

  return [setPresaleStatus, params];
}
export function persistPresalePriceChanged(
  chainId: string,
  contractAddress: string,
  newPrice: string
): SQLUpdate {
  const params: ISetPresalePriceParams = {
    chainId: chainId,
    contractAddress: contractAddress,
    price: BigInt(newPrice),
  };

  return [setPresalePrice, params];
}
export function persistPublicsaleStatusChanged(
  chainId: string,
  contractAddress: string,
  newStatus: boolean
): SQLUpdate {
  const params: ISetPublicsaleStatusParams = {
    chainId: chainId,
    contractAddress: contractAddress,
    status: newStatus,
  };

  return [setPublicsaleStatus, params];
}
export function persistPublicsalePriceChanged(
  chainId: string,
  contractAddress: string,
  newPrice: string
): SQLUpdate {
  const params: ISetPublicsalePriceParams = {
    chainId: chainId,
    contractAddress: contractAddress,
    price: BigInt(newPrice),
  };

  return [setPublicsalePrice, params];
}

export function updateMintedAmount(
  chainId: string,
  contractAddress: string,
  amount: bigint
): SQLUpdate {
  const addMintedAmountParams: IAddMintedAmountParams = {
    amount: amount.toString(),
    chainId: chainId,
    contractAddress: contractAddress,
  };
  return [addMintedAmount, addMintedAmountParams];
}

export function persistNewNftContract(params: ContractParams): SQLUpdate {
  const saveNewContractParams: ISaveNewContractParams = {
    name: params.name,
    symbol: params.symbol,
    address: params.contractAddress,
    chain_id: params.chainId,
    lease_end: params.maturity, // recall: maturity = params.lendingAt + params.lendingPeriod
    lease_start: params.lendingAt,
    metadata_base_url: params.baseURI,
    min_yield: params.yieldRate,
    presale_price: params.presalePrice,
    publicsale_price: params.publicsalePrice,
    supply_cap: params.cap,
    accepted_token: params.payableToken,
    owner: params.owner,
    signer_address: params.signerAddress,
    is_presale: params.isPresale,
    is_publicsale: params.isPublicsale,
  };

  return [saveNewContract, saveNewContractParams];
}
