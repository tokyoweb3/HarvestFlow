/** Types generated for queries found in "src/queries/select.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

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
  minted_amount: number;
  name: string;
  price: string;
  supply_cap: number;
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


/** 'GetHistoryForContract' parameters type */
export interface IGetHistoryForContractParams {
  chain_id?: string | null | void;
  contract_address?: string | null | void;
}

/** 'GetHistoryForContract' return type */
export interface IGetHistoryForContractResult {
  amount: string;
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
  amount: string;
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

const getHistoryForUserIR: any = {"usedParamSet":{"owner_address":true},"params":[{"name":"owner_address","required":false,"transform":{"type":"scalar"},"locs":[{"a":618,"b":631}]}],"statement":"SELECT transaction_history.contract_address,\n       transaction_history.type,\n       transaction_history.amount,\n       transaction_history.timestamp,\n       transaction_history.tx_hash,\n       contracts.name\nFROM transaction_history\n    INNER JOIN ownerships ON transaction_history.chain_id = ownerships.chain_id AND transaction_history.contract_address = ownerships.contract_address AND transaction_history.token_id = ownerships.token_id\n    INNER JOIN contracts ON transaction_history.chain_id = contracts.chain_id AND transaction_history.contract_address = contracts.address\nWHERE ownerships.owner_address = LOWER(:owner_address)"};

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
 *     INNER JOIN ownerships ON transaction_history.chain_id = ownerships.chain_id AND transaction_history.contract_address = ownerships.contract_address AND transaction_history.token_id = ownerships.token_id
 *     INNER JOIN contracts ON transaction_history.chain_id = contracts.chain_id AND transaction_history.contract_address = contracts.address
 * WHERE ownerships.owner_address = LOWER(:owner_address)
 * ```
 */
export const getHistoryForUser = new PreparedQuery<IGetHistoryForUserParams,IGetHistoryForUserResult>(getHistoryForUserIR);


