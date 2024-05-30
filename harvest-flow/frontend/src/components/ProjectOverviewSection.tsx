import React from "react";

import DataTile from "./DataTile";
import type { DataTileProps } from "./DataTile";

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

const ProjectOverviewSection: React.FC = () => {
  return (
    <div className="flex flex-col gap-32 pt-44">
      <h2 className="text-center text-heading2 font-medium uppercase">
        Overview
      </h2>
      <div className="flex border-b border-black bg-white">
        <div className="w-1/3 flex flex-col divide-y divide-black">
          <LargeTile title="Scheduled yield (annualized)" value="8.00%" />
          <LargeTile title="Scheduled operation period" value="36 month" />
        </div>
        <div className="w-2/3 grid grid-cols-3 grid-rows-3">
          <SmallTile title="Amount of subscription" value="20,000 dai" />
          <SmallTile title="Investment unit price" value="1,000 dai" />
          <SmallTile title="Remaining number of units" value="20 units" />
          <SmallTile title="Security" value="Secured" />
          <SmallTile title="category" value="Vehicle leasing" />
          <SmallTile title="Area" value="Cambodia" />
          <SmallTile
            title="Principal repayment method"
            value="lump-sum payment upon maturity"
          />
          <SmallTile title="Frequency of loan fee payments" value="Monthly" />
          <SmallTile title="Total number of payments" value="36 times" />
        </div>
      </div>
    </div>
  );
};

export default ProjectOverviewSection;
