/** Types generated for queries found in "src/queries/select.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type NumberOrString = number | string;

export type bigintArray = (bigint)[];

/** 'GetContract' parameters type */
export interface IGetContractParams {
  address?: string | null | void;
  chain_id?: string | null | void;
}

/** 'GetContract' return type */
export interface IGetContractResult {
  accepted_token: string;
  activated: boolean;
  address: string;
  chain_id: string;
  lease_end: Date;
  lease_start: Date;
  metadata_base_url: string | null;
  min_yield: string;
  minted_amount: string;
  name: string;
  price: string;
  supply_cap: string;
  symbol: string;
}

/** 'GetContract' query type */
export interface IGetContractQuery {
  params: IGetContractParams;
  result: IGetContractResult;
}

const getContractIR: any = {"usedParamSet":{"chain_id":true,"address":true},"params":[{"name":"chain_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":51,"b":59}]},{"name":"address","required":false,"transform":{"type":"scalar"},"locs":[{"a":91,"b":98}]}],"statement":"SELECT *\nFROM contracts\nWHERE contracts.chain_id = :chain_id AND contracts.address = LOWER(:address)"};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM contracts
 * WHERE contracts.chain_id = :chain_id AND contracts.address = LOWER(:address)
 * ```
 */
export const getContract = new PreparedQuery<IGetContractParams,IGetContractResult>(getContractIR);


/** 'GetContractsList' parameters type */
export interface IGetContractsListParams {
  just_activated?: boolean | null | void;
}

/** 'GetContractsList' return type */
export interface IGetContractsListResult {
  address: string;
  chain_id: string;
  lease_end: Date;
  lease_start: Date;
  name: string;
  symbol: string;
}

/** 'GetContractsList' query type */
export interface IGetContractsListQuery {
  params: IGetContractsListParams;
  result: IGetContractsListResult;
}

const getContractsListIR: any = {"usedParamSet":{"just_activated":true},"params":[{"name":"just_activated","required":false,"transform":{"type":"scalar"},"locs":[{"a":132,"b":146},{"a":157,"b":171}]}],"statement":"SELECT name,\n       symbol,\n       address,\n       chain_id,\n       lease_start,\n       lease_end\nFROM contracts\nWHERE (activated = :just_activated)\n    OR (:just_activated = false)"};

/**
 * Query generated from SQL:
 * ```
 * SELECT name,
 *        symbol,
 *        address,
 *        chain_id,
 *        lease_start,
 *        lease_end
 * FROM contracts
 * WHERE (activated = :just_activated)
 *     OR (:just_activated = false)
 * ```
 */
export const getContractsList = new PreparedQuery<IGetContractsListParams,IGetContractsListResult>(getContractsListIR);


/** 'GetHistoryForContract' parameters type */
export interface IGetHistoryForContractParams {
  chain_id?: string | null | void;
  contract_address?: string | null | void;
}

/** 'GetHistoryForContract' return type */
export interface IGetHistoryForContractResult {
  amount: string | null;
  chain_id: string;
  contract_address: string;
  timestamp: Date;
  token_id: string;
  tx_hash: string;
  type: string;
}

/** 'GetHistoryForContract' query type */
export interface IGetHistoryForContractQuery {
  params: IGetHistoryForContractParams;
  result: IGetHistoryForContractResult;
}

const getHistoryForContractIR: any = {"usedParamSet":{"chain_id":true,"contract_address":true},"params":[{"name":"chain_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":77,"b":85}]},{"name":"contract_address","required":false,"transform":{"type":"scalar"},"locs":[{"a":137,"b":153}]}],"statement":"SELECT *\nFROM transaction_history\nWHERE transaction_history.chain_id = LOWER(:chain_id) AND transaction_history.contract_address = LOWER(:contract_address)"};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM transaction_history
 * WHERE transaction_history.chain_id = LOWER(:chain_id) AND transaction_history.contract_address = LOWER(:contract_address)
 * ```
 */
export const getHistoryForContract = new PreparedQuery<IGetHistoryForContractParams,IGetHistoryForContractResult>(getHistoryForContractIR);


/** 'GetHistoryForUser' parameters type */
export interface IGetHistoryForUserParams {
  owner_address?: string | null | void;
}

/** 'GetHistoryForUser' return type */
export interface IGetHistoryForUserResult {
  amount: string | null;
  contract_address: string;
  name: string;
  timestamp: Date;
  tx_hash: string;
  type: string;
}

/** 'GetHistoryForUser' query type */
export interface IGetHistoryForUserQuery {
  params: IGetHistoryForUserParams;
  result: IGetHistoryForUserResult;
}

