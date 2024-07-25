import React from "react";
import { ethers } from "ethers";
import type { NftContractDetails } from "@harvest-flow/utils";
import clsx from "clsx";

import DataTile from "./DataTile";
import type { DataTileProps } from "./DataTile";
import { getMonthDifference } from "@src/utils";
import { useTranslation } from "react-i18next";

const SmallTile: React.FC<DataTileProps> = ({ title, value }) => {
  return (
    <DataTile
      wrapperClassName="border-t border-l border-black"
      title={title}
      value={value}
      size="small"
    />
  );
};

const LargeTile: React.FC<DataTileProps> = ({ title, value }) => {
  return (
    <DataTile
      wrapperClassName="flex-1"
      title={title}
      value={value}
      size="large"
    />
  );
};

const ProjectOverviewSection: React.FC<{
  projectContractDetails: NftContractDetails;
}> = ({ projectContractDetails }) => {
  const { t } = useTranslation();

  const aprString = `${Number(ethers.utils.formatEther(projectContractDetails?.minYield ?? 0)) * 100} % `;
  const lendingPeriodInMonths = getMonthDifference(
    projectContractDetails?.leaseStart,
    projectContractDetails?.leaseEnd,
  );
  const totalLendingAmount =
    Number(ethers.utils.formatEther(projectContractDetails?.price ?? 0)) *
    Number(projectContractDetails?.supplyCap ?? 0);
  const unitPrice = Number(
    ethers.utils.formatEther(projectContractDetails?.price ?? 0),
  );
  const remainingUnits =
    Number(projectContractDetails?.supplyCap ?? 0) -
    Number(projectContractDetails?.mintedAmount ?? 0);

  return (
    <div className="flex flex-col gap-16 desktop:gap-32 pt-[58px] desktop:pt-[150px] relative z-10">
      <div className="grid grid-cols-1 grid-rows-4 desktop:grid-rows-1 desktop:grid-cols-3 border-b border-black bg-white">
        <div className="row-span-1 desktop:col-span-1 grid grid-cols-2 grid-rows-1 desktop:grid-cols-1 desktop:grid-rows-2 divide-y divide-black">
          <LargeTile title={t("project.table.interest")} value={aprString} />
          <LargeTile
            title={t("project.table.loan_period")}
            value={`${lendingPeriodInMonths} ${t("project.table.month")}`}
          />
        </div>
        <div className="row-span-3 desktop:col-span-2 grid grid-cols-3 grid-rows-3">
          <SmallTile
            title={t("project.table.max_lending")}
            value={`${totalLendingAmount} dai`}
          />
          <SmallTile
            title={t("project.table.amount_per_share")}
            value={`${unitPrice} dai`}
          />
          <SmallTile
            title={t("project.table.total_shares")}
            value={`${remainingUnits}`}
          />
          <SmallTile
            title={t("project.table.collateral")}
            value={t("project.table.vehicle")}
          />
          <SmallTile
            title={t("project.table.category")}
            value={t("project.table.vehicle_leasing")}
          />
          <SmallTile
            title={t("project.table.region")}
            value={t("project.table.cambodia")}
          />
          <SmallTile
            title={t("project.table.repayment")}
            value={t("project.table.bullet_repayment")}
          />
          <SmallTile
            title={t("project.table.repayment_frequency")}
            value={t("project.table.monthly")}
          />
          <SmallTile
            title={t("project.table.total_repayments")}
            value={`${lendingPeriodInMonths} ${t("project.table.times")}`}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectOverviewSection;
