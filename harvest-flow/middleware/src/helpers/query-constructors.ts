import type { QueryOptions } from '@paima/sdk/mw-core';
import { buildBackendQuery } from '@paima/sdk/mw-core';

export function backendQueryGetAllNfts(notEnded: boolean): string {
    const endpoint = 'all_nft';
    const options : QueryOptions = {
        notEnded,
    }
    return buildBackendQuery(endpoint, options);
}

export function backendQueryGetDetailedNftContract(contractAddress: string): string {
    const endpoint = 'nft_details';
    const options : QueryOptions = {
        contractAddress,
    }

    return buildBackendQuery(endpoint, options);
}

export function backendQueryGetNftHistoryForUser(userAddress: string): string {
    const endpoint = 'nft_history/user';
    const options : QueryOptions = {
        userAddress,
    }

    return buildBackendQuery(endpoint, options);
}

export function backendQueryGetNftHistoryForProject(contractAddress: string): string {
    const endpoint = 'nft_history/project';
    const options : QueryOptions = {
        contractAddress,
    }

    return buildBackendQuery(endpoint, options);
}

export function backendQueryGetUserDetails(userAddress: string): string {
    const endpoint = 'user_details';
    const options : QueryOptions = {
        userAddress,
    }

    return buildBackendQuery(endpoint, options);
}

export function backendQueryGetSummary(): string {
    const endpoint = 'summary';
    const options : QueryOptions = {}

    return buildBackendQuery(endpoint, options);
}
