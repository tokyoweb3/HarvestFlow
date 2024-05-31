import React, { useContext, useEffect, useState } from "react";
import Layout from "@src/layouts/Layout";
import AccountNavigation from "@src/components/AccountNavigation";
import AccountUpdatesSection from "@src/components/AccountUpdatesSection";
import AccountProjectYourNFTSection from "@src/components/AccountProjectYourNFTSection";
import AccountProjectEarnSection from "@src/components/AccountProjectEarnSection";
import AccountProjectRWASection from "@src/components/AccountProjectRWASection";
import AccountProjectAssetOverviewSection from "@src/components/AccountProjectAssetOverviewSection";
import type MainController from "@src/MainController";
import { Page } from "@src/MainController";
import { AppContext } from "@src/main";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { NftDetails } from "@harvest-flow/utils";

const AccountProject: React.FC = () => {
  const mainController: MainController = useContext(AppContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const contractAddress = searchParams.get('address') || '';
  const tokenId = searchParams.get('tokenId') || '';

  const [nftDetails, setNftDetails] = useState<NftDetails>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    mainController.getUserDetails().then((details) => {
      details.ownedNfts.forEach((nft) => {
        if (nft.contractAddress === contractAddress && nft.tokenId === tokenId) {
          setNftDetails(nft);
          setIsLoading(false);
        }
      });
    });
  },[contractAddress, tokenId]);

  return (
    <Layout>
      <div className="w-full max-w-[1320px] mx-auto">
        <div className="flex gap-32 pt-32 pb-56">
          <div className="flex-1 shrink-0 relative">
            <div className="sticky top-20">
              <AccountNavigation />
            </div>
          </div>
          { !isLoading && (<div className="w-full max-w-[1008px] flex flex-col gap-24">
            <AccountProjectYourNFTSection tokenDetails={nftDetails} />
            <AccountProjectAssetOverviewSection />
            <AccountProjectEarnSection tokenDetails={nftDetails}/>
            <AccountProjectRWASection />
            <AccountUpdatesSection />
            <button className="bg-primary flex items-center justify-center border border-black text-heading5 font-medium uppercase tracking-widest p-10"
               onClick={() => {navigate(`${Page.Project}?address=${nftDetails.contractAddress}`)}}
            >
              Go to project page
            </button>
          </div>)}
        </div>
      </div>
    </Layout>
  );
};

export default AccountProject;
