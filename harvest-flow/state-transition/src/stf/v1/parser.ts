import type { ParserRecord } from '@paima/sdk/concise';
import { PaimaParser } from '@paima/sdk/concise';
import type {
  CalcPointsInput,
  ClaimedInput,
  ContractActivatedInput,
  ContractDeployedInput,
  InvalidInput,
  ManualParsedSubmittedInput,
  NftMintedInput,
  ParsedSubmittedInput,
  ParsedSubmittedInputRaw,
  RedeemedInput,
} from './types';
import { PARSER_KEYS, PARSER_PREFIXES } from './constants';
import type { ValuesType } from 'utility-types';

function pref(key: ValuesType<typeof PARSER_KEYS>): string {
  return `${key} = ${PARSER_PREFIXES[key]}|`;
}

const myGrammar = `
${pref(PARSER_KEYS.contractActivated)}
${pref(PARSER_KEYS.calcPoints)}lastCalculationTimestamp
`;

const contractActivated: ParserRecord<ContractActivatedInput> = {};

const calcPoints: ParserRecord<CalcPointsInput> = {
  lastCalculationTimestamp: PaimaParser.NumberParser(),
};

const parserCommands: Partial<
  Record<ValuesType<typeof PARSER_KEYS>, ParserRecord<ParsedSubmittedInputRaw>>
> = {
  [PARSER_KEYS.contractActivated]: contractActivated,
  [PARSER_KEYS.calcPoints]: calcPoints,
};

function manualParse(input: string): undefined | ManualParsedSubmittedInput {
  const parts = input.split('|');

  if (parts.length !== 2) return;

  const manuallyParsedPrefixes: string[] = [
    PARSER_PREFIXES[PARSER_KEYS.contractDeployed],
    PARSER_PREFIXES[PARSER_KEYS.nftMinted],
    PARSER_PREFIXES[PARSER_KEYS.claimed],
    PARSER_PREFIXES[PARSER_KEYS.redeemed],
  ];
  if (!manuallyParsedPrefixes.includes(parts[0])) return;

  try {
    const parsed = JSON.parse(parts[1]);

    switch (parts[0]) {
      case PARSER_PREFIXES[PARSER_KEYS.contractDeployed]:
        return parseDeployed(parsed);
      case PARSER_PREFIXES[PARSER_KEYS.nftMinted]:
        return parseMinted(parsed);
      case PARSER_PREFIXES[PARSER_KEYS.claimed]:
        return parseClaimed(parsed);
      case PARSER_PREFIXES[PARSER_KEYS.redeemed]:
        return parseRedeemed(parsed);

      default:
        return;
    }
  } catch (e) {
    console.log(e, 'Manual parsing error');
    return;
  }
}

const myParser = new PaimaParser(myGrammar, parserCommands);

function parse(input: string): ParsedSubmittedInput {
  const manuallyParsed = manualParse(input);
  if (manuallyParsed != null) return manuallyParsed;

  try {
    const parsed = myParser.start(input);

    return { input: parsed.command, ...parsed.args } as any;
  } catch (e) {
    console.log(e, 'Parsing error');
    return { input: 'invalidString' };
  }
}

export function isInvalid(input: ParsedSubmittedInput): input is InvalidInput {
  return (input as InvalidInput).input == 'invalidString';
}

function parseDeployed(jsonData: any): ContractDeployedInput | undefined {
  if (!Object.hasOwn(jsonData, 'nft') || typeof jsonData.nft !== 'string') {
    return;
  }

  return {
    input: PARSER_KEYS.contractDeployed,
    nftAddress: jsonData.nft,
  };
}
function parseMinted(jsonData: any): NftMintedInput | undefined {
  if (
    !Object.hasOwn(jsonData, 'receiver') ||
    !Object.hasOwn(jsonData, 'startTokenId') ||
    !Object.hasOwn(jsonData, 'amount') ||
    !Object.hasOwn(jsonData, 'cost') ||
    typeof jsonData.receiver !== 'string' ||
    typeof jsonData.startTokenId !== 'string' ||
    typeof jsonData.amount !== 'string' ||
    typeof jsonData.cost !== 'string'
  ) {
    return;
  }

  return {
    input: PARSER_KEYS.nftMinted,
    receiver: jsonData.receiver,
    startTokenId: BigInt(jsonData.startTokenId),
    amount: BigInt(jsonData.amount),
    cost: BigInt(jsonData.cost),
  };
}

function parseClaimed(jsonData: any): ClaimedInput | undefined {
  if (
    !Object.hasOwn(jsonData, 'receiver') ||
    !Object.hasOwn(jsonData, 'tokenId') ||
    !Object.hasOwn(jsonData, 'amount') ||
    typeof jsonData.receiver !== 'string' ||
    typeof jsonData.tokenId !== 'string' ||
    typeof jsonData.amount !== 'string'
  ) {
    return;
  }

  return {
    input: PARSER_KEYS.claimed,
    receiver: jsonData.receiver,
    tokenId: BigInt(jsonData.tokenId),
    amount: BigInt(jsonData.amount),
  };
}

function parseRedeemed(jsonData: any): RedeemedInput | undefined {
  if (
    !Object.hasOwn(jsonData, 'receiver') ||
    !Object.hasOwn(jsonData, 'tokenId') ||
    !Object.hasOwn(jsonData, 'amount') ||
    typeof jsonData.receiver !== 'string' ||
    typeof jsonData.tokenId !== 'string' ||
    typeof jsonData.amount !== 'string'
  ) {
    return;
  }

  return {
    input: PARSER_KEYS.redeemed,
    receiver: jsonData.receiver,
    tokenId: BigInt(jsonData.tokenId),
    amount: BigInt(jsonData.amount),
  };
}

export default parse;
