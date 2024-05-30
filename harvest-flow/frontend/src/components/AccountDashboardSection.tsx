import React, { useContext, useEffect } from "react";

import type { DataTileProps } from "./DataTile";
import DataTile from "./DataTile";
import { ethers } from "ethers";
import MainController from "@src/MainController";
import { AppContext } from "@src/main";
import { UserDetails } from "@harvest-flow/utils";
import {
  getClaimablePrincipleForUser,
  getClaimableYieldForUser, getTotalEquity,
  getTotalLendingAmount,
  getTotalYieldForUser
} from "@src/utils";
import { NUMBER_OF_DECIMAL_PLACES } from "@src/utils/constants";

const ExtraSmallTile: React.FC<DataTileProps> = ({ title, value }) => {
  return (
    <DataTile
      wrapperClassName="border-t border-l border-black"
      title={title}
      value={value}
      size="extra-small"
    />
  );
};

const LargeTile: React.FC<DataTileProps> = ({ title, value }) => {
  return (
    <DataTile
      wrapperClassName="w-[30%]"
      title={title}
      value={value}
      size="large"
    />
  );
};

const AccountDashboardSection: React.FC<{userDetails : UserDetails}> = ({userDetails}) => {
  const mainController: MainController = useContext(AppContext);

  const totalEquityString = `$${userDetails ? getTotalEquity(userDetails.ownedNfts).toFixed(NUMBER_OF_DECIMAL_PLACES) : '---'}`
  const aprString = `${userDetails?.ownedNfts.length > 0 ? (Number(ethers.utils.formatEther(userDetails.ownedNfts[0].lendingData.yield))*100) : "--"} % `;
  const lendingAmountString = `${(userDetails ? getTotalLendingAmount(userDetails.ownedNfts) : "----")} DAI`
  const totalYieldString = `${userDetails ? getTotalYieldForUser(userDetails.ownedNfts).toFixed(NUMBER_OF_DECIMAL_PLACES) : "----"} DAI`
  const claimableYieldString = `${userDetails ? getClaimableYieldForUser(userDetails.ownedNfts).toFixed(NUMBER_OF_DECIMAL_PLACES) : "--" } DAI`
  const claimablePrincipleString = `${userDetails ? getClaimablePrincipleForUser(userDetails.ownedNfts) : "----"} DAI`
  const userPointsString = `${userDetails?.points.toFixed(NUMBER_OF_DECIMAL_PLACES) ?? "----"} PT`

  const harvestAll = async () => {
    const nftsToHarvest = userDetails.ownedNfts.filter((nft) => {
      return nft.lendingData.lendingStart < Date.now()
        && nft.lendingData.isRedeemed === false;
    });

    mainController.harvestAll(nftsToHarvest);
  }


  return (
    <div className="flex flex-col gap-14">
      <h2 className="text-center text-heading3 font-medium uppercase">
        Dashboard
      </h2>
      <div className="">
        <div className="flex">
          <LargeTile title="TOTAL EQUITY in USD" value={totalEquityString} />
          <div className="w-[20%] grid grid-cols-1 grid-rows-2">
            <ExtraSmallTile title="Your APR"
                            value={aprString} />
            <ExtraSmallTile title="Lending Now" value={lendingAmountString} />
          </div>
          <div className="w-[20%] grid grid-cols-1 grid-rows-2">
            <ExtraSmallTile title="BOOST" value="+0.5%" />
            <ExtraSmallTile title="Total Yield" value={totalYieldString} />
          </div>
          <div className="w-[30%] border-l border-black border-t border-r flex flex-col items-center justify-center p-6 gap-6">
            <p className="text-heading4 uppercase text-center font-normal">
              Claimable Yield:
              <br /> <span className="font-medium">{claimableYieldString}</span>
            </p>
            <p className="text-heading4 uppercase text-center font-normal">
              Claimable Principle:
              <br /> <span className="font-medium">{claimablePrincipleString}</span>
            </p>
          </div>
        </div>
        <div className="w-full flex border-b border-black">
          <div className="w-[35%] shrink-0">
            <ExtraSmallTile title="POINT" value={userPointsString} />
          </div>
          <div className="w-[35%] shrink-0">
            <ExtraSmallTile title="RANK" value={userDetails?.rank?.toString() ?? "-"} />
          </div>
          <button className="bg-primary flex items-center justify-center w-[30%] shrink-0 border-t border-r border-l border-black text-heading4 font-medium uppercase tracking-[0.35rem]"
                  onClick = {() => harvestAll()}
          >
            Harvest
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountDashboardSection;
