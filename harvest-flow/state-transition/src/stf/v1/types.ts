export type ParsedSubmittedInputRaw =
    | InvalidInput
    | ContractActivatedInput
    | CalcPointsInput


export type ManualParsedSubmittedInput =
  | ContractDeployedInput
    | NftMintedInput
    | ClaimedInput
    | RedeemedInput

export type ParsedSubmittedInput =
    | ParsedSubmittedInputRaw
    | ManualParsedSubmittedInput



export interface InvalidInput {
    input : 'invalidString'
}

export interface ContractDeployedInput {
    input: "deployed";
    nftAddress: string;
}
export interface ContractActivatedInput {
    input : 'activated'
}

export interface CalcPointsInput {
    input : 'calcPoints'
    lastCalculationTimestamp : number
}

export interface NftMintedInput {
    input : 'minted'
    receiver : string
    startTokenId : bigint
    amount : bigint
    cost : bigint
}

export interface ClaimedInput {
    input : 'claimed'
    receiver : string
    tokenId : bigint
    amount : bigint
}

export interface RedeemedInput {
    input : 'redeemed'
    receiver : string
    tokenId : bigint
    amount : bigint
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
    publicPrice: bigint;
}