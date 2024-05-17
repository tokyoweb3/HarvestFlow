export type ParsedSubmittedInputRaw =
    | InvalidInput
    | ContractActivatedInput


export type ManualParsedSubmittedInput =
    | NftMintedInput
    | ClaimedInput
    | RedeemedInput

export type ParsedSubmittedInput =
    | InvalidInput
    | ContractActivatedInput
    | ManualParsedSubmittedInput



export interface InvalidInput {
    input : 'invalidString'
}
export interface ContractActivatedInput {
    input : 'activated'
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