const getHistoryForUserIR: any = {"usedParamSet":{"owner_address":true},"params":[{"name":"owner_address","required":false,"transform":{"type":"scalar"},"locs":[{"a":598,"b":611}]}],"statement":"SELECT transaction_history.contract_address,\n       transaction_history.type,\n       transaction_history.amount,\n       transaction_history.timestamp,\n       transaction_history.tx_hash,\n       contracts.name\nFROM transaction_history\n    INNER JOIN tokens ON transaction_history.chain_id = tokens.chain_id AND transaction_history.contract_address = tokens.contract_address AND transaction_history.token_id = tokens.token_id\n    INNER JOIN contracts ON transaction_history.chain_id = contracts.chain_id AND transaction_history.contract_address = contracts.address\nWHERE tokens.owner_address = LOWER(:owner_address)"};

/**
 * Query generated from SQL:
 * ```
 * SELECT transaction_history.contract_address,
 *        transaction_history.type,
 *        transaction_history.amount,
 *        transaction_history.timestamp,
 *        transaction_history.tx_hash,
 *        contracts.name
 * FROM transaction_history
 *     INNER JOIN tokens ON transaction_history.chain_id = tokens.chain_id AND transaction_history.contract_address = tokens.contract_address AND transaction_history.token_id = tokens.token_id
 *     INNER JOIN contracts ON transaction_history.chain_id = contracts.chain_id AND transaction_history.contract_address = contracts.address
 * WHERE tokens.owner_address = LOWER(:owner_address)
 * ```
 */
export const getHistoryForUser = new PreparedQuery<IGetHistoryForUserParams,IGetHistoryForUserResult>(getHistoryForUserIR);


/** 'GetTokenDetails' parameters type */
export interface IGetTokenDetailsParams {
  chain_id?: string | null | void;
  contract_address?: string | null | void;
  token_id?: NumberOrString | null | void;
}

/** 'GetTokenDetails' return type */
export interface IGetTokenDetailsResult {
  lease_end: Date;
  lease_start: Date;
  metadata_base_url: string | null;
  min_yield: string;
  name: string;
  price: string;
  redeemed: boolean;
  yield_claimed: string;
}

/** 'GetTokenDetails' query type */
export interface IGetTokenDetailsQuery {
  params: IGetTokenDetailsParams;
  result: IGetTokenDetailsResult;
}

