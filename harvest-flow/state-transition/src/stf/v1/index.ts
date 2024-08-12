import type { SQLUpdate } from '@paima/node-sdk/db';
import { getDynamicExtensionByName } from '@paima/node-sdk/utils-backend';
import type { Pool } from 'pg';
import type Prando from '@paima/sdk/prando';
import type { BlockHeader, STFSubmittedData } from '@paima/sdk/utils';
import parse, { isInvalid } from './parser';
import { PARSER_KEYS } from './constants';
import {
  baseUriChanged,
  calculateDailyPoints,
  contractActivated,
  contractDeployed,
  interestClaimed,
  nftMinted,
  presalePriceChanged,
  presaleStatusChanged,
  principalRedeemed,
  publicsalePriceChanged,
  publicsaleStatusChanged,
} from './transition';

export default async function (
  inputData: STFSubmittedData,
  blockHeader: BlockHeader,
  randomnessGenerator: Prando,
  dbConn: Pool
): Promise<SQLUpdate[]> {
  console.log(inputData, 'parsing input data');
  console.log(`Processing input string: ${inputData.inputData}`);
  const expanded = parse(inputData.inputData);
  if (isInvalid(expanded)) {
    console.log(`Invalid input string`);
    return [];
  }
  console.log(`Input string parsed as: ${expanded.input}`);
  console.log(expanded, 'expanded input');

  switch (expanded.input) {
    case PARSER_KEYS.contractDeployed:
      return contractDeployed(expanded, inputData.caip2!, blockHeader);
    case PARSER_KEYS.contractActivated:
      return contractActivated(
        expanded,
        inputData.caip2!,
        await getContractAddressForEvent(dbConn, inputData.extensionName!)
      );
    case PARSER_KEYS.nftMinted:
      return nftMinted(
        expanded,
        inputData.caip2!,
        await getContractAddressForEvent(dbConn, inputData.extensionName!),
        inputData.scheduledTxHash ?? '',
        inputData.txHash,
        blockHeader,
        dbConn
      );
    case PARSER_KEYS.claimed:
      return interestClaimed(
        expanded,
        inputData.caip2!,
        await getContractAddressForEvent(dbConn, inputData.extensionName!),
        inputData.scheduledTxHash ?? '',
        inputData.txHash,
        blockHeader
      );
    case PARSER_KEYS.redeemed:
      return principalRedeemed(
        expanded,
        inputData.caip2!,
        await getContractAddressForEvent(dbConn, inputData.extensionName!),
        inputData.scheduledTxHash ?? '',
        inputData.txHash,
        blockHeader
      );
    case PARSER_KEYS.calcPoints:
      return calculateDailyPoints(expanded, dbConn, blockHeader);
    case PARSER_KEYS.baseUri:
      return baseUriChanged(
        expanded,
        inputData.caip2!,
        await getContractAddressForEvent(dbConn, inputData.extensionName!)
      );
    case PARSER_KEYS.presaleStatus:
      return presaleStatusChanged(
        expanded,
        inputData.caip2!,
        await getContractAddressForEvent(dbConn, inputData.extensionName!)
      );
    case PARSER_KEYS.presalePrice:
      return presalePriceChanged(
        expanded,
        inputData.caip2!,
        await getContractAddressForEvent(dbConn, inputData.extensionName!)
      );
    case PARSER_KEYS.publicsaleStatus:
      return publicsaleStatusChanged(
        expanded,
        inputData.caip2!,
        await getContractAddressForEvent(dbConn, inputData.extensionName!)
      );
    case PARSER_KEYS.publicsalePrice:
      return publicsalePriceChanged(
        expanded,
        inputData.caip2!,
        await getContractAddressForEvent(dbConn, inputData.extensionName!)
      );
    case PARSER_KEYS.unused:
      return [];
    default:
      return [];
  }
}

async function getContractAddressForEvent(dbConn: Pool, extensionName: string): Promise<string> {
  const contract = await getDynamicExtensionByName(dbConn, extensionName);
  return contract[0].contractAddress;
}
