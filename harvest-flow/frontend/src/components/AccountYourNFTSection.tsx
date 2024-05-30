import React, { useState } from "react";

import type { NFTCardProps } from "./NFTCard";
import NFTCard from "./NFTCard";
import ArrowDownIcon from "@src/icons/ArrowDownIcon";
import type { NFTItemCardProps } from "./NFTItemCard";
import NFTItemCard from "./NFTItemCard";
import type { NFTProjectCardProps } from "./NFTProjectCard";
import NFTProjectCard, { NFTProjectComingSoonCard } from "./NFTProjectCard";

import tukTukImage from "../../assets/images/tuktuk.jpg";
import { NftDetails } from "@harvest-flow/utils";
import { groupBy } from "@src/utils";
import { ethers } from "ethers";


const nftItemData: NFTItemCardProps[] = [
  {
    imageURL: tukTukImage,
    title: "Blast Testnet Special NFT",
    text: "Boost APY +0.5%",
    caption: "Coming in Vol.2 2024 Fall",
  },
  {
    imageURL: tukTukImage,
    title: "Blast Testnet Special NFT",
    text: "Boost APY +0.5%",
    caption: "Coming in Vol.2 2024 Fall",
  },
];

const nftProjectsData: NFTProjectCardProps[] = [
  {
    imageURL: tukTukImage,
    title: "Dec. 24th 2025",
    text: "Release on",
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
      <div className="flex items-center gap-2"
           onClick={toggleCollapse}>
        <h3 className="text-heading4 uppercase font-medium">
          {projectName}
        </h3>
        {/* TODO add arrowup icon */}
        {isCollapsed ? (<ArrowDownIcon />) : (<ArrowDownIcon />)}
      </div>
      {!isCollapsed && (
        <div className="grid grid-cols-3 gap-10">
        {nfts.map((data) => (
          <NFTCard
            key={data.contractAddress.concat(data.tokenId.toString())}
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
        ))}
        </div>
       )}
    </div>
  );
}

const AccountYourNFTSection: React.FC<{ ownedNfts: NftDetails[] }> = ({ ownedNfts }) => {
  const groupedNfts = groupBy(ownedNfts, nft => nft.contractAddress);

  return (
    <div className="flex flex-col gap-14">
      <h2 className="text-center text-heading3 font-medium uppercase">
        Your NFT
      </h2>
      <div className="w-full">
        <div className="flex flex-col gap-20">
          {
            Object.keys(groupedNfts).map((contractAddress, index) => (
              <NFTList key={index}
                       projectName={groupedNfts[contractAddress][0].projectName}
                       nfts={groupedNfts[contractAddress].map(nft => ({
                         contractAddress: nft.contractAddress,
                         tokenId: nft.tokenId,
                         asset: 1, // TODO: What is this?
                         imageURL: tukTukImage, // TODO: change this to the actual image
                         investment: Number(ethers.utils.formatEther(nft.lendingData.principle)),
                         earned: Number(ethers.utils.formatEther(nft.lendingData.claimedYield)),
                         termStart: new Date(nft.lendingData.lendingStart),
                         termEnd: new Date(nft.lendingData.lendingEnd),
                         apr: Number(ethers.utils.formatEther(nft.lendingData.yield))*100,
                       }))}
              />
            ))
          }

          <div className="flex flex-col gap-10">
            <h3 className="text-heading4 uppercase font-medium">Items</h3>
            <div className="grid grid-cols-3 gap-10">
              {nftItemData.map((data, index) => (
                <NFTItemCard
                  key={index}
                  imageURL={data.imageURL}
                  text={data.text}
                  caption={data.caption}
                  title={data.title}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-10">
            <h3 className="text-heading4 uppercase font-medium">
              Upcoming projects
            </h3>
            <div className="grid grid-cols-3 gap-10">
              {nftProjectsData.map((data, index) => (
                <NFTProjectCard
                  key={index}
                  imageURL={data.imageURL}
                  text={data.text}
                  title={data.title}
                />
              ))}
              <NFTProjectComingSoonCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountYourNFTSection;
