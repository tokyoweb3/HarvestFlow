import type { FailedResult } from '@paima/sdk/mw-core';
import { PaimaMiddlewareErrorCode } from '@paima/sdk/mw-core';
import { NftContract, NftContractDetails, NftHistory, Summary, UserDetails } from "@harvest-flow/utils";
import {
    backendQueryGetAllNfts,
    backendQueryGetDetailedNftContract,
    backendQueryGetNftHistoryForProject,
    backendQueryGetNftHistoryForUser,
    backendQueryGetSummary,
    backendQueryGetUserDetails
} from "../helpers/query-constructors";
import {
    GetAllNftContractsResponse,
    GetDetailedNftContractResponse,
    GetNftHistoryResponse,
    GetSummaryResponse,
    GetUserDetailsResponse
} from "../types";
import {buildEndpointErrorFxn, MiddlewareErrorCode} from "../errors";

async function getAllNfts(notEnded : boolean): Promise<GetAllNftContractsResponse | FailedResult> {

    const errorFxn = buildEndpointErrorFxn('getAllNfts');

    let response: Response;
    try {
        const query = backendQueryGetAllNfts(notEnded);
        response = await fetch(query);
    } catch (err) {
        return errorFxn(PaimaMiddlewareErrorCode.ERROR_QUERYING_BACKEND_ENDPOINT, err);
    }

    try {
        const contracts =  (await response.json()) as NftContract[];
        return {success: true, contracts : contracts};
    } catch (err) {
        return errorFxn(PaimaMiddlewareErrorCode.INVALID_RESPONSE_FROM_BACKEND, err);
    }
}

async function getDetailedNftContract(contractAddress: string): Promise<GetDetailedNftContractResponse | FailedResult> {
    const errorFxn = buildEndpointErrorFxn('getDetailedNftContract');
    let response: Response;

    try {
        const query = backendQueryGetDetailedNftContract(contractAddress);
        response = await fetch(query);
    } catch (err) {
        return errorFxn(PaimaMiddlewareErrorCode.ERROR_QUERYING_BACKEND_ENDPOINT, err);
    }

    if(response.status === 204) {
        return errorFxn(MiddlewareErrorCode.CONTRACT_NOT_FOUND, `Contract with address ${contractAddress} is not found`);
    }

    try {
        const contractDetails = (await response.json()) as NftContractDetails;
        return {success: true, contract: contractDetails};
    } catch (err) {
        return errorFxn(PaimaMiddlewareErrorCode.INVALID_RESPONSE_FROM_BACKEND, err);
    }
}

async function getNftHistoryForUser(userAddress: string): Promise<GetNftHistoryResponse | FailedResult> {
    const errorFxn = buildEndpointErrorFxn('getUserNftHistory');
    let response: Response;

    try {
        const query = backendQueryGetNftHistoryForUser(userAddress);
        response = await fetch(query);
    } catch (err) {
        return errorFxn(PaimaMiddlewareErrorCode.ERROR_QUERYING_BACKEND_ENDPOINT, err);
    }

    try {
        const nftHistory = (await response.json()) as NftHistory;
        return {success: true, address: nftHistory.address, history: nftHistory.history};
    } catch (err) {
        return errorFxn(PaimaMiddlewareErrorCode.INVALID_RESPONSE_FROM_BACKEND, err);
    }

}

async function getHistoryForProject(contractAddress: string): Promise<GetNftHistoryResponse | FailedResult> {
    const errorFxn = buildEndpointErrorFxn('getProjectHistory');
    let response: Response;

    try {
        const query = backendQueryGetNftHistoryForProject(contractAddress);
        response = await fetch(query);
    } catch (err) {
        return errorFxn(PaimaMiddlewareErrorCode.ERROR_QUERYING_BACKEND_ENDPOINT, err);
    }

    try {
        const nftHistory = (await response.json()) as NftHistory;
        return {success: true, address: nftHistory.address, history: nftHistory.history};
    } catch (err) {
        return errorFxn(PaimaMiddlewareErrorCode.INVALID_RESPONSE_FROM_BACKEND, err);
    }

}

async function getUserDetails(userAddress: string): Promise<GetUserDetailsResponse | FailedResult> {
    const errorFxn = buildEndpointErrorFxn('getUserDetails');
    let response: Response;

    try {
        const query = backendQueryGetUserDetails(userAddress);
        response = await fetch(query);
    } catch (err) {
        return errorFxn(PaimaMiddlewareErrorCode.ERROR_QUERYING_BACKEND_ENDPOINT, err);
    }

    try {
        const userDetails = (await response.json()) as UserDetails;
        return {success: true, data: userDetails};
    } catch (err) {
        return errorFxn(PaimaMiddlewareErrorCode.INVALID_RESPONSE_FROM_BACKEND, err);
    }
}

async function getSummary(): Promise<GetSummaryResponse | FailedResult> {
    const errorFxn = buildEndpointErrorFxn('getSummary');
    let response: Response;

    try {
        const query = backendQueryGetSummary();
        response = await fetch(query);
    } catch (err) {
        return errorFxn(PaimaMiddlewareErrorCode.ERROR_QUERYING_BACKEND_ENDPOINT, err);
    }

    try {
        const summary = (await response.json()) as Summary;
        return {success: true, data: summary};
    } catch (err) {
        return errorFxn(PaimaMiddlewareErrorCode.INVALID_RESPONSE_FROM_BACKEND, err);
    }
}

export const queryEndpoints = {
    getAllNfts,
    getDetailedNftContract,
    getNftHistoryForUser,
    getHistoryForProject,
    getUserDetails,
    getSummary
}