import clsx from "clsx";
import React from "react";

type TileHeaderProps = {
  title: string;
};

const TileHeader: React.FC<TileHeaderProps> = ({ title }) => {
  return (
    <div className="px-6 py-4 border-b border-black border-dashed flex items-center justify-center">
      <p className="text-center uppercase">{title}</p>
    </div>
  );
};

type TileValueProps = {
  value: string;
  size?: "small" | "large";
};

const TileValue: React.FC<TileValueProps> = ({ value, size = "small" }) => {
  return (
    <div
      className={clsx(
        "flex items-center justify-center flex-1",
        size === "small" ? "p-14" : "p-20",
      )}
    >
      <p
        className={clsx(
          "text-center uppercase",
          size === "small" ? "text-heading3" : "text-heading1",
        )}
      >
        {value}
      </p>
    </div>
  );
};

const SmallTile: React.FC<TileHeaderProps & TileValueProps> = ({
  title,
  value,
}) => {
  return (
    <div className="border-t border-l border-black flex flex-col">
      <TileHeader title={title} />
      <TileValue value={value} />
    </div>
  );
};

const ProjectOverviewSection: React.FC = () => {
  return (
    <div className="flex flex-col gap-32 pt-44">
      <h2 className="text-center text-heading2 font-medium uppercase">
        Overview
      </h2>
      <div className="flex border-b border-black bg-white">
        <div className="w-1/3 flex flex-col divide-y divide-black border-t border-black">
          <div className="flex-1 flex flex-col">
            <TileHeader title="Scheduled yield (annualized)" />
            <TileValue value="8.00%" size="large" />
          </div>
          <div className="flex-1 flex flex-col">
            <TileHeader title="Scheduled operation period" />
            <TileValue value="36 month" size="large" />
          </div>
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
