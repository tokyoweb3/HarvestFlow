import MainController from "@src/MainController";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@src/main";
import { useSearchParams } from "react-router-dom";
import NFTEarn from "@src/components/NFTEarn";
import {
  getClaimablePrincipleForNft,
  getClaimableYieldForNft,
  getEquityForNft,
  getLendingAmountForNft,
  getTotalYieldForNft
} from "@src/utils";
import { ethers } from "ethers";
import React from "react";

const OwnedNft : React.FC = () => {
  const mainController: MainController = useContext(AppContext);
  const [searchParams] = useSearchParams();
  const contractAddress = searchParams.get('address') || '';
  const tokenId = searchParams.get('tokenId') || '';

  const [nftDetails, setNftDetails] = useState<any>(null);

  useEffect(() => {
    mainController.getUserDetails().then((details) => {
      details.ownedNfts.forEach((nft) => {
        if (nft.contractAddress === contractAddress && nft.tokenId === tokenId) {
          setNftDetails(nft);
        }
      });
    });
  },[]);


    return (
        <>
          {nftDetails && (<NFTEarn
            contractAddress={nftDetails.contractAddress}
            tokenId={nftDetails.tokenId}
            maturityDateTimestamp={nftDetails.lendingData.lendingEnd}
            totalEquity={getEquityForNft(nftDetails)}
            lendingAmount={getLendingAmountForNft(nftDetails)}
            totalYield={getTotalYieldForNft(nftDetails)}
            claimableYield={getClaimableYieldForNft(nftDetails)}
            claimablePrinciple={getClaimablePrincipleForNft(nftDetails)}
            apr={Number(ethers.utils.formatEther(nftDetails.lendingData.yield))*100}
          />)}
        </>
    );
}

export default OwnedNft;