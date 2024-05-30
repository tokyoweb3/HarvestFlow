/** Types generated for queries found in "src/queries/insert.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type DateOrString = Date | string;

export type NumberOrString = number | string;

/** 'InsertToken' parameters type */
export interface IInsertTokenParams {
  chainId: string;
  contract_address: string;
  owner_address: string;
  token_id: bigint;
}

/** 'InsertToken' return type */
export type IInsertTokenResult = void;

/** 'InsertToken' query type */
export interface IInsertTokenQuery {
  params: IInsertTokenParams;
  result: IInsertTokenResult;
}

const insertTokenIR: any = {"usedParamSet":{"chainId":true,"contract_address":true,"token_id":true,"owner_address":true},"params":[{"name":"chainId","required":true,"transform":{"type":"scalar"},"locs":[{"a":110,"b":118}]},{"name":"contract_address","required":true,"transform":{"type":"scalar"},"locs":[{"a":132,"b":149}]},{"name":"token_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":157,"b":166}]},{"name":"owner_address","required":true,"transform":{"type":"scalar"},"locs":[{"a":179,"b":193}]}],"statement":"INSERT INTO tokens (\n    chain_id,\n    contract_address,\n    token_id,\n    owner_address\n) VALUES (\n    LOWER(:chainId!),\n    LOWER(:contract_address!),\n    :token_id!,\n    LOWER(:owner_address!)\n)"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO tokens (
 *     chain_id,
 *     contract_address,
 *     token_id,
 *     owner_address
 * ) VALUES (
 *     LOWER(:chainId!),
 *     LOWER(:contract_address!),
 *     :token_id!,
 *     LOWER(:owner_address!)
 * )
 * ```
 */
export const insertToken = new PreparedQuery<IInsertTokenParams,IInsertTokenResult>(insertTokenIR);


/** 'SaveTransaction' parameters type */
export interface ISaveTransactionParams {
  amount: bigint;
  chainId: string;
  contract_address: string;
  timestamp: DateOrString;
  token_id: bigint;
  tx_hash: string;
  type: string;
}

/** 'SaveTransaction' return type */
export type ISaveTransactionResult = void;

/** 'SaveTransaction' query type */
export interface ISaveTransactionQuery {
  params: ISaveTransactionParams;
  result: ISaveTransactionResult;
}

const saveTransactionIR: any = {"usedParamSet":{"type":true,"chainId":true,"contract_address":true,"token_id":true,"amount":true,"timestamp":true,"tx_hash":true},"params":[{"name":"type","required":true,"transform":{"type":"scalar"},"locs":[{"a":150,"b":155}]},{"name":"chainId","required":true,"transform":{"type":"scalar"},"locs":[{"a":168,"b":176}]},{"name":"contract_address","required":true,"transform":{"type":"scalar"},"locs":[{"a":190,"b":207}]},{"name":"token_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":215,"b":224}]},{"name":"amount","required":true,"transform":{"type":"scalar"},"locs":[{"a":231,"b":238}]},{"name":"timestamp","required":true,"transform":{"type":"scalar"},"locs":[{"a":245,"b":255}]},{"name":"tx_hash","required":true,"transform":{"type":"scalar"},"locs":[{"a":262,"b":270}]}],"statement":"INSERT INTO transaction_history (\n    type,\n    chain_id,\n    contract_address,\n    token_id,\n    amount,\n    timestamp,\n    tx_hash\n )  VALUES (\n    :type!,\n    LOWER(:chainId!),\n    LOWER(:contract_address!),\n    :token_id!,\n    :amount!,\n    :timestamp!,\n    :tx_hash!\n )"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO transaction_history (
 *     type,
 *     chain_id,
 *     contract_address,
 *     token_id,
 *     amount,
 *     timestamp,
 *     tx_hash
 *  )  VALUES (
 *     :type!,
 *     LOWER(:chainId!),
 *     LOWER(:contract_address!),
 *     :token_id!,
 *     :amount!,
 *     :timestamp!,
 *     :tx_hash!
 *  )
 * ```
 */
export const saveTransaction = new PreparedQuery<ISaveTransactionParams,ISaveTransactionResult>(saveTransactionIR);


/** 'AddPoints' parameters type */
export interface IAddPointsParams {
  amount: NumberOrString;
  user_address: string;
}

/** 'AddPoints' return type */
export type IAddPointsResult = void;

