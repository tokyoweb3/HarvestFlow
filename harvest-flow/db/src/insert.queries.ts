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


