import React from "react";
import { ethers } from "ethers";
import type { NftContractDetails } from "@harvest-flow/utils";
import clsx from "clsx";

import DataTile from "./DataTile";
import type { DataTileProps } from "./DataTile";
import { getMonthDifference } from "@src/utils";

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
    <div className="flex flex-col gap-16 desktop:gap-32 pt-20 desktop:pt-44 relative z-10">
      <h2 className="text-center text-heading4 desktop:text-heading2 font-medium uppercase">
        Overview
      </h2>
      <div className="grid grid-cols-1 grid-rows-4 desktop:grid-rows-1 desktop:grid-cols-3 border-b border-black bg-white">
        <div className="row-span-1 desktop:col-span-1 grid grid-cols-2 grid-rows-1 desktop:grid-cols-1 desktop:grid-rows-2 divide-y divide-black">
          <LargeTile title="Scheduled yield (annualized)" value={aprString} />
          <LargeTile
            title="Scheduled operation period"
            value={`${lendingPeriodInMonths} month`}
          />
        </div>
        <div className="row-span-3 desktop:col-span-2 grid grid-cols-3 grid-rows-3">
          <SmallTile
            title="Amount of subscription"
            value={`${totalLendingAmount} dai`}
          />
          <SmallTile title="Investment unit price" value={`${unitPrice} dai`} />
          <SmallTile
            title="Remaining number of units"
            value={`${remainingUnits} units`}
          />
          <SmallTile title="Security" value="Secured" />
          <SmallTile title="category" value="Vehicle leasing" />
          <SmallTile title="Area" value="Cambodia" />
          <SmallTile
            title="Principal repayment method"
            value="lump-sum payment upon maturity"
          />
          <SmallTile title="Frequency of loan fee payments" value="Monthly" />
          <SmallTile
            title="Total number of payments"
            value={`${lendingPeriodInMonths} times`}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectOverviewSection;
