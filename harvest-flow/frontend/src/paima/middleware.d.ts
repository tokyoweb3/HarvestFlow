import { userWalletLoginWithoutChecks, updateBackendUri, getRemoteBackendVersion } from '@paima/sdk/mw-core';
declare const endpoints: {
    getAllNfts: (notEnded: boolean) => Promise<import("./types").GetAllNftContractsResponse | import("@paima/sdk/mw-core").FailedResult>;
    getDetailedNftContract: (contractAddress: string) => Promise<import("./types").GetDetailedNftContractResponse | import("@paima/sdk/mw-core").FailedResult>;
    getNftHistoryForUser: (userAddress: string) => Promise<import("./types").GetNftHistoryResponse | import("@paima/sdk/mw-core").FailedResult>;
    getHistoryForProject: (contractAddress: string) => Promise<import("./types").GetNftHistoryResponse | import("@paima/sdk/mw-core").FailedResult>;
    getUserDetails: (userAddress: string) => Promise<import("./types").GetUserDetailsResponse | import("@paima/sdk/mw-core").FailedResult>;
    getSummary: () => Promise<import("./types").GetSummaryResponse | import("@paima/sdk/mw-core").FailedResult>;
    getRWAData: (contractAddress: string, tokenId: string) => Promise<import("./types").GetRWADataResponse | import("@paima/sdk/mw-core").FailedResult>;
    exportLogs: () => string;
    pushLog: (message: any, ...optionalParams: any[]) => void;
    getLatestProcessedBlockHeight: () => Promise<import("@paima/sdk/mw-core").Result<number>>;
    userWalletLogin: (loginInfo: import("@paima/mw-core/build/types").LoginInfo, setDefault?: boolean) => Promise<import("@paima/sdk/mw-core").Result<import("@paima/sdk/mw-core").Wallet>>;
    checkWalletStatus: () => Promise<import("@paima/sdk/mw-core").OldResult>;
};
export * from './types';
export type * from './types';
export { userWalletLoginWithoutChecks, updateBackendUri, getRemoteBackendVersion };
export default endpoints;
