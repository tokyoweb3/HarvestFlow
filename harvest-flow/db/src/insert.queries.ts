/** Types generated for queries found in "src/queries/insert.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type DateOrString = Date | string;

export type NumberOrString = number | string;

/** 'InsertMint' parameters type */
export interface IInsertMintParams {
  amount: number;
  chainId: string;
  contract_address: string;
  owner_address: string;
  token_id: string;
}

/** 'InsertMint' return type */
export type IInsertMintResult = void;

/** 'InsertMint' query type */
export interface IInsertMintQuery {
  params: IInsertMintParams;
  result: IInsertMintResult;
}

const insertMintIR: any = {"usedParamSet":{"chainId":true,"contract_address":true,"token_id":true,"owner_address":true,"amount":true},"params":[{"name":"chainId","required":true,"transform":{"type":"scalar"},"locs":[{"a":126,"b":134}]},{"name":"contract_address","required":true,"transform":{"type":"scalar"},"locs":[{"a":148,"b":165}]},{"name":"token_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":173,"b":182}]},{"name":"owner_address","required":true,"transform":{"type":"scalar"},"locs":[{"a":195,"b":209}]},{"name":"amount","required":true,"transform":{"type":"scalar"},"locs":[{"a":217,"b":224}]}],"statement":"INSERT INTO ownerships (\n    chain_id,\n    contract_address,\n    token_id,\n    owner_address,\n    amount\n) VALUES (\n    LOWER(:chainId!),\n    LOWER(:contract_address!),\n    :token_id!,\n    LOWER(:owner_address!),\n    :amount!\n)"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO ownerships (
 *     chain_id,
 *     contract_address,
 *     token_id,
 *     owner_address,
 *     amount
 * ) VALUES (
 *     LOWER(:chainId!),
 *     LOWER(:contract_address!),
 *     :token_id!,
 *     LOWER(:owner_address!),
 *     :amount!
 * )
 * ```
 */
export const insertMint = new PreparedQuery<IInsertMintParams,IInsertMintResult>(insertMintIR);


/** 'SaveTransaction' parameters type */
export interface ISaveTransactionParams {
  amount: NumberOrString;
  chainId: string;
  contract_address: string;
  timestamp: DateOrString;
  token_id: string;
  type: string;
}

/** 'SaveTransaction' return type */
export type ISaveTransactionResult = void;

/** 'SaveTransaction' query type */
export interface ISaveTransactionQuery {
  params: ISaveTransactionParams;
  result: ISaveTransactionResult;
}

const saveTransactionIR: any = {"usedParamSet":{"type":true,"chainId":true,"contract_address":true,"token_id":true,"amount":true,"timestamp":true},"params":[{"name":"type","required":true,"transform":{"type":"scalar"},"locs":[{"a":137,"b":142}]},{"name":"chainId","required":true,"transform":{"type":"scalar"},"locs":[{"a":155,"b":163}]},{"name":"contract_address","required":true,"transform":{"type":"scalar"},"locs":[{"a":177,"b":194}]},{"name":"token_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":202,"b":211}]},{"name":"amount","required":true,"transform":{"type":"scalar"},"locs":[{"a":218,"b":225}]},{"name":"timestamp","required":true,"transform":{"type":"scalar"},"locs":[{"a":232,"b":242}]}],"statement":"INSERT INTO transaction_history (\n    type,\n    chain_id,\n    contract_address,\n    token_id,\n    amount,\n    timestamp\n )  VALUES (\n    :type!,\n    LOWER(:chainId!),\n    LOWER(:contract_address!),\n    :token_id!,\n    :amount!,\n    :timestamp!\n )"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO transaction_history (
 *     type,
 *     chain_id,
 *     contract_address,
 *     token_id,
 *     amount,
 *     timestamp
 *  )  VALUES (
 *     :type!,
 *     LOWER(:chainId!),
 *     LOWER(:contract_address!),
 *     :token_id!,
 *     :amount!,
 *     :timestamp!
 *  )
 * ```
 */
export const saveTransaction = new PreparedQuery<ISaveTransactionParams,ISaveTransactionResult>(saveTransactionIR);


