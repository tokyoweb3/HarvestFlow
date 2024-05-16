export const PARSER_KEYS = {
    contractActivated: 'activated',
    nftMinted: 'minted',
    claimed: 'claimed',
} as const;

export const PARSER_PREFIXES = {
    [PARSER_KEYS.contractActivated]: 'activated',
    [PARSER_KEYS.nftMinted]: 'minted',
    [PARSER_KEYS.claimed]: 'claimed',

} as const;