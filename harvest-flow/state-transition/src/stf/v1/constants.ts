export const PARSER_KEYS = {
  contractDeployed: 'deployed',
  contractActivated: 'activated',
  nftMinted: 'minted',
  claimed: 'claimed',
  redeemed: 'redeemed',
  calcPoints: 'calcPoints',
} as const;

export const PARSER_PREFIXES = {
  [PARSER_KEYS.contractDeployed]: 'deployed',
  [PARSER_KEYS.contractActivated]: 'activated',
  [PARSER_KEYS.nftMinted]: 'minted',
  [PARSER_KEYS.claimed]: 'claimed',
  [PARSER_KEYS.redeemed]: 'redeemed',
  [PARSER_KEYS.calcPoints]: 'calcPoints',
} as const;

export const SECONDS_IN_DAY = 60 * 60 * 24;
