import * as Paima from "./paima/middleware.js";
import type { FailedResult, LoginInfo } from "@paima/sdk/mw-core";
import type {
  DeviceDetails,
  NftContract,
  NftContractDetails,
  NftDetails,
  NftHistory,
  // Summary,
  UserDetails,
} from "@harvest-flow/utils";
import { Web3Provider } from "@ethersproject/providers";
import { Contract, ethers } from "ethers";
import TokTokNftAbi from "./abi/TokTokNft";
import { WalletMode } from "@paima/providers";
import type { Wallet } from '@paima/sdk/mw-core';

// The MainController is a React component that will be used to control the state of the application
// It will be used to check if the user has metamask installed and if they are connected to the correct network
// Other settings also will be controlled here

// create string enum called AppState
export enum Page {
  Account = "/account",
  AccountProject = "/account-project",
  Project = "/project",
  Reports = "/reports",
  FAQ = "/faq",
  Homepage = "/",
}

const LocalstorageWalletCacheKey = 'walletConnected';

const NFT_FACTORY_CONTRACT_ADDRESS: string =
  process.env.TOKTOK_NFT_FACTORY_CONTRACT_ADDRESS;
const PAYMENT_TOKEN_CONTRACT_ADDRESS: string =
  process.env.PAYMENT_TOKEN_CONTRACT_ADDRESS;

// This is a class that will be used to control the state of the application
// the benefit of this is that it is very easy to test its logic unlike a react component
class MainController {
  connectedWallet: Wallet | null = null;
  connectWalletError: string | null;
  
  private provider?: Web3Provider = undefined;

  callback: (
    loadingMessage: string | null,
    successMessage: string | null,
    errorMessage: string | null,
  ) => void = () => {};

  disconnect = (): void => {
    localStorage.removeItem(LocalstorageWalletCacheKey);

    // note: it's possible to have smarter refresh logic than just reloading the page
    //       but this is much less likely to go wrong
    location.reload();
  }

  tryReconnect = async (): Promise<Wallet | null> => {
    if (localStorage.getItem(LocalstorageWalletCacheKey) != null) {
      // TODO: if you want the user to pick the wallet, see `getWalletOptions`
      // https://docs.paimastudios.com/home/multichain-support/wallet-layer/introduction
      return await this.connectWallet({
        mode: WalletMode.EvmInjected,
        preferBatchedMode: false,
      });
    }
    return null;
  }
  
  isWalletConnected = (): boolean => {
    return this.connectedWallet !== null;
  };

  async connectWallet(
    loginInfo: LoginInfo,
    locale: string = "en",
  ): Promise<Wallet | null> {
    this.connectWalletError = null;

    const response = await Paima.default.userWalletLogin(loginInfo);
    if (response.success === true) {
      this.callback(
        null,
        locale === "en"
          ? `Wallet connected to address: ${response.result.walletAddress}`
          : locale === "jp"
            ? `ウオレット接続します: ${response.result.walletAddress}`
            : `Wallet connected to address: ${response.result.walletAddress}`,
        null,
      );
      this.connectedWallet = response.result;
      this.provider = new Web3Provider(window.ethereum);
      localStorage.setItem(LocalstorageWalletCacheKey, JSON.stringify(response.result));
      return response.result;
    } else {
      this.connectWalletError = response.errorMessage;
      return null;
    }
  }

  async buyNft(
    contractAddress: string,
    amountToBuy: number,
    price: bigint,
  ): Promise<boolean> {
    if (!this.isWalletConnected()) {
      this.callback(null, null, "Wallet not connected");
      return false;
    }

    const amountToPay = amountToBuy * Number(ethers.utils.formatEther(price));
    // get approval for the contract
    this.callback("Approving payment", null, null);
    const paymentTokenContract = new Contract(
      PAYMENT_TOKEN_CONTRACT_ADDRESS,
      [
        "function approve(address _spender, uint256 _value) public returns (bool success)",
      ],
      this.provider.getSigner(),
    );

    let approved = false;

    const amountToApprove = ethers.utils.parseEther(amountToPay.toString());

    try {
      await paymentTokenContract.approve(contractAddress, amountToApprove);
      approved = true;
    } catch (e) {
      console.error("Error approving payment: ", e);
      this.callback(null, null, "Error approving payment");
      return false;
    }

    if (approved) {
      this.callback("Buying NFT", null, null);
      try {
        const lendingContract = new Contract(
          contractAddress,
          TokTokNftAbi,
          this.provider.getSigner(),
        );
        await lendingContract.publicMint(amountToBuy);
        return true;
      } catch (e) {
        console.error("Error buying NFT: ", e);
        this.callback(null, null, "Error buying NFT");
        return false;
      }
    }
  }

