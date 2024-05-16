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
    tokenId : string
    amount : number
}

export interface ClaimedInput {
    input : 'claimed'
    receiver : string
    tokenId : string
    amount : number
}