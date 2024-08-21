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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-[60px]">
      <div className="flex flex-col gap-[20px] desktop:gap-[30px]">
        <h2 className="text-heading5Larger desktop:text-heading4_30_30 text-center uppercase font-medium tracking-[0.35rem]">
          Proof of support
        </h2>
        <h3 className="text-center text-bodyLarge24 desktop:text-heading5SmallerLH28 font-medium uppercase">
          {tokenDetails.projectName}
        </h3>
      </div>
      <img
        src={tukTukImage}
        alt=""
        className="mx-auto desktop:hidden max-w-[253px]"
      />
      <div className="w-full flex">
        <div
          className="w-[320px] bg-center bg-cover bg-no-repeat border-t border-black aspect-square hidden desktop:block"
          style={{ backgroundImage: `url(${tukTukImage})` }}
        ></div>
        <div className="flex-1 flex flex-col">
          <ExtraSmallTile
            title={t("owner.description")}
            customComponent={
              <div className="py-[21px] px-[15px] desktop:py-[30px] desktop:px-[65px]">
                <p className="text-caption_12_22 desktop:text-bodySmaller">
                  {t("owner.description.text")}
                </p>
              </div>
            }
          />
          <div className="grid grid-cols-2 grid-rows-2 desktop:grid-cols-4 desktop:grid-rows-1">
            <ExtraSmallTile title={t("owner.asset")} value="1" />
            <ExtraSmallTile
              title={t("owner.term")}
              value={formatTerm(
                new Date(tokenDetails.lendingData.lendingStart),
                new Date(tokenDetails.lendingData.lendingEnd),
              )}
            />
            <ExtraSmallTile
              title={t("owner.lending")}
              value={`${getLendingAmountForNft(tokenDetails).toFixed(NUMBER_OF_DECIMAL_PLACES)} DAI`}
            />
            <ExtraSmallTile
              title={t("owner.apr")}
              value={`${Number(ethers.utils.formatEther(tokenDetails.lendingData.yield)) * 100} %`}
            />
          </div>
          <button
            className="bg-secondary text-white flex items-center justify-center border-t border-l border-black text-bodyLarge desktop:text-heading5Smaller uppercase tracking-widest p-[38px] desktop:p-[44px]"
            onClick={() =>
              navigate(
                `${Page.Project}?address=${tokenDetails.contractAddress}`,
              )
            }
          >
            {t("owner.go_to_project_page")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountProjectYourNFTSection;