/** 'AddPoints' query type */
export interface IAddPointsQuery {
  params: IAddPointsParams;
  result: IAddPointsResult;
}

const addPointsIR: any = {"usedParamSet":{"user_address":true,"amount":true},"params":[{"name":"user_address","required":true,"transform":{"type":"scalar"},"locs":[{"a":57,"b":70}]},{"name":"amount","required":true,"transform":{"type":"scalar"},"locs":[{"a":74,"b":81},{"a":155,"b":162}]}],"statement":"INSERT INTO points (user_address, balance)\nVALUES (LOWER(:user_address!), :amount!)\nON CONFLICT (user_address)\n   DO UPDATE SET balance = points.balance + :amount!"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO points (user_address, balance)
 * VALUES (LOWER(:user_address!), :amount!)
 * ON CONFLICT (user_address)
 *    DO UPDATE SET balance = points.balance + :amount!
 * ```
 */
export const addPoints = new PreparedQuery<IAddPointsParams,IAddPointsResult>(addPointsIR);


/** 'SaveNewContract' parameters type */
export interface ISaveNewContractParams {
  accepted_token: string;
  address: string;
  chain_id: string;
  lease_end: DateOrString;
  lease_start: DateOrString;
  metadata_base_url: string;
  min_yield: bigint;
  name: string;
  price: bigint;
  supply_cap: bigint;
  symbol: string;
}

/** 'SaveNewContract' return type */
export type ISaveNewContractResult = void;

/** 'SaveNewContract' query type */
export interface ISaveNewContractQuery {
  params: ISaveNewContractParams;
  result: ISaveNewContractResult;
}

const saveNewContractIR: any = {"usedParamSet":{"name":true,"symbol":true,"chain_id":true,"address":true,"supply_cap":true,"lease_start":true,"lease_end":true,"min_yield":true,"accepted_token":true,"price":true,"metadata_base_url":true},"params":[{"name":"name","required":true,"transform":{"type":"scalar"},"locs":[{"a":383,"b":388}]},{"name":"symbol","required":true,"transform":{"type":"scalar"},"locs":[{"a":399,"b":406}]},{"name":"chain_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":423,"b":432}]},{"name":"address","required":true,"transform":{"type":"scalar"},"locs":[{"a":450,"b":458}]},{"name":"supply_cap","required":true,"transform":{"type":"scalar"},"locs":[{"a":470,"b":481}]},{"name":"lease_start","required":true,"transform":{"type":"scalar"},"locs":[{"a":492,"b":504}]},{"name":"lease_end","required":true,"transform":{"type":"scalar"},"locs":[{"a":515,"b":525}]},{"name":"min_yield","required":true,"transform":{"type":"scalar"},"locs":[{"a":536,"b":546}]},{"name":"accepted_token","required":true,"transform":{"type":"scalar"},"locs":[{"a":563,"b":578}]},{"name":"price","required":true,"transform":{"type":"scalar"},"locs":[{"a":590,"b":596}]},{"name":"metadata_base_url","required":true,"transform":{"type":"scalar"},"locs":[{"a":607,"b":625}]}],"statement":"INSERT INTO contracts (name,\n                       symbol,\n                       chain_id,\n                       address,\n                       supply_cap,\n                       lease_start,\n                       lease_end,\n                       min_yield,\n                       accepted_token,\n                       price,\n                       metadata_base_url)\nVALUES (:name!,\n        :symbol!,\n        LOWER(:chain_id!),\n        LOWER(:address!),\n        :supply_cap!,\n        :lease_start!,\n        :lease_end!,\n        :min_yield!,\n        LOWER(:accepted_token!),\n        :price!,\n        :metadata_base_url!)"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO contracts (name,
 *                        symbol,
 *                        chain_id,
 *                        address,
 *                        supply_cap,
 *                        lease_start,
 *                        lease_end,
 *                        min_yield,
 *                        accepted_token,
 *                        price,
 *                        metadata_base_url)
 * VALUES (:name!,
 *         :symbol!,
 *         LOWER(:chain_id!),
 *         LOWER(:address!),
 *         :supply_cap!,
 *         :lease_start!,
 *         :lease_end!,
 *         :min_yield!,
 *         LOWER(:accepted_token!),
 *         :price!,
 *         :metadata_base_url!)
 * ```
 */
export const saveNewContract = new PreparedQuery<ISaveNewContractParams,ISaveNewContractResult>(saveNewContractIR);


