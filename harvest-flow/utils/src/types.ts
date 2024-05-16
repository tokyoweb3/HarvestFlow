
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

    supplyCap: bigint
    mintedAmount: bigint; // <= supplyCap

    leaseStart: number;
    leaseEnd: number;
    minYield: bigint; // min fixed interest rate scaled by 1e18

    accepted_token: string; // Dai only for now
    price: bigint; // price to purchase the NFT

    metadata: any; // cached data from IPFS

    activated: boolean; // see spec
}

export interface NftHistory {
    address: string;
    history: NftHistoryEvent[];
}

export enum NftHistoryEventType {
    CONTRACT_CREATED = 'contract_created',
    MINT = 'mint',
    ACTIVATE = 'activate',
    CLAIM = 'claim',
    REDEEM = 'redeem',
}

export type NftHistoryEvent = {
    eventType: NftHistoryEventType;
    price?: bigint;
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



