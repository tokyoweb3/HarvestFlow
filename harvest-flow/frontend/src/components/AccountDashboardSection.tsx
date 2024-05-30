import React from "react";

import type { DataTileProps } from "./DataTile";
import DataTile from "./DataTile";

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

const AccountDashboardSection: React.FC = () => {
  return (
    <div className="flex flex-col gap-14">
      <h2 className="text-center text-heading3 font-medium uppercase">
        Dashboard
      </h2>
      <div className="">
        <div className="flex">
          <LargeTile title="TOTAL EQUITY in USD" value="$99.99" />
          <div className="w-[20%] grid grid-cols-1 grid-rows-2">
            <ExtraSmallTile title="Your APR" value="8.00%" />
            <ExtraSmallTile title="Lending Now" value="59.99 DAI" />
          </div>
          <div className="w-[20%] grid grid-cols-1 grid-rows-2">
            <ExtraSmallTile title="BOOST" value="+0.5%" />
            <ExtraSmallTile title="Total Yield" value="40.9 DAI" />
          </div>
          <div className="w-[30%] border-l border-black border-t border-r flex flex-col items-center justify-center p-6 gap-6">
            <p className="text-heading4 uppercase text-center font-normal">
              Claimable Yield:
              <br /> <span className="font-medium">123 DAI</span>
            </p>
            <p className="text-heading4 uppercase text-center font-normal">
              Claimable Principle:
              <br /> <span className="font-medium">1234 DAI</span>
            </p>
          </div>
        </div>
        <div className="w-full flex border-b border-black">
          <div className="w-[35%] shrink-0">
            <ExtraSmallTile title="POINT" value="1,234.5 PT" />
          </div>
          <div className="w-[35%] shrink-0">
            <ExtraSmallTile title="RANK" value="15" />
          </div>
          <button className="bg-primary flex items-center justify-center w-[30%] shrink-0 border-t border-r border-l border-black text-heading4 font-medium uppercase tracking-[0.35rem]">
            Harvest
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountDashboardSection;
