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
import { useTranslation } from "react-i18next";

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
      wrapperClassName="desktop:w-[44%]"
      title={title}
      value={value}
      size="large"
    />
  );
};

const AccountProjectEarnSection: React.FC<{ tokenDetails: NftDetails }> = ({
  tokenDetails,
}) => {
  const { t } = useTranslation();

  const mainController: MainController = useContext(AppContext);
  const harvest = () => {
    mainController.harvestToken(
      tokenDetails.contractAddress,
      tokenDetails.lendingData.lendingEnd,
      tokenDetails.tokenId,
    );
  };

  return (
    <div className="flex flex-col gap-[60px] desktop:gap-[58px]">
      <h2 className="text-heading5Larger desktop:text-heading4_30_30 text-center uppercase font-medium tracking-[0.35rem]">
        Harvest
      </h2>
      <div className="flex flex-col desktop:flex-row gap-[30px] desktop:gap-[17px]">
        <div className="flex flex-col desktop:flex-row border-b border-black border-r bg-white flex-1">
          <LargeTile
            title={t("owner.harvest.total_equity")}
            value={`$${getEquityForNft(tokenDetails).toFixed(NUMBER_OF_DECIMAL_PLACES)}`}
          />
          <div className="desktop:w-[66%] flex flex-col">
            <div className="grid grid-cols-2 grid-rows-1 flex-1">
              <ExtraSmallTile
                title={t("owner.harvest.lending")}
                value={`${getLendingAmountForNft(tokenDetails).toFixed(NUMBER_OF_DECIMAL_PLACES)} DAI`}
              />
              <ExtraSmallTile
                title={t("owner.harvest.total_interest_claimed")}
                value={`${getTotalYieldForNft(tokenDetails)} DAI`}
              />
            </div>
            <div className="flex w-full desktop:h-[100px]">
              <ExtraSmallTile
                title={t("owner.harvest.average_apr")}
                value={`${Number(ethers.utils.formatEther(tokenDetails.lendingData.yield)) * 100} %`}
              />
            </div>
          </div>
        </div>
        <div className="desktop:w-[265px] px-4 desktop:px-0">
          <div className="border-l border-black border-t border-r border-b flex flex-col">
            <div className="flex flex-col items-center justify-center py-[21px] px-6 desktop:p-6 gap-[14px] desktop:gap-6 flex-1 bg-white">
              <p className="text-body desktop:text-bodyLarge24 uppercase text-center font-normal">
                {t("owner.harvest.claimable_interest")}
                <span className="desktop:hidden">:</span>
                <br className="hidden desktop:block" />{" "}
                <span className="font-medium">
                  {getClaimableYieldForNft(tokenDetails).toFixed(
                    NUMBER_OF_DECIMAL_PLACES,
                  )}{" "}
                  DAI
                </span>
              </p>
              <p className="text-body desktop:text-bodyLarge24 uppercase text-center font-normal">
                {t("owner.harvest.claimable_principle")}
                <span className="desktop:hidden">:</span>
                <br className="hidden desktop:block" />{" "}
                <span className="font-medium">
                  {getClaimablePrincipleForNft(tokenDetails).toFixed(
                    NUMBER_OF_DECIMAL_PLACES,
                  )}{" "}
                  DAI
                </span>
              </p>
            </div>
            <button
              className="p-[32px] desktop:p-[37px] bg-primary flex items-center justify-center flex-1 shrink-0 border-t border-black text-heading5SmallerLH26 font-medium uppercase tracking-[0.35rem] h-[80px] desktop:h-[100px]"
              onClick={harvest}
            >
              Harvest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountProjectEarnSection;
