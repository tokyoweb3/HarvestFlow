export const BLOCK_TIME = Number.parseInt(process.env.BLOCK_TIME);

/**
 * DANGER: This is just an approximation
 * 31536000000 = 365 * 24 * 60 * 60 * 1000
 * But this doesn't take into account leap years, etc.
 */
export const YEAR_IN_MS = 31536000000 as const;

export const CHAIN_EXPLORER_URI = process.env.CHAIN_EXPLORER_URI;

export const NUMBER_OF_DECIMAL_PLACES = 2;
