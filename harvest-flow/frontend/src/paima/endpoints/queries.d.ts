import type { FailedResult } from '@paima/sdk/utils';
import type { GetAllNftContractsResponse, GetDetailedNftContractResponse, GetNftHistoryResponse, GetRWADataResponse, GetSummaryResponse, GetUserDetailsResponse } from '../types';
declare function getAllNfts(justActive: boolean): Promise<GetAllNftContractsResponse | FailedResult>;
declare function getDetailedNftContract(contractAddress: string): Promise<GetDetailedNftContractResponse | FailedResult>;
declare function getNftHistoryForUser(userAddress: string): Promise<GetNftHistoryResponse | FailedResult>;
declare function getHistoryForProject(contractAddress: string): Promise<GetNftHistoryResponse | FailedResult>;
declare function getUserDetails(userAddress: string): Promise<GetUserDetailsResponse | FailedResult>;
declare function getSummary(): Promise<GetSummaryResponse | FailedResult>;
declare function getRWAData(contractAddress: string, tokenId: string): Promise<GetRWADataResponse | FailedResult>;
export declare const queryEndpoints: {
    getAllNfts: typeof getAllNfts;
    getDetailedNftContract: typeof getDetailedNftContract;
    getNftHistoryForUser: typeof getNftHistoryForUser;
    getHistoryForProject: typeof getHistoryForProject;
    getUserDetails: typeof getUserDetails;
    getSummary: typeof getSummary;
    getRWAData: typeof getRWAData;
};
export {};