const getTokenDetailsIR: any = {"usedParamSet":{"chain_id":true,"contract_address":true,"token_id":true},"params":[{"name":"chain_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":369,"b":377}]},{"name":"contract_address","required":false,"transform":{"type":"scalar"},"locs":[{"a":415,"b":431}]},{"name":"token_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":456,"b":464}]}],"statement":"SELECT tokens.yield_claimed,\n       tokens.redeemed,\n       contracts.name,\n       contracts.lease_start,\n       contracts.lease_end,\n       contracts.min_yield,\n       contracts.price,\n       contracts.metadata_base_url\nFROM tokens\n   INNER JOIN contracts ON tokens.chain_id = contracts.chain_id AND tokens.contract_address = contracts.address\nWHERE tokens.chain_id = :chain_id AND tokens.contract_address = LOWER(:contract_address) AND tokens.token_id = :token_id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT tokens.yield_claimed,
 *        tokens.redeemed,
 *        contracts.name,
 *        contracts.lease_start,
 *        contracts.lease_end,
 *        contracts.min_yield,
 *        contracts.price,
 *        contracts.metadata_base_url
 * FROM tokens
 *    INNER JOIN contracts ON tokens.chain_id = contracts.chain_id AND tokens.contract_address = contracts.address
 * WHERE tokens.chain_id = :chain_id AND tokens.contract_address = LOWER(:contract_address) AND tokens.token_id = :token_id
 * ```
 */
export const getTokenDetails = new PreparedQuery<IGetTokenDetailsParams,IGetTokenDetailsResult>(getTokenDetailsIR);


/** 'GetUserTokens' parameters type */
export interface IGetUserTokensParams {
  owner_address?: string | null | void;
}

/** 'GetUserTokens' return type */
export interface IGetUserTokensResult {
  chain_id: string;
  contract_address: string;
  lease_end: Date;
  lease_start: Date;
  metadata_base_url: string | null;
  min_yield: string;
  name: string;
  price: string;
  redeemed: boolean;
  token_id: string;
  yield_claimed: string;
}

/** 'GetUserTokens' query type */
export interface IGetUserTokensQuery {
  params: IGetUserTokensParams;
  result: IGetUserTokensResult;
}

const getUserTokensIR: any = {"usedParamSet":{"owner_address":true},"params":[{"name":"owner_address","required":false,"transform":{"type":"scalar"},"locs":[{"a":461,"b":474}]}],"statement":"SELECT tokens.chain_id,\n       tokens.contract_address,\n       tokens.token_id,\n       tokens.yield_claimed,\n       tokens.redeemed,\n       contracts.name,\n       contracts.lease_start,\n       contracts.lease_end,\n       contracts.min_yield,\n       contracts.price,\n       contracts.metadata_base_url\nFROM tokens\n    INNER JOIN contracts ON tokens.chain_id = contracts.chain_id AND tokens.contract_address = contracts.address\nWHERE tokens.owner_address = LOWER(:owner_address)"};

/**
 * Query generated from SQL:
 * ```
 * SELECT tokens.chain_id,
 *        tokens.contract_address,
 *        tokens.token_id,
 *        tokens.yield_claimed,
 *        tokens.redeemed,
 *        contracts.name,
 *        contracts.lease_start,
 *        contracts.lease_end,
 *        contracts.min_yield,
 *        contracts.price,
 *        contracts.metadata_base_url
 * FROM tokens
 *     INNER JOIN contracts ON tokens.chain_id = contracts.chain_id AND tokens.contract_address = contracts.address
 * WHERE tokens.owner_address = LOWER(:owner_address)
 * ```
 */
export const getUserTokens = new PreparedQuery<IGetUserTokensParams,IGetUserTokensResult>(getUserTokensIR);


/** 'GetUserPoints' parameters type */
export interface IGetUserPointsParams {
  user_address?: string | null | void;
}

/** 'GetUserPoints' return type */
export interface IGetUserPointsResult {
  balance: string;
}

/** 'GetUserPoints' query type */
export interface IGetUserPointsQuery {
  params: IGetUserPointsParams;
  result: IGetUserPointsResult;
}

const getUserPointsIR: any = {"usedParamSet":{"user_address":true},"params":[{"name":"user_address","required":false,"transform":{"type":"scalar"},"locs":[{"a":54,"b":66}]}],"statement":"SELECT balance\nFROM points\nWHERE user_address = LOWER(:user_address)"};

/**
 * Query generated from SQL:
 * ```
 * SELECT balance
 * FROM points
 * WHERE user_address = LOWER(:user_address)
 * ```
 */
export const getUserPoints = new PreparedQuery<IGetUserPointsParams,IGetUserPointsResult>(getUserPointsIR);


/** 'GetUserRankWithPoints' parameters type */
export interface IGetUserRankWithPointsParams {
  user_address?: string | null | void;
}

/** 'GetUserRankWithPoints' return type */
export interface IGetUserRankWithPointsResult {
  balance: string;
  rank: string | null;
  user_address: string;
}

/** 'GetUserRankWithPoints' query type */
export interface IGetUserRankWithPointsQuery {
  params: IGetUserRankWithPointsParams;
  result: IGetUserRankWithPointsResult;
}

const getUserRankWithPointsIR: any = {"usedParamSet":{"user_address":true},"params":[{"name":"user_address","required":false,"transform":{"type":"scalar"},"locs":[{"a":251,"b":263}]}],"statement":"WITH ranked_users AS (\n    SELECT\n        user_address,\n        balance,\n        RANK() OVER (ORDER BY balance DESC) AS rank\n    FROM\n        points\n)\nSELECT\n    user_address,\n    balance,\n    rank\nFROM\n    ranked_users\nWHERE\n    user_address = LOWER(:user_address)"};

/**
 * Query generated from SQL:
 * ```
 * WITH ranked_users AS (
 *     SELECT
 *         user_address,
 *         balance,
 *         RANK() OVER (ORDER BY balance DESC) AS rank
 *     FROM
 *         points
 * )
 * SELECT
 *     user_address,
 *     balance,
 *     rank
 * FROM
 *     ranked_users
 * WHERE
 *     user_address = LOWER(:user_address)
 * ```
 */
export const getUserRankWithPoints = new PreparedQuery<IGetUserRankWithPointsParams,IGetUserRankWithPointsResult>(getUserRankWithPointsIR);


/** 'GetActiveTokensByUsersAndContract' parameters type */
export type IGetActiveTokensByUsersAndContractParams = void;

/** 'GetActiveTokensByUsersAndContract' return type */
export interface IGetActiveTokensByUsersAndContractResult {
  lease_end: Date;
  lease_start: Date;
  owner_address: string;
  price: string;
  token_ids: bigintArray | null;
}

/** 'GetActiveTokensByUsersAndContract' query type */
export interface IGetActiveTokensByUsersAndContractQuery {
  params: IGetActiveTokensByUsersAndContractParams;
  result: IGetActiveTokensByUsersAndContractResult;
}

const getActiveTokensByUsersAndContractIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT\n    t.owner_address,\n    c.price,\n    c.lease_start,\n    c.lease_end,\n    ARRAY_AGG(t.token_id) AS token_ids\nFROM\n    tokens t\n        JOIN\n    contracts c\n    ON\n        t.chain_id = c.chain_id AND\n        t.contract_address = c.address\nWHERE\n    t.redeemed = false\nGROUP BY\n    t.owner_address,\n    c.price,\n    c.lease_start,\n    c.lease_end"};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *     t.owner_address,
 *     c.price,
 *     c.lease_start,
 *     c.lease_end,
 *     ARRAY_AGG(t.token_id) AS token_ids
 * FROM
 *     tokens t
 *         JOIN
 *     contracts c
 *     ON
 *         t.chain_id = c.chain_id AND
 *         t.contract_address = c.address
 * WHERE
 *     t.redeemed = false
 * GROUP BY
 *     t.owner_address,
 *     c.price,
 *     c.lease_start,
 *     c.lease_end
 * ```
 */
