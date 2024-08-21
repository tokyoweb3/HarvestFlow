import type { DeviceDetails, NftContract, NftContractDetails, NftHistoryEvent, Summary, UserDetails } from '@harvest-flow/utils';
export interface GetAllNftContractsResponse {
    success: boolean;
    contracts: NftContract[];
}
export interface GetDetailedNftContractResponse {
    success: boolean;
    contract: NftContractDetails;
}
export interface GetNftHistoryResponse {
    success: boolean;
    address: string;
    history: NftHistoryEvent[];
}
export interface GetUserDetailsResponse {
    success: boolean;
    data: UserDetails;
}
export interface GetSummaryResponse {
    success: boolean;
    data: Summary;
}
export interface GetRWADataResponse {
    success: boolean;
    data: DeviceDetails;
}
