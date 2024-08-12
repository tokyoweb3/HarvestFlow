/** Types generated for queries found in "src/queries/insert.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type DateOrString = Date | string;

export type NumberOrString = number | string;

/** 'InsertToken' parameters type */
export interface IInsertTokenParams {
  chainId: string;
  contract_address: string;
  minter_address: string;
  token_id: bigint;
}

/** 'InsertToken' return type */
export type IInsertTokenResult = void;

/** 'InsertToken' query type */
export interface IInsertTokenQuery {
  params: IInsertTokenParams;
  result: IInsertTokenResult;
}

const insertTokenIR: any = {"usedParamSet":{"chainId":true,"contract_address":true,"token_id":true,"minter_address":true},"params":[{"name":"chainId","required":true,"transform":{"type":"scalar"},"locs":[{"a":111,"b":119}]},{"name":"contract_address","required":true,"transform":{"type":"scalar"},"locs":[{"a":133,"b":150}]},{"name":"token_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":158,"b":167}]},{"name":"minter_address","required":true,"transform":{"type":"scalar"},"locs":[{"a":180,"b":195}]}],"statement":"INSERT INTO tokens (\n    chain_id,\n    contract_address,\n    token_id,\n    minter_address\n) VALUES (\n    LOWER(:chainId!),\n    LOWER(:contract_address!),\n    :token_id!,\n    LOWER(:minter_address!)\n)"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO tokens (
 *     chain_id,
 *     contract_address,
 *     token_id,
 *     minter_address
 * ) VALUES (
 *     LOWER(:chainId!),
 *     LOWER(:contract_address!),
 *     :token_id!,
 *     LOWER(:minter_address!)
 * )
 * ```
 */
export const insertToken = new PreparedQuery<IInsertTokenParams,IInsertTokenResult>(insertTokenIR);


/** 'SaveTransaction' parameters type */
export interface ISaveTransactionParams {
  amount: bigint;
  chainId: string;
  contract_address: string;
  evm_tx_hash: string;
  owner_address: string;
  paima_tx_hash: string;
  timestamp: DateOrString;
  token_id: bigint;
  type: string;
}

/** 'SaveTransaction' return type */
export type ISaveTransactionResult = void;

/** 'SaveTransaction' query type */
export interface ISaveTransactionQuery {
  params: ISaveTransactionParams;
  result: ISaveTransactionResult;
}

const saveTransactionIR: any = {"usedParamSet":{"type":true,"chainId":true,"owner_address":true,"contract_address":true,"token_id":true,"amount":true,"timestamp":true,"evm_tx_hash":true,"paima_tx_hash":true},"params":[{"name":"type","required":true,"transform":{"type":"scalar"},"locs":[{"a":192,"b":197}]},{"name":"chainId","required":true,"transform":{"type":"scalar"},"locs":[{"a":210,"b":218}]},{"name":"owner_address","required":true,"transform":{"type":"scalar"},"locs":[{"a":232,"b":246}]},{"name":"contract_address","required":true,"transform":{"type":"scalar"},"locs":[{"a":260,"b":277}]},{"name":"token_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":285,"b":294}]},{"name":"amount","required":true,"transform":{"type":"scalar"},"locs":[{"a":301,"b":308}]},{"name":"timestamp","required":true,"transform":{"type":"scalar"},"locs":[{"a":315,"b":325}]},{"name":"evm_tx_hash","required":true,"transform":{"type":"scalar"},"locs":[{"a":332,"b":344}]},{"name":"paima_tx_hash","required":true,"transform":{"type":"scalar"},"locs":[{"a":351,"b":365}]}],"statement":"INSERT INTO transaction_history (\n    type,\n    chain_id,\n    owner_address,\n    contract_address,\n    token_id,\n    amount,\n    timestamp,\n    evm_tx_hash,\n    paima_tx_hash\n )  VALUES (\n    :type!,\n    LOWER(:chainId!),\n    LOWER(:owner_address!),\n    LOWER(:contract_address!),\n    :token_id!,\n    :amount!,\n    :timestamp!,\n    :evm_tx_hash!,\n    :paima_tx_hash!\n )"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO transaction_history (
 *     type,
 *     chain_id,
 *     owner_address,
 *     contract_address,
 *     token_id,
 *     amount,
 *     timestamp,
 *     evm_tx_hash,
 *     paima_tx_hash
 *  )  VALUES (
 *     :type!,
 *     LOWER(:chainId!),
 *     LOWER(:owner_address!),
 *     LOWER(:contract_address!),
 *     :token_id!,
 *     :amount!,
 *     :timestamp!,
 *     :evm_tx_hash!,
 *     :paima_tx_hash!
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
  is_presale: boolean;
  is_publicsale: boolean;
  lease_end: DateOrString;
  lease_start: DateOrString;
  metadata_base_url: string;
  min_yield: bigint;
  name: string;
  owner: string;
  presale_price: bigint;
  publicsale_price: bigint;
  signer_address: string;
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

const saveNewContractIR: any = {"usedParamSet":{"name":true,"symbol":true,"chain_id":true,"address":true,"supply_cap":true,"lease_start":true,"lease_end":true,"min_yield":true,"accepted_token":true,"presale_price":true,"publicsale_price":true,"metadata_base_url":true,"owner":true,"signer_address":true,"is_presale":true,"is_publicsale":true},"params":[{"name":"name","required":true,"transform":{"type":"scalar"},"locs":[{"a":574,"b":579}]},{"name":"symbol","required":true,"transform":{"type":"scalar"},"locs":[{"a":590,"b":597}]},{"name":"chain_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":614,"b":623}]},{"name":"address","required":true,"transform":{"type":"scalar"},"locs":[{"a":641,"b":649}]},{"name":"supply_cap","required":true,"transform":{"type":"scalar"},"locs":[{"a":661,"b":672}]},{"name":"lease_start","required":true,"transform":{"type":"scalar"},"locs":[{"a":683,"b":695}]},{"name":"lease_end","required":true,"transform":{"type":"scalar"},"locs":[{"a":706,"b":716}]},{"name":"min_yield","required":true,"transform":{"type":"scalar"},"locs":[{"a":727,"b":737}]},{"name":"accepted_token","required":true,"transform":{"type":"scalar"},"locs":[{"a":754,"b":769}]},{"name":"presale_price","required":true,"transform":{"type":"scalar"},"locs":[{"a":781,"b":795}]},{"name":"publicsale_price","required":true,"transform":{"type":"scalar"},"locs":[{"a":806,"b":823}]},{"name":"metadata_base_url","required":true,"transform":{"type":"scalar"},"locs":[{"a":834,"b":852}]},{"name":"owner","required":true,"transform":{"type":"scalar"},"locs":[{"a":863,"b":869}]},{"name":"signer_address","required":true,"transform":{"type":"scalar"},"locs":[{"a":880,"b":895}]},{"name":"is_presale","required":true,"transform":{"type":"scalar"},"locs":[{"a":906,"b":917}]},{"name":"is_publicsale","required":true,"transform":{"type":"scalar"},"locs":[{"a":928,"b":942}]}],"statement":"INSERT INTO contracts (name,\n                       symbol,\n                       chain_id,\n                       address,\n                       supply_cap,\n                       lease_start,\n                       lease_end,\n                       min_yield,\n                       accepted_token,\n                       presale_price,\n                       publicsale_price,\n                       metadata_base_url,\n                       owner,\n                       signer_address,\n                       is_presale,\n                       is_publicsale)\nVALUES (:name!,\n        :symbol!,\n        LOWER(:chain_id!),\n        LOWER(:address!),\n        :supply_cap!,\n        :lease_start!,\n        :lease_end!,\n        :min_yield!,\n        LOWER(:accepted_token!),\n        :presale_price!,\n        :publicsale_price!,\n        :metadata_base_url!,\n        :owner!,\n        :signer_address!,\n        :is_presale!,\n        :is_publicsale!)"};

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
 *                        presale_price,
 *                        publicsale_price,
 *                        metadata_base_url,
 *                        owner,
 *                        signer_address,
 *                        is_presale,
 *                        is_publicsale)
 * VALUES (:name!,
 *         :symbol!,
 *         LOWER(:chain_id!),
 *         LOWER(:address!),
 *         :supply_cap!,
 *         :lease_start!,
 *         :lease_end!,
 *         :min_yield!,
 *         LOWER(:accepted_token!),
 *         :presale_price!,
 *         :publicsale_price!,
 *         :metadata_base_url!,
 *         :owner!,
 *         :signer_address!,
 *         :is_presale!,
 *         :is_publicsale!)
 * ```
 */
export const saveNewContract = new PreparedQuery<ISaveNewContractParams,ISaveNewContractResult>(saveNewContractIR);


