import { SQLUpdate } from "@paima/node-sdk/db";
import {
  activateContract,
  addMintedAmount,
  IActivateContractParams,
  IAddMintedAmountParams,
  ISaveNewContractParams,
  saveNewContract
} from "@harvest-flow/db";
import { ContractParams } from "../types";

export function persistContractActivation(
    chainId: string,
    contractAddress: string
): SQLUpdate {

  const activateContractParams : IActivateContractParams = {
    chainId: chainId,
    contractAddress: contractAddress,
  }

  return [activateContract, activateContractParams];
}

export function updateMintedAmount(
    chainId: string,
    contractAddress: string,
    amount: bigint
): SQLUpdate {
  const addMintedAmountParams : IAddMintedAmountParams = {
    amount : amount.toString(),
    chainId: chainId,
    contractAddress: contractAddress,
  }
  return [addMintedAmount,  addMintedAmountParams];
}

export function persistNewNftContract(params: ContractParams): SQLUpdate {
  const saveNewContractParams: ISaveNewContractParams = {
    name: params.name,
    symbol: params.symbol,
    address: params.contractAddress,
    chain_id: params.chainId,
    lease_end: params.maturity,
    lease_start: params.lendingAt,
    metadata_base_url: params.baseURI,
    min_yield: params.yieldRate,
    price: params.publicPrice,
    supply_cap: params.cap,
    accepted_token: params.payableToken
  };

  return [saveNewContract, saveNewContractParams];
}