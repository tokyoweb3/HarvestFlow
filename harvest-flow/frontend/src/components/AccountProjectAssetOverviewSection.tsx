import React from "react";

import type { DataTileProps } from "./DataTile";
import DataTile from "./DataTile";

import tukTukImage from "../../assets/images/tuktuk.jpg";

const DriverAvatar = () => (
  <svg viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M24.3 51.6C10 54.65 0 61.75 0 70V90H40L25 70H12.5M40 90L48.9 54.05C48.9 54.05 45 55 40 55C35 55 31.1 54.05 31.1 54.05M40 90H80V70C80 61.75 70 54.65 55.7 51.6L67.5 70H55L40 90Z"
      fill="#325AB4"
    />
    <path
      d="M20 20C20 8.9543 28.9543 0 40 0C51.0457 0 60 8.95431 60 20V29.3845C60 38.5618 53.7541 46.5615 44.8507 48.7873C41.6659 49.5835 38.3341 49.5835 35.1493 48.7873C26.2459 46.5615 20 38.5618 20 29.3845V20Z"
      fill="#325AB4"
    />
  </svg>
);

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
      size="xs"
    />
  );
};

const AccountProjectAssetOverviewSection: React.FC = () => {
  return (
    <div className="flex flex-col gap-14">
      <h2 className="text-center text-heading3 font-medium uppercase">
        Asset overview
      </h2>
      <div className="">
        <div className="flex border-b border-r border-black">
          <div className="w-1/2 grid grid-cols-1 grid-rows-2">
            <div className="grid grid-cols-2 grid-rows-1">
              <div
                className="grid grid-rows-2 grid-cols-1 bg-center bg-cover bg-no-repeat border-t border-l border-black"
                style={{ backgroundImage: `url(${tukTukImage})` }}
              ></div>
              <div className="grid grid-rows-2 grid-cols-1">
                <ExtraSmallTile title="Asset ID" value="1" />
                <ExtraSmallTile title="Vehicle model" value="TVS Model 1" />
              </div>
            </div>
            <div className="flex w-full">
              <ExtraSmallTile
                title="Drive History"
                customComponent={
                  <div className="flex flex-col items-center justify-center gap-3">
                    <p className="text-heading4 text-center">
                      2023 Oct / Started Operation
                    </p>
                    <p className="text-heading4 text-center">
                      2023 Dec / Changed Driver
                    </p>
                  </div>
                }
              />
            </div>
          </div>
          <div className="w-1/2 grid grid-cols-1 grid-rows-2">
            <div className="grid grid-cols-1 grid-rows-2">
              <div className="grid grid-cols-2 grid-rows-1">
                <ExtraSmallTile title="DNFT ID" value="0x123...789" />
                <ExtraSmallTile
                  title="Asset type"
                  value="Two wheeled vehicle"
                />
              </div>
              <div className="grid grid-cols-2 grid-rows-1">
                <ExtraSmallTile title="Mileage" value="35,122 KM" />
                <ExtraSmallTile title="Mileage time" value="400 hrs" />
              </div>
            </div>
            <div className="flex w-full">
              <ExtraSmallTile
                title="Driver profile"
                customComponent={
                  <div className="flex gap-6">
                    <div className="w-[110px] shrink-0">
                      <DriverAvatar />
                    </div>
                    <div className="flex flex-col justify-center gap-1">
                      <p className="text-heading5">Name: K.H.</p>
                      <p className="text-heading5">Sex: Male</p>
                      <p className="text-heading5">Driver Since: 2020</p>
                      <p className="text-heading5">
                        Location: Phnom Penh, Cambodia
                      </p>
                    </div>
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountProjectAssetOverviewSection;
