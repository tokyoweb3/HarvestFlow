import React, { useState } from "react";

import type { NFTCardProps } from "./NFTCard";
import NFTCard from "./NFTCard";
import ArrowDownIcon from "@src/icons/ArrowDownIcon";
import type { NFTItemCardProps } from "./NFTItemCard";
import NFTItemCard from "./NFTItemCard";

import tukTukImage from "../../assets/images/nft-card-image.jpg";
import itemImage from "../../assets/images/nft-item-image.jpg";
import type { NftDetails } from "@harvest-flow/utils";
import { groupBy } from "@src/utils";
import { ethers } from "ethers/lib";
import { useTranslation } from "react-i18next";

const nftItemData: NFTItemCardProps[] = [
  {
    imageURL: itemImage,
    title: "Blast Testnet Special NFT",
    text: "Boost APY +0.5%",
    caption: "Coming in Vol.2 2024 Fall",
  },
  {
    imageURL: itemImage,
    title: "Blast Testnet Special NFT",
    text: "Boost APY +0.5%",
    caption: "Coming in Vol.2 2024 Fall",
  },
];

interface NFTListProps {
  projectName: string;
  nfts: NFTCardProps[];
}

const NFTList: React.FC<NFTListProps> = ({ projectName, nfts }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center gap-2" onClick={toggleCollapse}>
        <h3 className="text-heading5Larger24_30 uppercase font-medium">
          {projectName}
        </h3>
        {/* TODO add arrowup icon */}
        {isCollapsed ? <ArrowDownIcon /> : <ArrowDownIcon />}
      </div>
      {!isCollapsed && (
        <div className="overflow-x-auto">
          <div className="flex desktop:grid desktop:grid-cols-3 gap-6 desktop:gap-10">
            {nfts.map((data) => (
              <div
                key={data.contractAddress.concat(data.tokenId.toString())}
                className="w-[80vw] max-w-[300px] desktop:w-full desktop:max-w-[initial] shrink-0 hover:cursor-pointer"
              >
                <NFTCard
                  projectName={data.projectName}
                  contractAddress={data.contractAddress}
                  tokenId={data.tokenId}
                  asset={1} // TODO: What is this?
                  imageURL={data.imageURL}
                  investment={data.investment}
                  earned={data.earned}
                  termStart={data.termStart}
                  termEnd={data.termEnd}
                  apr={data.apr}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const AccountYourNFTSection: React.FC<{ ownedNfts: NftDetails[] }> = ({
  ownedNfts,
}) => {
  const { t } = useTranslation();

  const groupedNfts = groupBy(ownedNfts, (nft) => nft.contractAddress);

  return (
    <div className="flex flex-col gap-[60px]">
      <h2 className="text-bodyLarge desktop:text-heading4_30_30 text-center uppercase font-medium tracking-[0.35rem]">
        Proof of support
      </h2>
      <div className="w-full px-4 desktop:px-0">
        <div className="flex flex-col gap-14 desktop:gap-[60px]">
          {Object.keys(groupedNfts).map((contractAddress, index) => (
            <NFTList
              key={index}
              projectName={groupedNfts[contractAddress][0].projectName}
              nfts={groupedNfts[contractAddress].map((nft) => ({
                projectName: groupedNfts[contractAddress][0].projectName,
                contractAddress: nft.contractAddress,
                tokenId: nft.tokenId,
                asset: 1, // TODO: What is this?
                imageURL: tukTukImage, // TODO: change this to the actual image
                investment: Number(
                  ethers.utils.formatEther(nft.lendingData.principle),
                ),
                earned: Number(
                  ethers.utils.formatEther(nft.lendingData.claimedYield),
                ),
                termStart: new Date(nft.lendingData.lendingStart),
                termEnd: new Date(nft.lendingData.lendingEnd),
                apr:
                  Number(ethers.utils.formatEther(nft.lendingData.yield)) * 100,
              }))}
            />
          ))}
          <div className="flex flex-col gap-6 desktop:gap-[40px]">
            <h3 className="text-heading5 desktop:text-heading5Larger24_30 uppercase font-medium">
              {t("account.items")}
            </h3>
            <div className="overflow-x-auto">
              <div className="flex desktop:grid desktop:grid-cols-3 gap-6 desktop:gap-10">
                {nftItemData.map((data, index) => (
                  <div
                    key={index}
                    className="w-[80vw] max-w-[300px] desktop:w-full desktop:max-w-[initial] shrink-0"
                  >
                    <NFTItemCard
                      imageURL={data.imageURL}
                      text={data.text}
                      caption={data.caption}
                      title={data.title}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountYourNFTSection;
