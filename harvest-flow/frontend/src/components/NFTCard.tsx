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
