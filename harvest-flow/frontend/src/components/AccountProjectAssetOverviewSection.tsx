import React from "react";

import type { DataTileProps } from "./DataTile";
import DataTile from "./DataTile";

import tukTukImage from "../../assets/images/account-owner-asset-overview-image.jpg";
import type { DeviceDetails } from "@harvest-flow/utils";
import { getMonth } from "@src/utils";
import { useTranslation } from "react-i18next";

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

const AccountProjectAssetOverviewSection: React.FC<{
  deviceDetails: DeviceDetails;
}> = ({ deviceDetails }) => {
  const { t } = useTranslation();

  console.log(deviceDetails);

  return (
    <div className="flex flex-col gap-[60px] desktop:gap-[58px]">
      <h2 className="text-heading5Larger desktop:text-heading4_30_30 text-center uppercase font-medium tracking-[0.35rem]">
        {t("owner.asset_overview.title")}
      </h2>
      <div className="bg-white border-r border-b border-black">
        <div className="grid grid-cols-1 grid-rows-2 desktop:grid-rows-1 desktop:grid-cols-2">
          <div className="grid grid-cols-2 grid-rows-1">
            <div
              className="grid grid-rows-2 grid-cols-1 bg-center bg-cover bg-no-repeat border-t border-l border-black"
              style={{ backgroundImage: `url(${tukTukImage})` }}
            ></div>
            <div className="grid grid-rows-2 grid-cols-1">
              <ExtraSmallTile
                title={t("owner.asset_overview.asset_id")}
                value={deviceDetails.deviceId.toString()}
              />
              <ExtraSmallTile
                title={t("owner.asset_overview.vehicle_model")}
                value={deviceDetails.vehicleModel}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 grid-rows-2">
            <div className="grid grid-cols-2 grid-rows-1">
              <ExtraSmallTile
                title={t("owner.asset_overview.number_of_payments")}
                value="0x123...789"
              />
              <ExtraSmallTile
                title={t("owner.asset_overview.asset_type")}
                value={deviceDetails.assetType}
              />
            </div>
            <div className="grid grid-cols-2 grid-rows-1">
              <ExtraSmallTile
                title={t("owner.asset_overview.mileage")}
                value={`${deviceDetails.totalMileage} KM`}
              />
              <ExtraSmallTile
                title={t("owner.asset_overview.mileage_time")}
                value={`${Math.floor(deviceDetails.totalDrivingTime / 3600)} hrs`}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 grid-rows-2 desktop:grid-rows-1 desktop:grid-cols-2">
          <ExtraSmallTile
            title={t("owner.asset_overview.history")}
            customComponent={
              <div className="flex flex-col items-center justify-center gap-3">
                {deviceDetails.history.map((event, index) => (
                  <p
                    key={index}
                    className="text-bodyLarge desktop:text-heading4SmallerLH34 text-center"
                  >
                    {new Date(event.eventTime).getFullYear()}{" "}
                    {getMonth(event.eventTime)} / {event.eventDescription}
                  </p>
                ))}
              </div>
            }
          />
          <ExtraSmallTile
            title={t("owner.asset_overview.driver_profile")}
            customComponent={
              <div className="flex gap-6 items-center p-[35px]">
                <div className="w-[56px] desktop:w-[80px] shrink-0">
                  <DriverAvatar />
                </div>
                <div className="flex flex-col justify-center gap-0">
                  <p className="text-body16_18 desktop:text-bodyLarge24">
                    {t("owner.asset_overview.name")}: K.H.
                  </p>
                  <p className="text-body16_18 desktop:text-bodyLarge24">
                    {t("owner.asset_overview.sex")}: Male
                  </p>
                  <p className="text-body16_18 desktop:text-bodyLarge24">
                    {t("owner.asset_overview.driver_since")}: 2020
                  </p>
                  <p className="text-body16_18 desktop:text-bodyLarge24">
                    {t("owner.asset_overview.location")}: Phnom Penh, Cambodia
                  </p>
                </div>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default AccountProjectAssetOverviewSection;
