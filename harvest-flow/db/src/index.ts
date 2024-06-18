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
    getContractsList,
    getHistoryForUser,
    getHistoryForContract,
    getTokenDetails,
    getUserTokens,
    getUserPoints,
    getUserRankWithPoints,
    getActiveTokensByUsersAndContract,
    getTotalLoaned,
    getTotalRepaid,
    getOwnersCount,
    IGetContractParams,
    IGetContractResult,
    IGetContractsListResult,
    IGetContractsListParams,
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
    IGetTotalLoanedResult,
    IGetTotalRepaidResult,
    IGetOwnersCountResult,
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



