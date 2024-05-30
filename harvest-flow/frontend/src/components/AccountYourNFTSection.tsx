import React from "react";

import type { NFTCardProps } from "./NFTCard";
import NFTCard from "./NFTCard";
import ArrowDownIcon from "@src/icons/ArrowDownIcon";
import type { NFTItemCardProps } from "./NFTItemCard";
import NFTItemCard from "./NFTItemCard";
import type { NFTProjectCardProps } from "./NFTProjectCard";
import NFTProjectCard, { NFTProjectComingSoonCard } from "./NFTProjectCard";

import tukTukImage from "../../assets/images/tuktuk.jpg";

const nftData: NFTCardProps[] = [
  {
    position: 1,
    asset: 3,
    imageURL: tukTukImage,
    investment: 1000,
    earned: 24,
    termStart: "24.6",
    termEnd: "2027.5",
    apr: 8,
  },
  {
    position: 1,
    asset: 3,
    imageURL: tukTukImage,
    investment: 1000,
    earned: 24,
    termStart: "24.6",
    termEnd: "2027.5",
    apr: 8,
  },
  {
    position: 1,
    asset: 3,
    imageURL: tukTukImage,
    investment: 1000,
    earned: 24,
    termStart: "24.6",
    termEnd: "2027.5",
    apr: 8,
  },
];

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

const AccountYourNFTSection: React.FC = () => {
  return (
    <div className="flex flex-col gap-14">
      <h2 className="text-center text-heading3 font-medium uppercase">
        Your NFT
      </h2>
      <div className="w-full">
        <div className="flex flex-col gap-20">
          <div className="flex flex-col gap-10">
            <div className="flex items-center gap-2">
              <h3 className="text-heading4 uppercase font-medium">
                Cambodia Tuktuk vol.1
              </h3>
              <ArrowDownIcon />
            </div>
            <div className="grid grid-cols-3 gap-10">
              {nftData.map((data) => (
                <NFTCard
                  key={data.position}
                  position={data.position}
                  asset={data.asset}
                  imageURL={data.imageURL}
                  investment={data.investment}
                  earned={data.earned}
                  termStart={data.termStart}
                  termEnd={data.termEnd}
                  apr={data.apr}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-10">
            <div className="flex items-center gap-2">
              <h3 className="text-heading4 uppercase font-medium">
                Cambodia Tuktuk vol.2
              </h3>
              <ArrowDownIcon />
            </div>
            <div className="grid grid-cols-3 gap-10">
              {nftData.map((data) => (
                <NFTCard
                  key={data.position}
                  position={data.position}
                  asset={data.asset}
                  imageURL={data.imageURL}
                  investment={data.investment}
                  earned={data.earned}
                  termStart={data.termStart}
                  termEnd={data.termEnd}
                  apr={data.apr}
                />
              ))}
            </div>
          </div>
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
