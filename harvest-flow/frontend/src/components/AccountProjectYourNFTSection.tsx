import React from "react";

import type { DataTileProps } from "./DataTile";
import DataTile from "./DataTile";

import tukTukImage from "../../assets/images/account-owner-project-image.jpg";
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

const formatTerm = (lendingStart: Date, lendingEnd: Date) => {
  const lendingStartYear = lendingStart.getFullYear();
  const lendingStartMonth = lendingStart.getMonth() + 1;
  const lendingEndYear = lendingEnd.getFullYear();
  const lendingEndMonth = lendingEnd.getMonth() + 1;

  return `${lendingStartYear.toString()}.${lendingStartMonth} ~ ${lendingEndYear}.${lendingEndMonth}`;
};

const AccountProjectYourNFTSection: React.FC<{ tokenDetails: NftDetails }> = ({
  tokenDetails,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-[60px]">
      <div className="flex flex-col gap-[30px]">
        <h2 className="text-bodyLarge desktop:text-heading4_30_30 text-center uppercase font-medium tracking-[0.35rem]">
          Proof of support
        </h2>
        <h3 className="text-center text-heading5SmallerLH28 font-medium uppercase">
          {tokenDetails.projectName}
        </h3>
      </div>
      <div className="w-full border-b border-black border-l border-r flex bg-white">
        <div
          className="w-[320px] bg-center bg-cover bg-no-repeat border-t border-black aspect-square"
          style={{ backgroundImage: `url(${tukTukImage})` }}
        ></div>
        <div className="flex-1 flex flex-col">
          <ExtraSmallTile
            title="Features"
            customComponent={
              <div className="py-[30px] px-[65px]">
                <p className="text-bodySmaller">
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
            <ExtraSmallTile
              title="Term"
              value={formatTerm(
                new Date(tokenDetails.lendingData.lendingStart),
                new Date(tokenDetails.lendingData.lendingEnd),
              )}
            />
            <ExtraSmallTile
              title="Lending"
              value={`${getLendingAmountForNft(tokenDetails).toFixed(NUMBER_OF_DECIMAL_PLACES)} DAI`}
            />
            <ExtraSmallTile
              title="APR"
              value={`${Number(ethers.utils.formatEther(tokenDetails.lendingData.yield)) * 100} %`}
            />
          </div>
          <button
            className="bg-secondary text-white flex items-center justify-center border-t border-l border-black text-heading5Smaller uppercase tracking-widest p-[44px]"
            onClick={() =>
              navigate(
                `${Page.Project}?address=${tokenDetails.contractAddress}`,
              )
            }
          >
            Go to project page
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountProjectYourNFTSection;
