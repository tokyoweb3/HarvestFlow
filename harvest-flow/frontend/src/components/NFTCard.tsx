import React from "react";

export type NFTCardProps = {
  position: number;
  asset: number;
  imageURL: string;
  investment: number;
  earned: number;
  termStart: string;
  termEnd: string;
  apr: number;
};

const NFTCard: React.FC<NFTCardProps> = ({
  position,
  asset,
  imageURL,
  investment,
  earned,
  termStart,
  termEnd,
  apr,
}) => {
  return (
    <div className="p-4 w-full flex flex-col gap-2 border border-black bg-tertiary">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="uppercase">NO. {position}</p>
          <p className="uppercase">ASSET: {asset}</p>
        </div>
        <div
          className="w-full h-[300px] bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: `url(${imageURL})` }}
        />
      </div>
      <div className="flex flex-col divide-y divide-black divide-dashed">
        <p className="uppercase text-center py-2">
          Investment: <span className="font-medium">{investment} DAI</span>
        </p>
        <p className="uppercase text-center py-2">
          Earned: <span className="font-medium">{earned} DAI</span>
        </p>
        <p className="uppercase text-center py-2">
          Term:{" "}
          <span className="font-medium">
            {termStart} ~ {termEnd}
          </span>
        </p>
        <p className="uppercase text-center py-2">
          APR: <span className="font-medium">{apr}%</span>
        </p>
      </div>
    </div>
  );
};
import React from 'react';
import { NUMBER_OF_DECIMAL_PLACES } from "@src/utils/constants";
import { useNavigate } from "react-router-dom";

export interface NFTCardProps {
  contractAddress: string;
  tokenId: string;
  principal: number;
  yieldClaimed: number;
  lendingStart: Date;
  lendingEnd: Date;
  yieldRate: number;
}

const NFTCard: React.FC<NFTCardProps> = ({ contractAddress, tokenId, principal, yieldClaimed, lendingStart, lendingEnd, yieldRate }) => {

  const navigate = useNavigate();
  const formatTerm = (lendingStart : Date, lendingEnd : Date) => {
    const lendingStartYear = lendingStart.getFullYear();
    const lendingStartMonth = lendingStart.getMonth() + 1;
    const lendingEndYear = lendingEnd.getFullYear();
    const lendingEndMonth = lendingEnd.getMonth() + 1;

   return `${lendingStartYear.toString().substring(2)}.${lendingStartMonth} ~ ${lendingEndYear}.${lendingEndMonth}`;
  };

  return (
    <div className="max-w-sm mx-auto p-4">
      <div className="px-4 py-5 sm:px-6">
          <img
            src="https://via.placeholder.com/150"
            alt="Investment Image"
            className="w-full h-64 object-cover"
            onClick={() => navigate(`/nft?address=${contractAddress}&tokenId=${tokenId}`)}
          />
      </div>
      <div className="bg-gray-300 p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">No. {tokenId}</span>
        </div>
        <div className="mt-2 text-lg font-semibold text-gray-900">
          Principal: {principal.toFixed(NUMBER_OF_DECIMAL_PLACES)} DAI
        </div>
        <div className="mt-2 text-lg font-semibold text-gray-900">
          Yield Claimed: {yieldClaimed.toFixed(NUMBER_OF_DECIMAL_PLACES)} DAI
        </div>
        <div className="mt-2 text-lg font-semibold text-gray-900">
          Term: {formatTerm(lendingStart, lendingEnd)}
        </div>
        <div className="mt-2 text-lg font-semibold text-gray-900">
          Yield Rate: {yieldRate.toFixed(NUMBER_OF_DECIMAL_PLACES)}%
        </div>
      </div>
    </div>
  );
}

export default NFTCard;
