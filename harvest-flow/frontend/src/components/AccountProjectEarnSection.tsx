import React, { useContext } from "react";

import type { DataTileProps } from "./DataTile";
import DataTile from "./DataTile";
import type { NftDetails } from "@harvest-flow/utils";
import {
  getClaimablePrincipleForNft,
  getClaimableYieldForNft,
  getEquityForNft,
  getLendingAmountForNft,
  getTotalYieldForNft,
} from "@src/utils";
import { NUMBER_OF_DECIMAL_PLACES } from "@src/utils/constants";
import { ethers } from "ethers";
import type MainController from "@src/MainController";
import { AppContext } from "@src/main";

const ExtraSmallTile: React.FC<DataTileProps> = ({ title, value }) => {
  return (
    <DataTile
      wrapperClassName="border-t border-l border-black w-full"
      title={title}
      value={value}
      size="xs"
    />
  );
};

const LargeTile: React.FC<DataTileProps> = ({ title, value }) => {
  return (
    <DataTile
      wrapperClassName="w-[44%]"
      title={title}
      value={value}
      size="large"
    />
  );
};

const AccountProjectEarnSection: React.FC<{ tokenDetails: NftDetails }> = ({
  tokenDetails,
}) => {
  const mainController: MainController = useContext(AppContext);
  const harvest = () => {
    mainController.harvestToken(
      tokenDetails.contractAddress,
      tokenDetails.lendingData.lendingEnd,
      tokenDetails.tokenId,
    );
  };

  return (
    <div className="flex flex-col gap-[58px]">
      <h2 className="text-bodyLarge desktop:text-heading4_30_30 text-center uppercase font-medium tracking-[0.35rem]">
        Harvest
      </h2>
      <div className="flex gap-[17px]">
        <div className="flex border-b border-black border-r bg-white flex-1">
          <LargeTile
            title="TOTAL EQUITY in USD"
            value={`$${getEquityForNft(tokenDetails).toFixed(NUMBER_OF_DECIMAL_PLACES)}`}
          />
          <div className="w-[66%] flex flex-col">
            <div className="grid grid-cols-2 grid-rows-1 flex-1">
              <ExtraSmallTile
                title="LENDING"
                value={`${getLendingAmountForNft(tokenDetails).toFixed(NUMBER_OF_DECIMAL_PLACES)} DAI`}
              />
              <ExtraSmallTile
                title="Total Yield"
                value={`${getTotalYieldForNft(tokenDetails)} DAI`}
              />
            </div>
            <div className="flex w-full h-[100px]">
              <ExtraSmallTile
                title="AVERAGE APR"
                value={`${Number(ethers.utils.formatEther(tokenDetails.lendingData.yield)) * 100} %`}
              />
            </div>
          </div>
        </div>
        <div className="w-[265px] border-l border-black border-t border-r border-b flex flex-col bg-white">
          <div className="flex flex-col items-center justify-center px-6 py-4 gap-6 flex-1">
            <p className="uppercase text-center font-normal">
              Claimable Yield:
              <br />{" "}
              <span className="font-medium">
                {getClaimableYieldForNft(tokenDetails).toFixed(
                  NUMBER_OF_DECIMAL_PLACES,
                )}{" "}
                DAI
              </span>
            </p>
            <p className="uppercase text-center font-normal">
              Claimable Principle:
              <br />{" "}
              <span className="font-medium">
                {getClaimablePrincipleForNft(tokenDetails).toFixed(
                  NUMBER_OF_DECIMAL_PLACES,
                )}{" "}
                DAI
              </span>
            </p>
          </div>
          <button
            className="p-[37px] bg-primary flex items-center justify-center flex-1 shrink-0 border-t border-black text-heading5SmallerLH26 font-medium uppercase tracking-[0.35rem] h-[100px]"
            onClick={harvest}
          >
            Harvest
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountProjectEarnSection;
