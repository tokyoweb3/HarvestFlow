import React, { useState } from "react";
import { NftDetails } from "@harvest-flow/utils";
import { groupBy } from "@src/utils";
import { ethers } from "ethers";
import NFTCardOld, { NFTCardOldProps } from "@src/components/NftCardOld";


interface NFTListProps {
  projectName: string;
  nfts: NFTCardOldProps[];
}

const NFTList: React.FC<NFTListProps> = ({ projectName, nfts }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="p-4">
      <div className="flex items-left cursor-pointer" onClick={toggleCollapse}>
        <h3 className="text-2xl font-bold mb-4">{projectName}</h3>
        <button className="text-xl mr-2">
          {isCollapsed ? '▼' : '▲'}
        </button>
      </div>
      {!isCollapsed && (
        <div className="flex flex-wrap -mx-2">
          {nfts.map((nft, index) => (
            <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4">
              <NFTCardOld
                contractAddress={nft.contractAddress}
                tokenId={nft.tokenId}
                principal={nft.principal}
                yieldClaimed={nft.yieldClaimed}
                lendingStart={nft.lendingStart}
                lendingEnd={nft.lendingEnd}
                yieldRate={nft.yieldRate}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface OwnedNftsProps {
  ownedNfts: NftDetails[];
}

const OwnedNfts: React.FC<OwnedNftsProps> = ( { ownedNfts }) => {
  const groupedNfts = groupBy(ownedNfts, nft => nft.contractAddress);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Your NFT</h1>
      {
        Object.keys(groupedNfts).map((contractAddress, index) => (
          <NFTList key={index}
                   projectName={groupedNfts[contractAddress][0].projectName}
                   nfts={groupedNfts[contractAddress].map(nft => ({
                      contractAddress: nft.contractAddress,
                      tokenId: nft.tokenId,
                      principal: Number(ethers.utils.formatEther(nft.lendingData.principle)),
                      yieldClaimed: Number(ethers.utils.formatEther(nft.lendingData.claimedYield)),
                      lendingStart: new Date(nft.lendingData.lendingStart),
                      lendingEnd: new Date(nft.lendingData.lendingEnd),
                      yieldRate: Number(ethers.utils.formatEther(nft.lendingData.yield))*100,
                   }))}
           />
        ))
      }
    </div>
  );
}

export default OwnedNfts;

