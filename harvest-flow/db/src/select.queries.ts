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
  is_presale: boolean;
  is_publicsale: boolean;
  lease_end: Date;
  lease_start: Date;
  metadata_base_url: string | null;
  min_yield: string;
  minted_amount: string;
  name: string;
  owner: string;
  presale_price: string;
  publicsale_price: string;
  signer_address: string;
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
  evm_tx_hash: string;
  owner_address: string;
  paima_tx_hash: string;
  timestamp: Date;
  token_id: string;
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
  evm_tx_hash: string;
  name: string;
  timestamp: Date;
  type: string;
}

/** 'GetHistoryForUser' query type */
export interface IGetHistoryForUserQuery {
  params: IGetHistoryForUserParams;
  result: IGetHistoryForUserResult;
}

const getHistoryForUserIR: any = {"usedParamSet":{"owner_address":true},"params":[{"name":"owner_address","required":false,"transform":{"type":"scalar"},"locs":[{"a":615,"b":628}]}],"statement":"SELECT transaction_history.contract_address,\n       transaction_history.type,\n       transaction_history.amount,\n       transaction_history.timestamp,\n       transaction_history.evm_tx_hash,\n       contracts.name\nFROM transaction_history\n    INNER JOIN tokens ON transaction_history.chain_id = tokens.chain_id AND transaction_history.contract_address = tokens.contract_address AND transaction_history.token_id = tokens.token_id\n    INNER JOIN contracts ON transaction_history.chain_id = contracts.chain_id AND transaction_history.contract_address = contracts.address\nWHERE transaction_history.owner_address = LOWER(:owner_address)"};

/**
 * Query generated from SQL:
 * ```
 * SELECT transaction_history.contract_address,
 *        transaction_history.type,
 *        transaction_history.amount,
 *        transaction_history.timestamp,
 *        transaction_history.evm_tx_hash,
 *        contracts.name
 * FROM transaction_history
 *     INNER JOIN tokens ON transaction_history.chain_id = tokens.chain_id AND transaction_history.contract_address = tokens.contract_address AND transaction_history.token_id = tokens.token_id
 *     INNER JOIN contracts ON transaction_history.chain_id = contracts.chain_id AND transaction_history.contract_address = contracts.address
 * WHERE transaction_history.owner_address = LOWER(:owner_address)
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
  amount: string;
  lease_end: Date;
  lease_start: Date;
  metadata_base_url: string | null;
  min_yield: string;
  name: string;
  presale_price: string;
  publicsale_price: string;
  redeemed: boolean;
  yield_claimed: string;
}

/** 'GetTokenDetails' query type */
export interface IGetTokenDetailsQuery {
  params: IGetTokenDetailsParams;
  result: IGetTokenDetailsResult;
}

const getTokenDetailsIR: any = {"usedParamSet":{"chain_id":true,"contract_address":true,"token_id":true},"params":[{"name":"chain_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":653,"b":661}]},{"name":"contract_address","required":false,"transform":{"type":"scalar"},"locs":[{"a":699,"b":715}]},{"name":"token_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":740,"b":748}]}],"statement":"SELECT tokens.yield_claimed,\n       tokens.redeemed,\n       contracts.name,\n       contracts.lease_start,\n       contracts.lease_end,\n       contracts.min_yield,\n       contracts.presale_price,\n       contracts.publicsale_price,\n       contracts.metadata_base_url,\n       h.amount as \"amount!\"\nFROM tokens\n   INNER JOIN contracts ON tokens.chain_id = contracts.chain_id AND tokens.contract_address = contracts.address\n   INNER JOIN transaction_history h\n        ON tokens.chain_id = h.chain_id AND\n           tokens.contract_address = h.contract_address AND\n           tokens.token_id = h.token_id AND\n           h.type = 'mint'\nWHERE tokens.chain_id = :chain_id AND tokens.contract_address = LOWER(:contract_address) AND tokens.token_id = :token_id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT tokens.yield_claimed,
 *        tokens.redeemed,
 *        contracts.name,
 *        contracts.lease_start,
 *        contracts.lease_end,
 *        contracts.min_yield,
 *        contracts.presale_price,
 *        contracts.publicsale_price,
 *        contracts.metadata_base_url,
 *        h.amount as "amount!"
 * FROM tokens
 *    INNER JOIN contracts ON tokens.chain_id = contracts.chain_id AND tokens.contract_address = contracts.address
 *    INNER JOIN transaction_history h
 *         ON tokens.chain_id = h.chain_id AND
 *            tokens.contract_address = h.contract_address AND
 *            tokens.token_id = h.token_id AND
 *            h.type = 'mint'
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
  amount: string;
  chain_id: string;
  contract_address: string;
  lease_end: Date;
  lease_start: Date;
  metadata_base_url: string | null;
  min_yield: string;
  name: string;
  presale_price: string;
  publicsale_price: string;
  redeemed: boolean;
  token_id: string;
  yield_claimed: string;
}

