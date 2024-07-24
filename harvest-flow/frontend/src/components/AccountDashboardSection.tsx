import React, { useContext } from "react";

import type { DataTileProps } from "./DataTile";
import DataTile from "./DataTile";
import type MainController from "@src/MainController";
import { AppContext } from "@src/main";
import type { UserDetails } from "@harvest-flow/utils";
import {
  getClaimablePrincipleForUser,
  getClaimableYieldForUser,
  getTotalEquity,
  getTotalLendingAmount,
  getTotalYieldForUser,
} from "@src/utils";
import { NUMBER_OF_DECIMAL_PLACES } from "@src/utils/constants";
import { ethers } from "ethers/lib";

const ExtraSmallTile: React.FC<DataTileProps> = ({
  title,
  value,
  tooltipText,
}) => {
  return (
    <DataTile
      wrapperClassName="border-t border-l border-black"
      title={title}
      value={value}
      tooltipText={tooltipText}
      size="xs"
    />
  );
};

const LargeTile: React.FC<DataTileProps> = ({ title, value }) => {
  return (
    <DataTile
      wrapperClassName="w-full desktop:w-[44%]"
      title={title}
      value={value}
      size="large"
    />
  );
};

const AccountDashboardSection: React.FC<{ userDetails: UserDetails }> = ({
  userDetails,
}) => {
  const mainController: MainController = useContext(AppContext);

  const totalEquityString = `$${userDetails ? getTotalEquity(userDetails.ownedNfts).toFixed(NUMBER_OF_DECIMAL_PLACES) : "---"}`;
  const aprString = `${userDetails?.ownedNfts.length > 0 ? Number(ethers.utils.formatEther(userDetails.ownedNfts[0].lendingData.yield)) * 100 : "--"} % `;
  const lendingAmountString = `${userDetails ? getTotalLendingAmount(userDetails.ownedNfts) : "----"} DAI`;
  const totalYieldString = `${userDetails ? getTotalYieldForUser(userDetails.ownedNfts).toFixed(NUMBER_OF_DECIMAL_PLACES) : "----"} DAI`;
  const claimableYieldString = `${userDetails ? getClaimableYieldForUser(userDetails.ownedNfts).toFixed(NUMBER_OF_DECIMAL_PLACES) : "--"} DAI`;
  const claimablePrincipleString = `${userDetails ? getClaimablePrincipleForUser(userDetails.ownedNfts) : "----"} DAI`;
  const userPointsString = `${userDetails?.points.toFixed(NUMBER_OF_DECIMAL_PLACES) ?? "----"} PT`;

  const harvestAll = async () => {
    const nftsToHarvest = userDetails.ownedNfts.filter((nft) => {
      return (
        nft.lendingData.lendingStart < Date.now() &&
        nft.lendingData.isRedeemed === false
      );
    });

    mainController.harvestAll(nftsToHarvest);
  };

  return (
    <div className="flex flex-col gap-[60px]">
      <h2 className="text-bodyLarge desktop:text-heading4_30_30 text-center uppercase font-medium tracking-[0.35rem]">
        Dashboard
      </h2>
      <div className="flex gap-[17px]">
        <div className="bg-white border-r border-black flex-1">
          <div className="flex flex-col desktop:flex-row">
            <LargeTile title="TOTAL EQUITY in USD" value={totalEquityString} />
            <div className="w-full desktop:w-[33%] grid grid-cols-2 grid-rows-1 desktop:grid-cols-1 desktop:grid-rows-2">
              <ExtraSmallTile title="Your APR" value={aprString} />
              <ExtraSmallTile title="Lending Now" value={lendingAmountString} />
            </div>
            <div className="w-full desktop:w-[33%] grid grid-cols-2 grid-rows-1 desktop:grid-cols-1 desktop:grid-rows-2">
              <ExtraSmallTile
                title="BOOST"
                value="+0.5%"
                tooltipText="Some tooltip comes here"
              />
              <ExtraSmallTile title="Total Yield" value={totalYieldString} />
            </div>
          </div>
          <div className="w-full grid grid-cols-2 grid-rows-2 desktop:grid-rows-1 border-b border-black">
            <div className="">
              <ExtraSmallTile title="POINT" value={userPointsString} />
            </div>
            <div className="">
              <ExtraSmallTile
                title="RANK"
                value={userDetails?.rank?.toString() ?? "-"}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col max-w-[250px] bg-white border-b border-black">
          <div className="w-full border-l border-black border-t border-r flex flex-col items-center justify-center p-6 gap-6 flex-1">
            <p className="text-body desktop:text-bodyLarge24 uppercase text-center font-normal">
              Claimable Yield:
              <br /> <span className="font-medium">{claimableYieldString}</span>
            </p>
            <p className="text-body desktop:text-bodyLarge24 uppercase text-center font-normal">
              Claimable Principle:
              <br />{" "}
              <span className="font-medium">{claimablePrincipleString}</span>
            </p>
          </div>
          <button
            className="bg-primary flex items-center justify-center border-t desktop:border-r border-l border-black text-heading5Smaller font-medium uppercase tracking-[0.35rem] col-span-2 desktop:col-span-1 h-[115px]"
            onClick={() => harvestAll()}
          >
            Harvest
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountDashboardSection;
