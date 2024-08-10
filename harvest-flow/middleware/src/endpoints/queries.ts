import type { FailedResult } from '@paima/sdk/utils';
import { PaimaMiddlewareErrorCode } from '@paima/sdk/mw-core';
import type { NftHistoryEvent } from '@harvest-flow/utils';
import type {
  GetAllNftContractsResponse,
  GetDetailedNftContractResponse,
  GetNftHistoryResponse,
  GetRWADataResponse,
  GetSummaryResponse,
  GetUserDetailsResponse,
} from '../types';
import { buildEndpointErrorFxn, MiddlewareErrorCode } from '../errors';
import { getGameRestClient } from '../client';

async function getAllNfts(justActive: boolean): Promise<GetAllNftContractsResponse | FailedResult> {
  const errorFxn = buildEndpointErrorFxn('getAllNfts');

  try {
    const { data, error } = await getGameRestClient().GET('/all_nft', {
      params: { query: { justActive } },
    });
    if (error != null) {
      return errorFxn(PaimaMiddlewareErrorCode.ERROR_QUERYING_BACKEND_ENDPOINT, error);
    }
    return {
      success: true,
      contracts: data,
    };
  } catch (err) {
    return errorFxn(PaimaMiddlewareErrorCode.ERROR_QUERYING_BACKEND_ENDPOINT, err);
  }
}

async function getDetailedNftContract(
  contractAddress: string
): Promise<GetDetailedNftContractResponse | FailedResult> {
  const errorFxn = buildEndpointErrorFxn('getDetailedNftContract');

  try {
    const { data, error } = await getGameRestClient().GET('/nft_details', {
      params: { query: { contractAddress } },
    });
    if (data == null) {
      return errorFxn(
        MiddlewareErrorCode.CONTRACT_NOT_FOUND,
        `Contract with address ${contractAddress} is not found`
      );
    }
    if (error != null) {
      return errorFxn(PaimaMiddlewareErrorCode.ERROR_QUERYING_BACKEND_ENDPOINT, error);
    }

    return {
      success: true,
      contract: data,
    };
  } catch (err) {
    return errorFxn(PaimaMiddlewareErrorCode.ERROR_QUERYING_BACKEND_ENDPOINT, err);
  }
}

async function getNftHistoryForUser(
  userAddress: string
): Promise<GetNftHistoryResponse | FailedResult> {
  const errorFxn = buildEndpointErrorFxn('getUserNftHistory');

  try {
    const { data, error } = await getGameRestClient().GET('/nft_history/user', {
      params: { query: { userAddress } },
    });
    if (error != null) {
      return errorFxn(PaimaMiddlewareErrorCode.ERROR_QUERYING_BACKEND_ENDPOINT, error);
    }

    return {
      success: true,
      address: data.address,
      history: data.history as NftHistoryEvent[],
    };
  } catch (err) {
    return errorFxn(PaimaMiddlewareErrorCode.ERROR_QUERYING_BACKEND_ENDPOINT, err);
  }
}

async function getHistoryForProject(
  contractAddress: string
): Promise<GetNftHistoryResponse | FailedResult> {
  const errorFxn = buildEndpointErrorFxn('getProjectHistory');

  try {
    const { data, error } = await getGameRestClient().GET('/nft_history/project', {
      params: { query: { contractAddress } },
    });
    if (error != null) {
      return errorFxn(PaimaMiddlewareErrorCode.ERROR_QUERYING_BACKEND_ENDPOINT, error);
    }

    return {
      success: true,
      address: data.address,
      history: data.history as NftHistoryEvent[],
    };
  } catch (err) {
    return errorFxn(PaimaMiddlewareErrorCode.ERROR_QUERYING_BACKEND_ENDPOINT, err);
  }
}

async function getUserDetails(userAddress: string): Promise<GetUserDetailsResponse | FailedResult> {
  const errorFxn = buildEndpointErrorFxn('getUserDetails');

  try {
    const { data, error } = await getGameRestClient().GET('/user_details', {
      params: { query: { userAddress } },
    });
    if (error != null) {
      return errorFxn(PaimaMiddlewareErrorCode.ERROR_QUERYING_BACKEND_ENDPOINT, error);
    }

    return {
      success: true,
      data,
    };
  } catch (err) {
    return errorFxn(PaimaMiddlewareErrorCode.ERROR_QUERYING_BACKEND_ENDPOINT, err);
  }
}

async function getSummary(): Promise<GetSummaryResponse | FailedResult> {
  const errorFxn = buildEndpointErrorFxn('getSummary');

  try {
    const { data, error } = await getGameRestClient().GET('/summary', {
      params: { query: undefined },
    });
    if (error != null) {
      return errorFxn(PaimaMiddlewareErrorCode.ERROR_QUERYING_BACKEND_ENDPOINT, error);
    }

    return {
      success: true,
      data,
    };
  } catch (err) {
    return errorFxn(PaimaMiddlewareErrorCode.ERROR_QUERYING_BACKEND_ENDPOINT, err);
  }
}

async function getRWAData(
  contractAddress: string,
  tokenId: string
): Promise<GetRWADataResponse | FailedResult> {
  const errorFxn = buildEndpointErrorFxn('getRWAData');

  try {
    const { data, error } = await getGameRestClient().GET('/rwaData', {
      params: { query: { contractAddress, tokenId } },
    });
    if (error != null) {
      return errorFxn(PaimaMiddlewareErrorCode.ERROR_QUERYING_BACKEND_ENDPOINT, error);
    }

    return {
      success: true,
      data,
    };
  } catch (err) {
    return errorFxn(PaimaMiddlewareErrorCode.ERROR_QUERYING_BACKEND_ENDPOINT, err);
  }
}

export const queryEndpoints = {
  getAllNfts,
  getDetailedNftContract,
  getNftHistoryForUser,
  getHistoryForProject,
  getUserDetails,
  getSummary,
  getRWAData,
};
