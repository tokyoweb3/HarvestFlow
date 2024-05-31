import React from "react";

import DataTile from "./DataTile";
import type { DataTileProps } from "./DataTile";
import { NftContractDetails } from "@harvest-flow/utils";
import { getMonthDifference } from "@src/utils";
import { ethers } from "ethers";

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

const ProjectOverviewSection: React.FC<{projectContractDetails: NftContractDetails}> = ({projectContractDetails}) => {

  const aprString = `${(Number(ethers.utils.formatEther(projectContractDetails?.minYield ?? 0))*100)} % `;
  const lendingPeriodInMonths = getMonthDifference(projectContractDetails?.leaseStart, projectContractDetails?.leaseEnd)
  const totalLendingAmount = Number(ethers.utils.formatEther(projectContractDetails?.price ?? 0)) * Number(projectContractDetails?.supplyCap ?? 0)
  const unitPrice = Number(ethers.utils.formatEther(projectContractDetails?.price ?? 0))
  const remainingUnits = Number(projectContractDetails?.supplyCap ?? 0) - Number(projectContractDetails?.mintedAmount ?? 0)


  return (
    <div className="flex flex-col gap-32 pt-44">
      <h2 className="text-center text-heading2 font-medium uppercase">
        Overview
      </h2>
      <div className="flex border-b border-black bg-white">
        <div className="w-1/3 flex flex-col divide-y divide-black">
          <LargeTile title="Scheduled yield (annualized)" value={aprString} />
          <LargeTile title="Scheduled operation period" value={`${lendingPeriodInMonths} month`} />
        </div>
        <div className="w-2/3 grid grid-cols-3 grid-rows-3">
          <SmallTile title="Amount of subscription" value={`${totalLendingAmount} dai`} />
          <SmallTile title="Investment unit price" value={`${unitPrice} dai`} />
          <SmallTile title="Remaining number of units" value={`${remainingUnits} units`} />
          <SmallTile title="Security" value="Secured" />
          <SmallTile title="category" value="Vehicle leasing" />
          <SmallTile title="Area" value="Cambodia" />
          <SmallTile
            title="Principal repayment method"
            value="lump-sum payment upon maturity"
          />
          <SmallTile title="Frequency of loan fee payments" value="Monthly" />
          <SmallTile title="Total number of payments" value={`${lendingPeriodInMonths} times`} />
        </div>
      </div>
    </div>
  );
};

export default ProjectOverviewSection;
