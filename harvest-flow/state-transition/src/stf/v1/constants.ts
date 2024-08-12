export const PARSER_KEYS = {
  contractDeployed: 'deployed',
  contractActivated: 'activated',
  nftMinted: 'minted',
  claimed: 'claimed',
  redeemed: 'redeemed',
  calcPoints: 'calcPoints',
  baseUri: 'baseUri',
  presaleStatus: 'presaleStatus',
  presalePrice: 'presalePrice',
  publicsaleStatus: 'publicsaleStatus',
  publicsalePrice: 'publicsalePrice',
  // https://github.com/PaimaStudios/paima-engine/issues/242#issuecomment-2282689670
  unused: 'unused',
} as const;

export const PARSER_PREFIXES = {
  [PARSER_KEYS.contractDeployed]: 'deployed',
  [PARSER_KEYS.contractActivated]: 'activated',
  [PARSER_KEYS.nftMinted]: 'minted',
  [PARSER_KEYS.claimed]: 'claimed',
  [PARSER_KEYS.redeemed]: 'redeemed',
  [PARSER_KEYS.calcPoints]: 'calcPoints',
  [PARSER_KEYS.baseUri]: 'baseUri',
  [PARSER_KEYS.presaleStatus]: 'presaleStatus',
  [PARSER_KEYS.presalePrice]: 'presalePrice',
  [PARSER_KEYS.publicsaleStatus]: 'publicsaleStatus',
  [PARSER_KEYS.publicsalePrice]: 'publicsalePrice',
  [PARSER_KEYS.unused]: 'unused',
} as const;

export const SECONDS_IN_DAY = 60 * 60 * 24;