/** 'GetUserTokens' query type */
export interface IGetUserTokensQuery {
  params: IGetUserTokensParams;
  result: IGetUserTokensResult;
}

const getUserTokensIR: any = {"usedParamSet":{"owner_address":true},"params":[{"name":"owner_address","required":false,"transform":{"type":"scalar"},"locs":[{"a":1171,"b":1184}]}],"statement":"SELECT tokens.chain_id,\n       tokens.contract_address,\n       tokens.token_id,\n       tokens.yield_claimed,\n       tokens.redeemed,\n       contracts.name,\n       contracts.lease_start,\n       contracts.lease_end,\n       contracts.min_yield,\n       contracts.presale_price,\n       contracts.publicsale_price,\n       contracts.metadata_base_url,\n       h.amount as \"amount!\"\nFROM cde_erc721_data\nJOIN cde_dynamic_primitive_config\n    ON cde_dynamic_primitive_config.cde_name = cde_erc721_data.cde_name\nJOIN chain_data_extensions\n    ON cde_dynamic_primitive_config.cde_name = chain_data_extensions.cde_name\nJOIN tokens\n    ON LOWER(cde_dynamic_primitive_config.config->>'contractAddress') = tokens.contract_address\n    AND tokens.chain_id = chain_data_extensions.cde_caip2\n    AND tokens.token_id::TEXT = cde_erc721_data.token_id\nJOIN contracts\n    ON tokens.chain_id = contracts.chain_id AND tokens.contract_address = contracts.address\nINNER JOIN transaction_history h\n    ON tokens.chain_id = h.chain_id AND\n        tokens.contract_address = h.contract_address AND\n        tokens.token_id = h.token_id AND\n        h.type = 'mint'\nWHERE cde_erc721_data.nft_owner = LOWER(:owner_address)"};

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
 *        contracts.presale_price,
 *        contracts.publicsale_price,
 *        contracts.metadata_base_url,
 *        h.amount as "amount!"
 * FROM cde_erc721_data
 * JOIN cde_dynamic_primitive_config
 *     ON cde_dynamic_primitive_config.cde_name = cde_erc721_data.cde_name
 * JOIN chain_data_extensions
 *     ON cde_dynamic_primitive_config.cde_name = chain_data_extensions.cde_name
 * JOIN tokens
 *     ON LOWER(cde_dynamic_primitive_config.config->>'contractAddress') = tokens.contract_address
 *     AND tokens.chain_id = chain_data_extensions.cde_caip2
 *     AND tokens.token_id::TEXT = cde_erc721_data.token_id
 * JOIN contracts
 *     ON tokens.chain_id = contracts.chain_id AND tokens.contract_address = contracts.address
 * INNER JOIN transaction_history h
 *     ON tokens.chain_id = h.chain_id AND
 *         tokens.contract_address = h.contract_address AND
 *         tokens.token_id = h.token_id AND
 *         h.type = 'mint'
 * WHERE cde_erc721_data.nft_owner = LOWER(:owner_address)
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
  amount: string;
  lease_end: Date;
  lease_start: Date;
  nft_owner: string;
  token_ids: bigintArray | null;
}

/** 'GetActiveTokensByUsersAndContract' query type */
export interface IGetActiveTokensByUsersAndContractQuery {
  params: IGetActiveTokensByUsersAndContractParams;
  result: IGetActiveTokensByUsersAndContractResult;
}

const getActiveTokensByUsersAndContractIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT\n    cde_erc721_data.nft_owner,\n    c.lease_start,\n    c.lease_end,\n    h.amount as \"amount!\",\n    ARRAY_AGG(t.token_id) AS token_ids\nFROM cde_erc721_data\nJOIN cde_dynamic_primitive_config\n    ON cde_dynamic_primitive_config.cde_name = cde_erc721_data.cde_name\nJOIN chain_data_extensions\n    ON cde_dynamic_primitive_config.cde_name = chain_data_extensions.cde_name\nJOIN tokens t\n    ON LOWER(cde_dynamic_primitive_config.config->>'contractAddress') = t.contract_address\n    AND t.chain_id = chain_data_extensions.cde_caip2\n    AND t.token_id::TEXT = cde_erc721_data.token_id\nJOIN contracts c\n    ON t.chain_id = c.chain_id AND t.contract_address = c.address\nINNER JOIN transaction_history h\n    ON t.chain_id = h.chain_id AND\n        t.contract_address = h.contract_address AND\n        t.token_id = h.token_id AND\n        h.type = 'mint'\nWHERE\n    t.redeemed = false\nGROUP BY\n    cde_erc721_data.nft_owner,\n    h.amount,\n    c.lease_start,\n    c.lease_end"};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *     cde_erc721_data.nft_owner,
 *     c.lease_start,
 *     c.lease_end,
 *     h.amount as "amount!",
 *     ARRAY_AGG(t.token_id) AS token_ids
 * FROM cde_erc721_data
 * JOIN cde_dynamic_primitive_config
 *     ON cde_dynamic_primitive_config.cde_name = cde_erc721_data.cde_name
 * JOIN chain_data_extensions
 *     ON cde_dynamic_primitive_config.cde_name = chain_data_extensions.cde_name
 * JOIN tokens t
 *     ON LOWER(cde_dynamic_primitive_config.config->>'contractAddress') = t.contract_address
 *     AND t.chain_id = chain_data_extensions.cde_caip2
 *     AND t.token_id::TEXT = cde_erc721_data.token_id
 * JOIN contracts c
 *     ON t.chain_id = c.chain_id AND t.contract_address = c.address
 * INNER JOIN transaction_history h
 *     ON t.chain_id = h.chain_id AND
 *         t.contract_address = h.contract_address AND
 *         t.token_id = h.token_id AND
 *         h.type = 'mint'
 * WHERE
 *     t.redeemed = false
 * GROUP BY
 *     cde_erc721_data.nft_owner,
 *     h.amount,
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

const getTotalLoanedIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT SUM(h.amount) AS total_token_prices\nFROM transaction_history h\nWHERE h.type = 'mint'"};

/**
 * Query generated from SQL:
 * ```
 * SELECT SUM(h.amount) AS total_token_prices
 * FROM transaction_history h
 * WHERE h.type = 'mint'
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

const getTotalRepaidIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT SUM(t.yield_claimed + CASE WHEN t.redeemed THEN h.amount ELSE 0 END) AS total_repaid_amount\nFROM tokens t\n    JOIN transaction_history h\n    ON\n        t.chain_id = h.chain_id AND\n        t.contract_address = h.contract_address AND\n        t.token_id = h.token_id AND\n        h.type = 'mint'"};

/**
 * Query generated from SQL:
 * ```
 * SELECT SUM(t.yield_claimed + CASE WHEN t.redeemed THEN h.amount ELSE 0 END) AS total_repaid_amount
 * FROM tokens t
 *     JOIN transaction_history h
 *     ON
 *         t.chain_id = h.chain_id AND
 *         t.contract_address = h.contract_address AND
 *         t.token_id = h.token_id AND
 *         h.type = 'mint'
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

const getOwnersCountIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT COUNT(DISTINCT nft_owner) AS total_unique_owners\nFROM cde_erc721_data"};

/**
 * Query generated from SQL:
 * ```
 * SELECT COUNT(DISTINCT nft_owner) AS total_unique_owners
 * FROM cde_erc721_data
 * ```
 */
export const getOwnersCount = new PreparedQuery<IGetOwnersCountParams,IGetOwnersCountResult>(getOwnersCountIR);


/** 'GetTotalMinted' parameters type */
export interface IGetTotalMintedParams {
  contract_address: string;
  minter_address: string;
}

/** 'GetTotalMinted' return type */
export interface IGetTotalMintedResult {
  total_minted: string | null;
}

/** 'GetTotalMinted' query type */
export interface IGetTotalMintedQuery {
  params: IGetTotalMintedParams;
  result: IGetTotalMintedResult;
}

const getTotalMintedIR: any = {"usedParamSet":{"minter_address":true,"contract_address":true},"params":[{"name":"minter_address","required":true,"transform":{"type":"scalar"},"locs":[{"a":74,"b":89}]},{"name":"contract_address","required":true,"transform":{"type":"scalar"},"locs":[{"a":121,"b":138}]}],"statement":"SELECT COUNT(*) AS total_minted\nFROM tokens\nWHERE tokens.minter_address = :minter_address! AND tokens.contract_address = :contract_address!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT COUNT(*) AS total_minted
 * FROM tokens
 * WHERE tokens.minter_address = :minter_address! AND tokens.contract_address = :contract_address!
 * ```
 */
export const getTotalMinted = new PreparedQuery<IGetTotalMintedParams,IGetTotalMintedResult>(getTotalMintedIR);


