import type Pool from 'pg';
import { creds, requirePool } from './pgPool';
export { requirePool, creds };
export type { Pool };


export {
    insertToken,
    saveTransaction,
    IInsertTokenParams,
    IInsertTokenResult,
    ISaveTransactionParams,
    ISaveTransactionResult,
} from './insert.queries.js';

export {
    getContract,
    getHistoryForUser,
    getHistoryForContract,
    getTokenDetails,
    getUserTokens,
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



