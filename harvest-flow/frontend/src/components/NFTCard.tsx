import React from "react";
import { useNavigate } from "react-router-dom";
import { Page } from "@src/MainController";

import baseLogo from "../../assets/images/base-logo.jpg";

export type NFTCardProps = {
  contractAddress: string;
  tokenId: string;
  asset: number;
  imageURL: string;
  investment: number;
  earned: number;
  termStart: Date;
  termEnd: Date;
  apr: number;
  projectName: string;
};

const NFTCard: React.FC<NFTCardProps> = ({
  contractAddress,
  tokenId,
  asset,
  imageURL,
  investment,
  earned,
  termStart,
  termEnd,
  apr,
  projectName,
}) => {
  const navigate = useNavigate();

  // const formatTerm = (lendingStart: Date, lendingEnd: Date) => {
  //   const lendingStartYear = lendingStart.getFullYear();
  //   const lendingStartMonth = lendingStart.getMonth() + 1;
  //   const lendingEndYear = lendingEnd.getFullYear();
  //   const lendingEndMonth = lendingEnd.getMonth() + 1;

  //   return `${lendingStartYear.toString().substring(2)}.${lendingStartMonth} ~ ${lendingEndYear}.${lendingEndMonth}`;
  // };

  return (
    <div
      className="pt-11.5% px-[17%] w-full flex flex-col gap-2 rounded-[10px]"
      onClick={() => {
        navigate(
          `${Page.AccountProject}?address=${contractAddress}&tokenId=${tokenId}`,
        );
      }}
    >
      <div className="flex flex-col">
        <div className="flex flex-col text-[10px] leading-[1.2em] uppercase">
          <div className="flex items-end justify-between">
            <p>{projectName}</p>
            <p>&nbsp;#{tokenId}</p>
          </div>
          <div className="flex items-end justify-between">
            <p>APR: {apr}%</p>
            <p>
              Lending: <span className="font-medium">{investment} DAI</span>
            </p>
          </div>
          <div className="flex items-between justify-between">
            {/*<img src={baseLogo} alt="Base" className="max-w-[66px] mt-[8px]" />*/}
            <p>
              Harvest: <span className="font-medium">{earned} DAI</span>
            </p>
          </div>
        </div>
        <div
          className="w-full h-[300px] bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: `url(${imageURL})` }}
        />
      </div>
      {/* <div className="flex flex-col divide-y divide-black divide-dashed">
        <p className="uppercase text-center py-2">
          Investment: <span className="font-medium">{investment} DAI</span>
        </p>
        <p className="uppercase text-center py-2">
          Earned: <span className="font-medium">{earned} DAI</span>
        </p>
        <p className="uppercase text-center py-2">
          Term:{" "}
          <span className="font-medium">{formatTerm(termStart, termEnd)}</span>
        </p>
        <p className="uppercase text-center py-2">
          APR: <span className="font-medium">{apr}%</span>
        </p>
      </div> */}
    </div>
  );
};

export default NFTCard;
