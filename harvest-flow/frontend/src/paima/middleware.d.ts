import { userWalletLoginWithoutChecks, updateBackendUri, getRemoteBackendVersion } from '@paima/sdk/mw-core';
declare const endpoints: {
    getAllNfts: (justActive: boolean) => Promise<import("./types").GetAllNftContractsResponse | import("@paima/utils").FailedResult>;
    getDetailedNftContract: (contractAddress: string) => Promise<import("./types").GetDetailedNftContractResponse | import("@paima/utils").FailedResult>;
    getNftHistoryForUser: (userAddress: string) => Promise<import("./types").GetNftHistoryResponse | import("@paima/utils").FailedResult>;
    getHistoryForProject: (contractAddress: string) => Promise<import("./types").GetNftHistoryResponse | import("@paima/utils").FailedResult>;
    getUserDetails: (userAddress: string) => Promise<import("./types").GetUserDetailsResponse | import("@paima/utils").FailedResult>;
    getSummary: () => Promise<import("./types").GetSummaryResponse | import("@paima/utils").FailedResult>;
    getRWAData: (contractAddress: string, tokenId: string) => Promise<import("./types").GetRWADataResponse | import("@paima/utils").FailedResult>;
    exportLogs: () => string;
    pushLog: (message: any, ...optionalParams: any[]) => void;
    getLatestProcessedBlockHeight: () => Promise<import("@paima/utils").Result<number>>;
    userWalletLogin: (loginInfo: import("@paima/mw-core/build/types").LoginInfo, setDefault?: boolean) => Promise<import("@paima/utils").Result<import("@paima/sdk/mw-core").Wallet>>;
    checkWalletStatus: () => Promise<import("@paima/utils").OldResult>;
};
export * from './types';
export type * from './types';
export { userWalletLoginWithoutChecks, updateBackendUri, getRemoteBackendVersion };
export default endpoints;
