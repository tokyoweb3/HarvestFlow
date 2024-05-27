// Returns a ellipsis version of a string with the ellipsis being in the middle
// eg. `0X97819177AF742660E6D8612F5E7882E538C7D9C9` will become `0x9781917..D9C9`
import { NftContractDetails, NftDetails } from "@harvest-flow/utils";
import { YEAR_IN_S } from "@src/utils/constants";
import { ethers } from "ethers";

export function middleEllipsis(address: string, length: number = 15) {
    const splitter = '...'
    const resultingLength = length - splitter.length
    const tailingLength = 4

    if (address.length <= length || length <= tailingLength + splitter.length) return address

    return `${address.slice(0, resultingLength - tailingLength)}${splitter}${address.slice(
        address.length - tailingLength,
        address.length,
    )}`
}

export function formatTime(time: number): string {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);

    return `${String(days)} d ${String(hours).padStart(2, '0')} hrs ${String(minutes).padStart(2, '0')} mins ${String(seconds).padStart(2, '0')} secs`;
}

export function formatTimestampForHistoryTable(timestamp: number): string {
    const date = new Date(timestamp); // Convert epoch to milliseconds

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[date.getMonth()];

    const day = date.getDate();
    const daySuffix = (day: number): string => {
        if (day > 3 && day < 21) return "th"; // Covers 11th to 20th
        switch (day % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    };

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${month}.${day}${daySuffix(day)} ${hours}:${minutes}:${seconds}`;
}

export function calculateTotalRewards(
    nftDetails: NftContractDetails,
    amountToBuy: number
): number {
    const timeLeft = nftDetails.leaseEnd - Date.now();
    return (amountToBuy * Number(ethers.utils.formatEther(nftDetails.price))) * Number(ethers.utils.formatEther(nftDetails.minYield)) * timeLeft / YEAR_IN_S / 1000;
}

export function getTotalYieldForNft(nft: NftDetails): number {
    if(Date.now() < nft.lendingData.lendingStart) return 0;
    const annualYield = (BigInt(nft.lendingData.principle) * BigInt(nft.lendingData.yield)) / BigInt(1e18);

    // Proportion of time interval from the beginning of lending period until now to a year, scaled to the 1e18
    const proportionOfIntervalTotalScaled = (Math.min(Date.now(), nft.lendingData.lendingEnd) - nft.lendingData.lendingStart)/1000/ YEAR_IN_S;

    // Scale the claimable interest to the payable token's decimals and subtract already claimed amount
    return Number(ethers.utils.formatEther(annualYield)) * proportionOfIntervalTotalScaled;
}

export function getClaimableYieldForNft(nft: NftDetails): number {
    return getTotalYieldForNft(nft) - Number(ethers.utils.formatEther(nft.lendingData.claimedYield));
}

export function getTotalYieldForUser(userNfts : NftDetails[]): number {
    return userNfts.reduce((total, nft) => total + getTotalYieldForNft(nft), 0);
}

export function getClaimableYieldForUser(userNfts : NftDetails[]): number {
    return userNfts.reduce((total, nft) => total + getClaimableYieldForNft(nft), 0);
}

export function getEquityForNft(nft: NftDetails): number {
    const lendingAmount = nft.lendingData.isRedeemed ? 0 : Number(ethers.utils.formatEther(nft.lendingData.principle));
    const claimableYield = getTotalYieldForNft(nft) - Number(ethers.utils.formatEther(nft.lendingData.claimedYield));
    return lendingAmount + claimableYield;
}
export function getTotalEquity(userNfts : NftDetails[]): number {

    return userNfts.reduce((total, nft) => total + getEquityForNft(nft), 0);
}

export function getLendingAmountForNft(nft: NftDetails): number {
    return nft.lendingData.isRedeemed ? 0 : Number(ethers.utils.formatEther(nft.lendingData.principle));
}

export function getTotalLendingAmount(userNfts : NftDetails[]): number {

    return userNfts.reduce((total, nft) => total + getLendingAmountForNft(nft), 0);
}

export function getClaimablePrincipleForNft(nft: NftDetails): number {
    if(nft.lendingData.isRedeemed || Date.now() < nft.lendingData.lendingEnd) return 0;
    else return Number(ethers.utils.formatEther(nft.lendingData.principle));
}

export function getClaimablePrincipleForUser(userNfts : NftDetails[]): number {
    return userNfts.reduce((total, nft) => total + getClaimablePrincipleForNft(nft), 0);
}

export const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
  arr.reduce((groups, item) => {
      (groups[key(item)] ||= []).push(item);
      return groups;
  }, {} as Record<K, T[]>);
