import type Pool from "pg";
import { creds, requirePool } from "./pgPool";

export { requirePool, creds };
export type { Pool };


export {
    insertToken,
    saveTransaction,
    addPoints,
    saveNewContract,
    IInsertTokenParams,
    IInsertTokenResult,
    ISaveTransactionParams,
    ISaveTransactionResult,
    IAddPointsParams,
    IAddPointsResult,
    ISaveNewContractParams,
    ISaveNewContractResult
} from './insert.queries.js';

export {
    getContract,
    getHistoryForUser,
    getHistoryForContract,
    getTokenDetails,
    getUserTokens,
    getUserPoints,
    getUserRankWithPoints,
    getActiveTokensByUsersAndContract,
    IGetContractParams,
    IGetContractResult,
    IGetHistoryForUserParams,
    IGetHistoryForUserResult,
    IGetHistoryForContractParams,
    IGetHistoryForContractResult,
    IGetTokenDetailsParams,
    IGetTokenDetailsResult,
    IGetUserTokensParams,
    IGetUserTokensResult,
    IGetUserPointsParams,
    IGetUserPointsResult,
    IGetUserRankWithPointsParams,
    IGetUserRankWithPointsResult,
    IGetActiveTokensByUsersAndContractParams,
    IGetActiveTokensByUsersAndContractResult,
} from './select.queries.js';

export {
    activateContract,
    addMintedAmount,
    addClaimedAmountToToken,
    setTokenRedeemed,
    IActivateContractParams,
    IActivateContractResult,
    IAddMintedAmountParams,
    IAddMintedAmountResult,
    IAddClaimedAmountToTokenParams,
    IAddClaimedAmountToTokenResult,
    ISetTokenRedeemedParams,
    ISetTokenRedeemedResult,
} from './update.queries.js';