export const getActiveTokensByUsersAndContract = new PreparedQuery<IGetActiveTokensByUsersAndContractParams,IGetActiveTokensByUsersAndContractResult>(getActiveTokensByUsersAndContractIR);


/** 'GetTotalLoaned' parameters type */
export type IGetTotalLoanedParams = void;

/** 'GetTotalLoaned' return type */
export interface IGetTotalLoanedResult {
  total_token_prices: string | null;
}

/** 'GetTotalLoaned' query type */
export interface IGetTotalLoanedQuery {
  params: IGetTotalLoanedParams;
  result: IGetTotalLoanedResult;
}

const getTotalLoanedIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT SUM(c.price) AS total_token_prices\nFROM tokens t\n   JOIN contracts c\n   ON t.chain_id = c.chain_id AND t.contract_address = c.address"};

/**
 * Query generated from SQL:
 * ```
 * SELECT SUM(c.price) AS total_token_prices
 * FROM tokens t
 *    JOIN contracts c
 *    ON t.chain_id = c.chain_id AND t.contract_address = c.address
 * ```
 */
export const getTotalLoaned = new PreparedQuery<IGetTotalLoanedParams,IGetTotalLoanedResult>(getTotalLoanedIR);


/** 'GetTotalRepaid' parameters type */
export type IGetTotalRepaidParams = void;

/** 'GetTotalRepaid' return type */
export interface IGetTotalRepaidResult {
  total_repaid_amount: string | null;
}

/** 'GetTotalRepaid' query type */
export interface IGetTotalRepaidQuery {
  params: IGetTotalRepaidParams;
  result: IGetTotalRepaidResult;
}

const getTotalRepaidIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT SUM(t.yield_claimed + CASE WHEN t.redeemed THEN c.price ELSE 0 END) AS total_repaid_amount\nFROM tokens t\n    JOIN contracts c\n    ON t.chain_id = c.chain_id AND t.contract_address = c.address"};

/**
 * Query generated from SQL:
 * ```
 * SELECT SUM(t.yield_claimed + CASE WHEN t.redeemed THEN c.price ELSE 0 END) AS total_repaid_amount
 * FROM tokens t
 *     JOIN contracts c
 *     ON t.chain_id = c.chain_id AND t.contract_address = c.address
 * ```
 */
export const getTotalRepaid = new PreparedQuery<IGetTotalRepaidParams,IGetTotalRepaidResult>(getTotalRepaidIR);


/** 'GetOwnersCount' parameters type */
export type IGetOwnersCountParams = void;

/** 'GetOwnersCount' return type */
export interface IGetOwnersCountResult {
  total_unique_owners: string | null;
}

/** 'GetOwnersCount' query type */
export interface IGetOwnersCountQuery {
  params: IGetOwnersCountParams;
  result: IGetOwnersCountResult;
}

const getOwnersCountIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT COUNT(DISTINCT owner_address) AS total_unique_owners\nFROM tokens"};

/**
 * Query generated from SQL:
 * ```
 * SELECT COUNT(DISTINCT owner_address) AS total_unique_owners
 * FROM tokens
 * ```
 */
export const getOwnersCount = new PreparedQuery<IGetOwnersCountParams,IGetOwnersCountResult>(getOwnersCountIR);


