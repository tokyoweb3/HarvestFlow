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


