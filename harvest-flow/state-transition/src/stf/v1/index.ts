import type { SQLUpdate } from '@paima/node-sdk/db';
import { getDynamicExtensionByName } from '@paima/node-sdk/utils-backend';
import type { Pool } from 'pg';
import type Prando from '@paima/sdk/prando';
import type { BlockHeader, STFSubmittedData } from '@paima/sdk/utils';
import parse, { isInvalid } from './parser';
import { PARSER_KEYS } from './constants';
import {
  calculateDailyPoints,
  contractActivated,
  contractDeployed,
  interestClaimed,
  nftMinted,
  principalRedeemed,
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
      return contractDeployed(expanded);
    case PARSER_KEYS.contractActivated:
      return contractActivated(
        expanded,
        await getContractAddressForEvent(dbConn, inputData.extensionName!)
      );
    case PARSER_KEYS.nftMinted:
      return nftMinted(
        expanded,
        await getContractAddressForEvent(dbConn, inputData.extensionName!),
        inputData.scheduledTxHash ?? '',
        blockHeader,
        dbConn
      );
    case PARSER_KEYS.claimed:
      return interestClaimed(
        expanded,
        await getContractAddressForEvent(dbConn, inputData.extensionName!),
        inputData.scheduledTxHash ?? '',
        blockHeader
      );
    case PARSER_KEYS.redeemed:
      return principalRedeemed(
        expanded,
        await getContractAddressForEvent(dbConn, inputData.extensionName!),
        inputData.scheduledTxHash ?? '',
        blockHeader
      );
    case PARSER_KEYS.calcPoints:
      return calculateDailyPoints(expanded, dbConn, blockHeader);
    default:
      return [];
  }
}

async function getContractAddressForEvent(dbConn: Pool, extensionName: string): Promise<string> {
  const contract = await getDynamicExtensionByName(dbConn, extensionName);
  return contract[0].contractAddress;
}
