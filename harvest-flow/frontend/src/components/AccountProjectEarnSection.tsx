import React from "react";

import type { DataTileProps } from "./DataTile";
import DataTile from "./DataTile";

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
      wrapperClassName="w-[30%]"
      title={title}
      value={value}
      size="large"
    />
  );
};

const AccountProjectEarnSection: React.FC = () => {
  return (
    <div className="flex flex-col gap-14">
      <h2 className="text-center text-heading3 font-medium uppercase">Earn</h2>
      <div className="">
        <div className="flex border-b border-black">
          <LargeTile title="TOTAL EQUITY in USD" value="$99.99" />
          <div className="w-[40%]">
            <div className="grid grid-cols-2 grid-rows-1">
              <ExtraSmallTile title="LENDING" value="59.99 DAI" />
              <ExtraSmallTile title="Total Yield" value="40.9 DAI" />
            </div>
            <div className="flex w-full">
              <ExtraSmallTile title="AVERAGE APR" value="9.99 %" />
            </div>
          </div>
          <div className="w-[30%] border-l border-black border-t border-r grid grid-cols-1 grid-rows-2">
            <div className="flex flex-col items-center justify-center px-6 py-4 gap-6 flex-1">
              <p className="uppercase text-center font-normal">
                Claimable Yield:
                <br /> <span className="font-medium">123 DAI</span>
              </p>
              <p className="uppercase text-center font-normal">
                Claimable Principle:
                <br /> <span className="font-medium">1234 DAI</span>
              </p>
            </div>
            <button className="bg-primary flex items-center justify-center flex-1 shrink-0 border-t border-black text-heading4 font-medium uppercase tracking-[0.35rem]">
              Harvest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountProjectEarnSection;
