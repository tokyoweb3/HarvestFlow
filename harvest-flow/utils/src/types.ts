
export interface NftContract {
    name: string; // erc721
    symbol:  string; // erc721

    chainId: string; // caip-2 format
    address: string; // address on chain

    leaseStart: number;
    leaseEnd: number;
}

export interface NftContractDetails {
    name: string; // erc721
    symbol:  string; // erc721

    chainId: string; // caip-2 format
    address: string; // address on chain

    supplyCap: string; // max mintedAmount
    mintedAmount: string; // <= supplyCap

    leaseStart: number;
    leaseEnd: number;
    minYield: string; // min fixed interest rate scaled by 1e18

    accepted_token: string; // Dai only for now
    price: string; // price to purchase the NFT

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
    price?: string;
    projectName?: string;
    transactionHash: string;
    timestamp: number;
}

export interface UserDetails {
    points: number;
    rank: number;
    ownedNfts: NftDetails[];
}

export interface NftDetails {
    tokenId: string;
    contractAddress: string;
    projectName: string;
    lendingData: {
        principle: string;
        lendingStart: number;
        lendingEnd: number;
        yield: string;
        claimedYield: string;
        isRedeemed: boolean;
    };
    metadata: {
        image: string;
    }

}

export interface Summary {
    totalLoaned: number; // amount in Dai
    totalRepaid: number; // amount in Dai
    userCount: number;
}

export interface DeviceSummary {
    deviceId: number;
    totalMileage: number;
    totalDrivingTime: number;
    operationStarted: Date;
}

interface DeviceHistory {
    eventTime: number;
    eventDescription: string;
}

interface DailyDeviceSummary {
    date: string;
    dailyMileage: number;
    dailyDrivingTime: number;
}

export interface DeviceDetails {
    deviceId: number;
    totalMileage: number;
    totalDrivingTime: number;
    assetType: string;
    vehicleModel: string;
    history: DeviceHistory[];
    dailySummary: DailyDeviceSummary[];
}



