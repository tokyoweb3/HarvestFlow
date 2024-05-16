export type ParsedSubmittedInputRaw =
    | InvalidInput
    | ContractActivatedInput


export type ManualParsedSubmittedInput =
    | NftMintedInput
    | ClaimedInput

export type ParsedSubmittedInput =
    | InvalidInput
    | ContractActivatedInput
    | NftMintedInput
    | ClaimedInput


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