import { userWalletLoginWithoutChecks, updateBackendUri, getRemoteBackendVersion } from '@paima/sdk/mw-core';
declare const endpoints: {
    getAllNfts: (notEnded: boolean) => Promise<import("./types").GetAllNftContractsResponse | import("@paima/sdk/mw-core").FailedResult>;
    getDetailedNftContract: (contractAddress: string) => Promise<import("@paima/sdk/mw-core").FailedResult | import("./types").GetDetailedNftContractResponse>;
    getNftHistoryForUser: (userAddress: string) => Promise<import("@paima/sdk/mw-core").FailedResult | import("./types").GetNftHistoryResponse>;
    getHistoryForProject: (contractAddress: string) => Promise<import("@paima/sdk/mw-core").FailedResult | import("./types").GetNftHistoryResponse>;
    getUserNfts: (userAddress: string) => Promise<import("@paima/sdk/mw-core").FailedResult | import("./types").GetUserNftsResponse>;
    getClaimable: (nftAddress: string, tokenId: string) => Promise<import("@paima/sdk/mw-core").FailedResult | import("./types").GetClaimableResponse>;
    exportLogs: () => string;
    pushLog: (message: any, ...optionalParams: any[]) => void;
    getLatestProcessedBlockHeight: () => Promise<import("@paima/sdk/mw-core").Result<number>>;
    userWalletLogin: (loginInfo: import("@paima/sdk/mw-core").LoginInfo, setDefault?: boolean | undefined) => Promise<import("@paima/sdk/mw-core").Result<import("@paima/sdk/mw-core").Wallet>>;
    checkWalletStatus: () => Promise<import("@paima/sdk/mw-core").OldResult>;
};
export * from './types';
export type * from './types';
export { userWalletLoginWithoutChecks, updateBackendUri, getRemoteBackendVersion };
export default endpoints;
