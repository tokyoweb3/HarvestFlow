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
      title={title}
      value={value}
      size="large"
      wrapperClassName="flex-1"
    />
  );
};

const AccountProjectRWASection: React.FC = () => {
  return (
    <div className="flex flex-col gap-14">
      <h2 className="text-center text-heading3 font-medium uppercase">
        RWA Data
      </h2>
      <div className="">
        <div className="flex border-b border-black">
          <div className="w-[40%]">
            <div className="flex w-full">
              <LargeTile title="Total hours worked" value="123 HRS" />
            </div>
            <div className="grid grid-cols-2 grid-rows-1">
              <ExtraSmallTile title="This week" value="40 HRS" />
              <ExtraSmallTile title="Last week" value="83 HRS" />
            </div>
            <div className="flex w-full">
              <LargeTile title="Total mileage" value="1,342 km" />
            </div>
            <div className="grid grid-cols-2 grid-rows-1">
              <ExtraSmallTile title="This week" value="471 km" />
              <ExtraSmallTile title="Last week" value="871 km" />
            </div>
          </div>
          <div className="w-[60%] border-r border-black flex flex-col">
            <LargeTile title="Driving chart" value="CHART_HERE" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountProjectRWASection;
