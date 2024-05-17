export const PARSER_KEYS = {
    contractActivated: 'activated',
    nftMinted: 'minted',
    claimed: 'claimed',
    redeemed: 'redeemed',
} as const;

export const PARSER_PREFIXES = {
    [PARSER_KEYS.contractActivated]: 'activated',
    [PARSER_KEYS.nftMinted]: 'minted',
    [PARSER_KEYS.claimed]: 'claimed',
    [PARSER_KEYS.redeemed]: 'redeemed',

} as const;