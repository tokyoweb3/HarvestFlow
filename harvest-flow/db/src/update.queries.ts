/** Types generated for queries found in "src/queries/update.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type NumberOrString = number | string;

/** 'ActivateContract' parameters type */
export interface IActivateContractParams {
  chainId: string;
  contractAddress?: string | null | void;
}

/** 'ActivateContract' return type */
export type IActivateContractResult = void;

/** 'ActivateContract' query type */
export interface IActivateContractQuery {
  params: IActivateContractParams;
  result: IActivateContractResult;
}

const activateContractIR: any = {"usedParamSet":{"contractAddress":true,"chainId":true},"params":[{"name":"contractAddress","required":false,"transform":{"type":"scalar"},"locs":[{"a":70,"b":85}]},{"name":"chainId","required":true,"transform":{"type":"scalar"},"locs":[{"a":113,"b":121}]}],"statement":"UPDATE contracts\nSET activated = TRUE\nWHERE contracts.address = LOWER(:contractAddress) AND contracts.chain_id = :chainId!"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE contracts
 * SET activated = TRUE
 * WHERE contracts.address = LOWER(:contractAddress) AND contracts.chain_id = :chainId!
 * ```
 */
export const activateContract = new PreparedQuery<IActivateContractParams,IActivateContractResult>(activateContractIR);


/** 'AddMintedAmount' parameters type */
export interface IAddMintedAmountParams {
  amount: NumberOrString;
  chainId: string;
  contractAddress?: string | null | void;
}

/** 'AddMintedAmount' return type */
export type IAddMintedAmountResult = void;

/** 'AddMintedAmount' query type */
export interface IAddMintedAmountQuery {
  params: IAddMintedAmountParams;
  result: IAddMintedAmountResult;
}

const addMintedAmountIR: any = {"usedParamSet":{"amount":true,"contractAddress":true,"chainId":true},"params":[{"name":"amount","required":true,"transform":{"type":"scalar"},"locs":[{"a":53,"b":60}]},{"name":"contractAddress","required":false,"transform":{"type":"scalar"},"locs":[{"a":94,"b":109}]},{"name":"chainId","required":true,"transform":{"type":"scalar"},"locs":[{"a":137,"b":145}]}],"statement":"UPDATE contracts\nSET minted_amount = minted_amount + :amount!\nWHERE contracts.address = LOWER(:contractAddress) AND contracts.chain_id = :chainId!"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE contracts
 * SET minted_amount = minted_amount + :amount!
 * WHERE contracts.address = LOWER(:contractAddress) AND contracts.chain_id = :chainId!
 * ```
 */
export const addMintedAmount = new PreparedQuery<IAddMintedAmountParams,IAddMintedAmountResult>(addMintedAmountIR);


/** 'AddClaimedAmountToToken' parameters type */
export interface IAddClaimedAmountToTokenParams {
  amount: NumberOrString;
  chainId: string;
  contractAddress?: string | null | void;
  tokenId: NumberOrString;
}

/** 'AddClaimedAmountToToken' return type */
export type IAddClaimedAmountToTokenResult = void;

/** 'AddClaimedAmountToToken' query type */
export interface IAddClaimedAmountToTokenQuery {
  params: IAddClaimedAmountToTokenParams;
  result: IAddClaimedAmountToTokenResult;
}

const addClaimedAmountToTokenIR: any = {"usedParamSet":{"amount":true,"contractAddress":true,"chainId":true,"tokenId":true},"params":[{"name":"amount","required":true,"transform":{"type":"scalar"},"locs":[{"a":50,"b":57}]},{"name":"contractAddress","required":false,"transform":{"type":"scalar"},"locs":[{"a":97,"b":112}]},{"name":"chainId","required":true,"transform":{"type":"scalar"},"locs":[{"a":137,"b":145}]},{"name":"tokenId","required":true,"transform":{"type":"scalar"},"locs":[{"a":169,"b":177}]}],"statement":"UPDATE tokens\nSET yield_claimed = yield_claimed + :amount!\nWHERE tokens.contract_address = LOWER(:contractAddress) AND tokens.chain_id = :chainId! AND tokens.token_id = :tokenId!"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE tokens
 * SET yield_claimed = yield_claimed + :amount!
 * WHERE tokens.contract_address = LOWER(:contractAddress) AND tokens.chain_id = :chainId! AND tokens.token_id = :tokenId!
 * ```
 */
export const addClaimedAmountToToken = new PreparedQuery<IAddClaimedAmountToTokenParams,IAddClaimedAmountToTokenResult>(addClaimedAmountToTokenIR);


/** 'SetTokenRedeemed' parameters type */
export interface ISetTokenRedeemedParams {
  chainId: string;
  contractAddress?: string | null | void;
  tokenId: NumberOrString;
}

/** 'SetTokenRedeemed' return type */
export type ISetTokenRedeemedResult = void;

/** 'SetTokenRedeemed' query type */
export interface ISetTokenRedeemedQuery {
  params: ISetTokenRedeemedParams;
  result: ISetTokenRedeemedResult;
}

const setTokenRedeemedIR: any = {"usedParamSet":{"contractAddress":true,"chainId":true,"tokenId":true},"params":[{"name":"contractAddress","required":false,"transform":{"type":"scalar"},"locs":[{"a":72,"b":87}]},{"name":"chainId","required":true,"transform":{"type":"scalar"},"locs":[{"a":112,"b":120}]},{"name":"tokenId","required":true,"transform":{"type":"scalar"},"locs":[{"a":144,"b":152}]}],"statement":"UPDATE tokens\nSET redeemed = TRUE\nWHERE tokens.contract_address = LOWER(:contractAddress) AND tokens.chain_id = :chainId! AND tokens.token_id = :tokenId!"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE tokens
 * SET redeemed = TRUE
 * WHERE tokens.contract_address = LOWER(:contractAddress) AND tokens.chain_id = :chainId! AND tokens.token_id = :tokenId!
 * ```
 */
export const setTokenRedeemed = new PreparedQuery<ISetTokenRedeemedParams,ISetTokenRedeemedResult>(setTokenRedeemedIR);


/** 'SetBaseUri' parameters type */
export interface ISetBaseUriParams {
  base_uri: string;
  chainId: string;
  contractAddress?: string | null | void;
}

/** 'SetBaseUri' return type */
export type ISetBaseUriResult = void;

/** 'SetBaseUri' query type */
export interface ISetBaseUriQuery {
  params: ISetBaseUriParams;
  result: ISetBaseUriResult;
}

const setBaseUriIR: any = {"usedParamSet":{"base_uri":true,"contractAddress":true,"chainId":true},"params":[{"name":"base_uri","required":true,"transform":{"type":"scalar"},"locs":[{"a":41,"b":50}]},{"name":"contractAddress","required":false,"transform":{"type":"scalar"},"locs":[{"a":84,"b":99}]},{"name":"chainId","required":true,"transform":{"type":"scalar"},"locs":[{"a":127,"b":135}]}],"statement":"UPDATE contracts\nSET metadata_base_url = :base_uri!\nWHERE contracts.address = LOWER(:contractAddress) AND contracts.chain_id = :chainId!"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE contracts
 * SET metadata_base_url = :base_uri!
 * WHERE contracts.address = LOWER(:contractAddress) AND contracts.chain_id = :chainId!
 * ```
 */
export const setBaseUri = new PreparedQuery<ISetBaseUriParams,ISetBaseUriResult>(setBaseUriIR);


/** 'SetPresaleStatus' parameters type */
export interface ISetPresaleStatusParams {
  chainId: string;
  contractAddress?: string | null | void;
  status: boolean;
}

/** 'SetPresaleStatus' return type */
export type ISetPresaleStatusResult = void;

/** 'SetPresaleStatus' query type */
export interface ISetPresaleStatusQuery {
  params: ISetPresaleStatusParams;
  result: ISetPresaleStatusResult;
}

const setPresaleStatusIR: any = {"usedParamSet":{"status":true,"contractAddress":true,"chainId":true},"params":[{"name":"status","required":true,"transform":{"type":"scalar"},"locs":[{"a":34,"b":41}]},{"name":"contractAddress","required":false,"transform":{"type":"scalar"},"locs":[{"a":75,"b":90}]},{"name":"chainId","required":true,"transform":{"type":"scalar"},"locs":[{"a":118,"b":126}]}],"statement":"UPDATE contracts\nSET is_presale = :status!\nWHERE contracts.address = LOWER(:contractAddress) AND contracts.chain_id = :chainId!"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE contracts
 * SET is_presale = :status!
 * WHERE contracts.address = LOWER(:contractAddress) AND contracts.chain_id = :chainId!
 * ```
 */
export const setPresaleStatus = new PreparedQuery<ISetPresaleStatusParams,ISetPresaleStatusResult>(setPresaleStatusIR);


/** 'SetPresalePrice' parameters type */
export interface ISetPresalePriceParams {
  chainId: string;
  contractAddress?: string | null | void;
  price: bigint;
}

/** 'SetPresalePrice' return type */
export type ISetPresalePriceResult = void;

/** 'SetPresalePrice' query type */
export interface ISetPresalePriceQuery {
  params: ISetPresalePriceParams;
  result: ISetPresalePriceResult;
}

const setPresalePriceIR: any = {"usedParamSet":{"price":true,"contractAddress":true,"chainId":true},"params":[{"name":"price","required":true,"transform":{"type":"scalar"},"locs":[{"a":37,"b":43}]},{"name":"contractAddress","required":false,"transform":{"type":"scalar"},"locs":[{"a":77,"b":92}]},{"name":"chainId","required":true,"transform":{"type":"scalar"},"locs":[{"a":120,"b":128}]}],"statement":"UPDATE contracts\nSET presale_price = :price!\nWHERE contracts.address = LOWER(:contractAddress) AND contracts.chain_id = :chainId!"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE contracts
 * SET presale_price = :price!
 * WHERE contracts.address = LOWER(:contractAddress) AND contracts.chain_id = :chainId!
 * ```
 */
export const setPresalePrice = new PreparedQuery<ISetPresalePriceParams,ISetPresalePriceResult>(setPresalePriceIR);


/** 'SetPublicsaleStatus' parameters type */
export interface ISetPublicsaleStatusParams {
  chainId: string;
  contractAddress?: string | null | void;
  status: boolean;
}

/** 'SetPublicsaleStatus' return type */
export type ISetPublicsaleStatusResult = void;

/** 'SetPublicsaleStatus' query type */
export interface ISetPublicsaleStatusQuery {
  params: ISetPublicsaleStatusParams;
  result: ISetPublicsaleStatusResult;
}

const setPublicsaleStatusIR: any = {"usedParamSet":{"status":true,"contractAddress":true,"chainId":true},"params":[{"name":"status","required":true,"transform":{"type":"scalar"},"locs":[{"a":37,"b":44}]},{"name":"contractAddress","required":false,"transform":{"type":"scalar"},"locs":[{"a":78,"b":93}]},{"name":"chainId","required":true,"transform":{"type":"scalar"},"locs":[{"a":121,"b":129}]}],"statement":"UPDATE contracts\nSET is_publicsale = :status!\nWHERE contracts.address = LOWER(:contractAddress) AND contracts.chain_id = :chainId!"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE contracts
 * SET is_publicsale = :status!
 * WHERE contracts.address = LOWER(:contractAddress) AND contracts.chain_id = :chainId!
 * ```
 */
export const setPublicsaleStatus = new PreparedQuery<ISetPublicsaleStatusParams,ISetPublicsaleStatusResult>(setPublicsaleStatusIR);


/** 'SetPublicsalePrice' parameters type */
export interface ISetPublicsalePriceParams {
  chainId: string;
  contractAddress?: string | null | void;
  price: bigint;
}

/** 'SetPublicsalePrice' return type */
export type ISetPublicsalePriceResult = void;

/** 'SetPublicsalePrice' query type */
export interface ISetPublicsalePriceQuery {
  params: ISetPublicsalePriceParams;
  result: ISetPublicsalePriceResult;
}

const setPublicsalePriceIR: any = {"usedParamSet":{"price":true,"contractAddress":true,"chainId":true},"params":[{"name":"price","required":true,"transform":{"type":"scalar"},"locs":[{"a":40,"b":46}]},{"name":"contractAddress","required":false,"transform":{"type":"scalar"},"locs":[{"a":80,"b":95}]},{"name":"chainId","required":true,"transform":{"type":"scalar"},"locs":[{"a":123,"b":131}]}],"statement":"UPDATE contracts\nSET publicsale_price = :price!\nWHERE contracts.address = LOWER(:contractAddress) AND contracts.chain_id = :chainId!"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE contracts
 * SET publicsale_price = :price!
 * WHERE contracts.address = LOWER(:contractAddress) AND contracts.chain_id = :chainId!
 * ```
 */
export const setPublicsalePrice = new PreparedQuery<ISetPublicsalePriceParams,ISetPublicsalePriceResult>(setPublicsalePriceIR);