  async getAllNft(notEnded: boolean): Promise<NftContract[]> {
    const response = await Paima.default.getAllNfts(notEnded);
    console.debug("Get All Nft response: ", response);
    if (!response.success) {
      throw new Error((response as FailedResult).errorMessage);
    }
    return response.contracts;
  }

  async getDetailedNftContract(
    contractAddress: string,
  ): Promise<NftContractDetails> {
    const response =
      await Paima.default.getDetailedNftContract(contractAddress);
    console.debug("Get Nft Detail response: ", response);
    if (!response.success) {
      console.error("Error getting NFT details: ", response);
      return null;
    }
    return response.contract;
  }

  async getNftHistoryForUser(): Promise<NftHistory> {
    const response = await Paima.default.getNftHistoryForUser(
      this.connectedWallet!.walletAddress,
    );
    if (!response.success) {
      throw new Error((response as FailedResult).errorMessage);
    }
    return { address: response.address, history: response.history };
  }

  async getProjectHistory(contractAddress: string): Promise<NftHistory> {
    const response = await Paima.default.getHistoryForProject(contractAddress);
    if (!response.success) {
      throw new Error((response as FailedResult).errorMessage);
    }
    return { address: response.address, history: response.history };
  }

  async getUserDetails(): Promise<UserDetails> {
    const response = await Paima.default.getUserDetails(this.connectedWallet!.walletAddress);
    console.debug("Get User details response: ", response);
    if (!response.success) {
      throw new Error((response as FailedResult).errorMessage);
    }
    return response.data;
  }

  async claimInterestForToken(contract: Contract, tokenId: string) {
    this.callback("Claiming interest", null, null);
    try {
      await contract.claim(tokenId);
      this.callback(null, "Interest claimed successfully", null);
    } catch (e) {
      console.error("Error claiming interest: ", e);
      this.callback(null, null, "Error claiming interest");
      return;
    }
  }

  async redeemToken(contract: Contract, tokenId: string) {
    this.callback("Redeem Token", null, null);
    try {
      await contract.redeem(tokenId);
      this.callback(null, "Redeemed token successfully", null);
    } catch (e) {
      console.error("Error in token redeem: ", e);
      this.callback(null, null, "Error in token redeem");
      return;
    }
  }

  async harvestToken(
    contractAddress: string,
    maturityDateTimestamp: number,
    tokenId: string,
  ) {
    if (!this.isWalletConnected()) {
      this.callback(null, null, "Wallet not connected");
      return;
    }

    const nftContract = new Contract(
      contractAddress,
      TokTokNftAbi,
      this.provider.getSigner(),
    );
    // check if the token is matured
    this.provider.getBlock("latest").then((block: { timestamp: number }) => {
      if (maturityDateTimestamp / 1000 > block.timestamp) {
        // Token not matured, claim interest
        this.claimInterestForToken(nftContract, tokenId);
      } else {
        // Token matured, redeem
        this.redeemToken(nftContract, tokenId);
      }
    });
  }

  async harvestAll(nfts: NftDetails[]) {
    if (!this.isWalletConnected()) {
      this.callback(null, null, "Wallet not connected");
      return;
    }

    // sort them by contract address
    const sortedNfts = Array.from(nfts);
    sortedNfts.sort((a, b) =>
      a.contractAddress.localeCompare(b.contractAddress),
    );

    // Make two list for the parameter, fist is for the address and the second is for the token id
    const addresses: string[] = [];
    const tokenIds: string[] = [];
    for (const nft of sortedNfts) {
      addresses.push(nft.contractAddress);
      tokenIds.push(nft.tokenId);
    }

    const factoryAbi = [
      "function claimAll(address[] memory, uint256[] memory) public",
    ];

    const factoryContract = new Contract(
      NFT_FACTORY_CONTRACT_ADDRESS,
      factoryAbi,
      this.provider.getSigner(),
    );
    this.callback("Harvesting all", null, null);
    try {
      await factoryContract.claimAll(addresses, tokenIds);
      this.callback(null, "Harvested all successfully", null);
    } catch (e) {
      console.error("Error harvesting all: ", e);
      this.callback(null, null, "Error harvesting all");
      return;
    }
  }

  async getSummary(): Promise<unknown> {
    const response = await Paima.default.getSummary();
    if (!response.success) {
      throw new Error((response as FailedResult).errorMessage);
    }
    return response.data;
  }

  async getRWAData(
    contractAddress: string,
    tokenId: string,
  ): Promise<DeviceDetails> {
    const response = await Paima.default.getRWAData(contractAddress, tokenId);
    if (!response.success) {
      throw new Error((response as FailedResult).errorMessage);
    }
    return response.data;
  }
}

export default MainController;
