import * as Paima from "./paima/middleware.js";
import {FailedResult, LoginInfo} from "@paima/sdk/mw-core";
import {NftContract, NftContractDetails, NftHistory, UserDetails} from "@harvest-flow/utils";
import {Web3Provider} from "@ethersproject/providers";
import {Contract, ethers} from "ethers";
import TokTokNftAbi from "./abi/TokTokNft";
import { WalletMode } from '@paima/providers';

// The MainController is a React component that will be used to control the state of the application
// It will be used to check if the user has metamask installed and if they are connected to the correct network
// Other settings also will be controlled here

// create string enum called AppState
export enum Page {
  Account = "/account",
  Project = "/project",
}
const TOKTOK_NFT_CONTRACT_ADDRESS: string = process.env.TOKTOK_NFT_CONTRACT_ADDRESS;
const PAYMENT_TOKEN_CONTRACT_ADDRESS: string = process.env.PAYMENT_TOKEN_CONTRACT_ADDRESS;

// This is a class that will be used to control the state of the application
// the benefit of this is that it is very easy to test its logic unlike a react component
class MainController {
  userAddress: string | null = null;


  private provider?: Web3Provider = undefined;
  private lendingContract? : Contract = undefined;

  callback: (
    loadingMessage: string | null,
    successMessage: string | null,
    errorMessage: string | null
  ) => void = () => {};

  private checkCallback() {
    if (this.callback == null) {
      console.error("Callback is not set");
    }
  }

   async enforceWalletConnected() {
    this.checkCallback();
    if (!this.isWalletConnected() || !this.userAddress) {
      await this.connectWallet({
        mode: WalletMode.EvmInjected,
        preferBatchedMode: false
      })
    }
  }

  isWalletConnected = (): boolean => {
    return this.userAddress !== null;
  };

  getContractAddress = (): string => {
    return TOKTOK_NFT_CONTRACT_ADDRESS;
  }

  async connectWallet(loginInfo : LoginInfo) : Promise<string> {
    const response = await Paima.default.userWalletLogin(loginInfo);
    console.log("connect wallet response: ", response);
    if (response.success === true) {
      this.callback(null, `Wallet connected to address: ${response.result.walletAddress}`, null);
      this.userAddress = response.result.walletAddress;
      this.provider = new Web3Provider(window.ethereum);
      this.lendingContract = new Contract(TOKTOK_NFT_CONTRACT_ADDRESS, TokTokNftAbi, this.provider.getSigner());
      return response.result.walletAddress;
    }
  }

  async buyNft(amountToBuy : number, price: bigint){
    if(!this.isWalletConnected()){
      this.callback(null, null, "Wallet not connected");
      return;
    }

    const amountToPay = amountToBuy * Number(ethers.utils.formatEther(price));
    // get approval for the contract
    this.callback("Approving payment", null, null);
    const paymentTokenContract = new Contract(
        PAYMENT_TOKEN_CONTRACT_ADDRESS,
        ["function approve(address _spender, uint256 _value) public returns (bool success)"],
        this.provider.getSigner()
    );

    let approved = false;

    const amountToApprove = ethers.utils.parseEther(amountToPay.toString());

    try{
      await paymentTokenContract.approve(TOKTOK_NFT_CONTRACT_ADDRESS, amountToApprove);
      approved = true;
    } catch (e) {
      console.error("Error approving payment: ", e);
      this.callback(null, null, "Error approving payment");
      return;
    }

    if(approved) {
      this.callback("Buying NFT", null, null);
      try {
        //TODO: show some info about the NFT
        await this.lendingContract.publicMint(amountToBuy);
        this.callback(null, "NFT bought successfully", null);
      } catch (e) {
        console.error("Error buying NFT: ", e);
        this.callback(null, null, "Error buying NFT");
        return;
      }

    }


  }


  async getAllNft(notEnded : boolean): Promise<NftContract[]> {
    const response = await Paima.default.getAllNfts(
        notEnded
    );
    console.debug("Get All Nft response: ", response);
    if (!response.success) {
      throw new Error((response as FailedResult).errorMessage);
    }
    return response.contracts;
  }

  async getDetailedNftContract(contractAddress: string): Promise<NftContractDetails> {
    const response = await Paima.default.getDetailedNftContract(contractAddress);
    console.debug("Get Nft Detail response: ", response);
    if (!response.success) {
      console.error("Error getting NFT details: ", response);
      return null;
    }
    return response.contract;
  }

  async getNftHistoryForUser(): Promise<NftHistory> {
    const response = await Paima.default.getNftHistoryForUser(this.userAddress!);
    if (!response.success) {
      throw new Error((response as FailedResult).errorMessage);
    }
    return {address: response.address, history: response.history};
  }

  async getProjectHistory(contractAddress : string): Promise<NftHistory> {
    const response = await Paima.default.getHistoryForProject(contractAddress);
    if (!response.success) {
      throw new Error((response as FailedResult).errorMessage);
    }
    return {address: response.address, history: response.history};
  }

  async getUserDetails(): Promise<UserDetails> {

      const response = await Paima.default.getUserDetails(this.userAddress!);
      console.debug("Get User details response: ", response);
      if (!response.success) {
        throw new Error((response as FailedResult).errorMessage);
      }
      return response.data;
  }

  async claimInterest(contractAddress: string, tokenIds: number[]) {
    if(!this.isWalletConnected()){
      this.callback(null, null, "Wallet not connected");
      return;
    }

    if(tokenIds.length === 0){
        this.callback(null, null, "No token to claim interest");
        return;
    }

    this.callback("Claiming interest", null, null);
    try {
      // TODO: change to claim all
      await this.lendingContract.claim(tokenIds[0], {
        gasLimit: 100000,
      });
      this.callback(null, "Interest claimed successfully", null);
    } catch (e) {
      console.error("Error claiming interest: ", e);
      this.callback(null, null, "Error claiming interest");
      return;
    }
  }

}

export default MainController;
