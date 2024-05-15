import type Pool from 'pg';
import { creds, requirePool } from './pgPool';
export { requirePool, creds };
export type { Pool };


export {
    insertMint,
    saveTransaction,
    IInsertMintParams,
    IInsertMintResult,
    ISaveTransactionParams,
    ISaveTransactionResult,
} from './insert.queries.js';

export {
    getContract,
    getHistoryForUser,
    getHistoryForContract,
    IGetContractParams,
    IGetContractResult,
    IGetHistoryForUserParams,
    IGetHistoryForUserResult,
    IGetHistoryForContractParams,
    IGetHistoryForContractResult,
} from './select.queries.js';

export {
    activateContract,
    addMintedAmount,
    IActivateContractParams,
    IActivateContractResult,
    IAddMintedAmountParams,
    IAddMintedAmountResult,
} from './update.queries.js';



