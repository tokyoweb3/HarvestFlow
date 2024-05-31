import React from "react";

import type { DataTileProps } from "./DataTile";
import DataTile from "./DataTile";

import tukTukImage from "../../assets/images/tuktuk.jpg";
import type { NftDetails } from "@harvest-flow/utils";
import { ethers } from "ethers";
import { getLendingAmountForNft } from "@src/utils";
import { NUMBER_OF_DECIMAL_PLACES } from "@src/utils/constants";
import { useNavigate } from "react-router-dom";
import { Page } from "@src/MainController";

const ExtraSmallTile: React.FC<DataTileProps> = ({
  title,
  value,
  customComponent,
}) => {
  return (
    <DataTile
      wrapperClassName="border-t border-l border-black w-full"
      title={title}
      value={value}
      customComponent={customComponent}
      size="xxs"
    />
  );
};

const formatTerm = (lendingStart : Date, lendingEnd : Date) => {
  const lendingStartYear = lendingStart.getFullYear();
  const lendingStartMonth = lendingStart.getMonth() + 1;
  const lendingEndYear = lendingEnd.getFullYear();
  const lendingEndMonth = lendingEnd.getMonth() + 1;

  return `${lendingStartYear.toString()}.${lendingStartMonth} ~ ${lendingEndYear}.${lendingEndMonth}`;
};

const AccountProjectYourNFTSection: React.FC<{tokenDetails : NftDetails}> = ({tokenDetails}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-14">
      <div className="flex flex-col gap-6">
        <h2 className="text-center text-heading3 font-medium uppercase">
          Your NFT
        </h2>
        <h3 className="text-center text-heading4 font-medium">
          ${tokenDetails.projectName} NO.${tokenDetails.tokenId}
        </h3>
      </div>
      <div className="w-full border-b border-black border-l border-r flex">
        <div
          className="w-[40%] bg-center bg-cover bg-no-repeat border-t border-black aspect-square"
          style={{ backgroundImage: `url(${tukTukImage})` }}
        ></div>
        <div className="w-[60%] grid grid-cols-1 grid-rows-3">
          <ExtraSmallTile
            title="Features"
            customComponent={
              <div className="p-6">
                <p>
                  Amet enim velit eiusmod labore adipisicing ut duis culpa
                  cupidatat. Aute adipisicing mollit sint do laboris culpa nulla
                  ut. Non anim incididunt incididunt ipsum officia et tempor
                  culpa labore eiusmod laboris ea id minim.
                </p>
              </div>
            }
          />
          <div className="grid grid-cols-4 grid-rows-1">
            <ExtraSmallTile title="Asset" value="1" />
            <ExtraSmallTile title="Term" value={formatTerm(new Date(tokenDetails.lendingData.lendingStart), new Date(tokenDetails.lendingData.lendingEnd))} />
            <ExtraSmallTile title="Lending" value={`${getLendingAmountForNft(tokenDetails).toFixed(NUMBER_OF_DECIMAL_PLACES)} DAI`} />
            <ExtraSmallTile title="APR" value={`${Number(ethers.utils.formatEther(tokenDetails.lendingData.yield))*100} %`} />
          </div>
          <button className="bg-primary flex items-center justify-center border-t border-l border-black text-heading4 uppercase tracking-widest"
            onClick={() => navigate(`${Page.Project}?address=${tokenDetails.contractAddress}`)}
          >
            Go to project page
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountProjectYourNFTSection;
