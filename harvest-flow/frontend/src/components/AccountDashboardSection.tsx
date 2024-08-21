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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
    <div className="font-functionPro flex flex-col gap-[60px]">
      <h2 className="text-heading5Larger desktop:text-heading4_30_30 text-center uppercase font-medium tracking-[0.35rem]">
        Dashboard
      </h2>
      <div className="flex flex-col desktop:flex-row gap-[30px] desktop:gap-[17px]">
        <div className="bg-white border-r border-black flex-1">
          <div className="flex flex-col desktop:flex-row">
            <LargeTile
              title={t("account.total_equity")}
              value={totalEquityString}
            />
            <div className="w-full desktop:w-[33%] grid grid-cols-2 grid-rows-1 desktop:grid-cols-1 desktop:grid-rows-2">
              <ExtraSmallTile title={t("account.your_apr")} value={aprString} />
              <ExtraSmallTile
                title={t("account.lending_now")}
                value={lendingAmountString}
              />
            </div>
            <div className="w-full desktop:w-[33%] grid grid-cols-2 grid-rows-1 desktop:grid-cols-1 desktop:grid-rows-2">
              <ExtraSmallTile
                title={t("account.boost")}
                value="+0.5%"
                tooltipText="Some tooltip comes here"
              />
              <ExtraSmallTile
                title={t("account.total_interest")}
                value={totalYieldString}
              />
            </div>
          </div>
          <div className="w-full grid grid-cols-2 grid-rows-1 border-b border-black">
            <div className="">
              <ExtraSmallTile
                title={t("account.point")}
                value={userPointsString}
              />
            </div>
            <div className="">
              <ExtraSmallTile
                title={t("account.rank")}
                value={userDetails?.rank?.toString() ?? "-"}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col px-4 desktop:px-0 desktop:max-w-[250px] w-full desktop:w-[240px]">
          <div className="w-full border-l border-black border-t border-r flex flex-col items-center justify-center py-[21px] px-6 desktop:p-6 gap-[14px] desktop:gap-6 flex-1 bg-white">
            <p className="text-body desktop:text-bodyLarge24 uppercase text-center font-normal">
              {t("account.claimable_interest")}
              <span className="desktop:hidden">:</span>
              <br className="hidden desktop:block" />{" "}
              <span className="font-medium">{claimableYieldString}</span>
            </p>
            <p className="text-body desktop:text-bodyLarge24 uppercase text-center font-normal">
              {t("account.claimable_principle")}
              <span className="desktop:hidden">:</span>
              <br className="hidden desktop:block" />{" "}
              <span className="font-medium">{claimablePrincipleString}</span>
            </p>
          </div>
          <button
            className="bg-primary flex items-center justify-center border-t desktop:border-r border-l border-black border-b border-r text-heading5Smaller font-medium uppercase tracking-[0.35rem] col-span-2 desktop:col-span-1 h-[80px] desktop:h-[115px] button-disabled"
            //onClick={() => harvestAll()}
          >
            Harvest
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountDashboardSection;
