import type Pool from 'pg';
import { creds, requirePool } from './pgPool';
export { requirePool, creds };
export type { Pool };


export {
    insertToken,
    saveTransaction,
    addPoints,
    IInsertTokenParams,
    IInsertTokenResult,
    ISaveTransactionParams,
    ISaveTransactionResult,
    IAddPointsParams,
    IAddPointsResult,
} from './insert.queries.js';

export {
    getContract,
    getHistoryForUser,
    getHistoryForContract,
    getTokenDetails,
    getUserTokens,
    getUserPoints,
    getUserRankWithPoints,
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



