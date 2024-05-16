
export interface NftContract {
    name: string; // erc721
    symbol:  string; // erc721

    chainId: string; // caip-2 format

    leaseStart: number;
    leaseEnd: number;
}

export interface NftContractDetails {
    name: string; // erc721
    symbol:  string; // erc721

    chainId: string; // caip-2 format
    address: string; // address on chain

    supplyCap: number
    mintedAmount: number; // <= supplyCap

    leaseStart: number;
    leaseEnd: number;
    minYield: number; // min fixed interest rate

    accepted_token: string; // Dai only for now
    price: string;
    poolBalance: string; // funds remaining in the contract to pay holders

    metadata: any; // cached data from IPFS

    activated: boolean; // see spec
}

export interface NftHistory {
    address: string;
    history: NftHistoryEvent[];
}

export type NftHistoryEventType =  'contract_created' | 'purchase' | 'activate' | 'claim' | 'remove_principal' | 'withdraw' | 'deposit';
export type NftHistoryEvent = {
    eventType: NftHistoryEventType;
    price?: string;
    projectName?: string;
    transactionHash: string;
    timestamp: number;
}

export interface UserDetails {
    ownedNfts: Record<string, number[]>;
    points: number;
    rank: number;
    lendingAmount: number;
    totalYield: number;
    apr: number;
    claimableYield: number;
    claimablePrincipal: number;
}

export interface ClaimableYield {
    yield: string;
    principal: string;
}



