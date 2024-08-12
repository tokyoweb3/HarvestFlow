export type ParsedSubmittedInputRaw = InvalidInput | ContractActivatedInput | CalcPointsInput;

export type ManualParsedSubmittedInput =
  | ContractDeployedInput
  | NftMintedInput
  | ClaimedInput
  | RedeemedInput
  | BaseUriInput
  | PresaleStatusInput
  | PresalePriceInput
  | PublicsaleStatusInput
  | PublicsalePriceInput
  | UnusedInput;

export type ParsedSubmittedInput = ParsedSubmittedInputRaw | ManualParsedSubmittedInput;

export interface InvalidInput {
  input: 'invalidString';
}

export interface ContractDeployedInput {
  input: 'deployed';
  nftAddress: string;
}
export interface ContractActivatedInput {
  input: 'activated';
}

export interface CalcPointsInput {
  input: 'calcPoints';
  lastCalculationTimestamp: number;
}

export interface NftMintedInput {
  input: 'minted';
  receiver: string;
  startTokenId: bigint;
  amount: bigint;
  cost: bigint;
}

export interface ClaimedInput {
  input: 'claimed';
  receiver: string;
  tokenId: bigint;
  amount: bigint;
}

export interface RedeemedInput {
  input: 'redeemed';
  receiver: string;
  tokenId: bigint;
  amount: bigint;
}

export interface BaseUriInput {
  input: 'baseUri';
  newBaseURI: string;
}
export interface PresaleStatusInput {
  input: 'presaleStatus';
  newValue: boolean;
}
export interface PresalePriceInput {
  input: 'presalePrice';
  oldPrice: string;
  newPrice: string;
}
export interface PublicsaleStatusInput {
  input: 'publicsaleStatus';
  newValue: boolean;
}
export interface PublicsalePriceInput {
  input: 'publicsalePrice';
  oldPrice: string;
  newPrice: string;
}

export interface UnusedInput {
  input: 'unused';
}

export interface ContractParams {
  chainId: string;
  contractAddress: string;
  name: string;
  symbol: string;
  cap: bigint;
  baseURI: string;
  payableToken: string;
  lendingAt: Date;
  yieldRate: bigint;
  maturity: Date;
  presalePrice: bigint;
  publicsalePrice: bigint;
  owner: string;
  signerAddress: string;
  isPresale: boolean;
  isPublicsale: boolean;
}
