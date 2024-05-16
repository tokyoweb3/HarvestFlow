import type { FailedResult } from '@paima/sdk/mw-core';
import { GetAllNftContractsResponse, GetClaimableResponse, GetDetailedNftContractResponse, GetNftHistoryResponse, GetUserDetailsResponse } from "../types";
declare function getAllNfts(notEnded: boolean): Promise<GetAllNftContractsResponse | FailedResult>;
declare function getDetailedNftContract(contractAddress: string): Promise<GetDetailedNftContractResponse | FailedResult>;
declare function getNftHistoryForUser(userAddress: string): Promise<GetNftHistoryResponse | FailedResult>;
declare function getHistoryForProject(contractAddress: string): Promise<GetNftHistoryResponse | FailedResult>;
declare function getUserDetails(userAddress: string): Promise<GetUserDetailsResponse | FailedResult>;
declare function getClaimable(nftAddress: string, tokenId: string): Promise<GetClaimableResponse | FailedResult>;
export declare const queryEndpoints: {
    getAllNfts: typeof getAllNfts;
    getDetailedNftContract: typeof getDetailedNftContract;
    getNftHistoryForUser: typeof getNftHistoryForUser;
    getHistoryForProject: typeof getHistoryForProject;
    getUserDetails: typeof getUserDetails;
    getClaimable: typeof getClaimable;
};
export {};
