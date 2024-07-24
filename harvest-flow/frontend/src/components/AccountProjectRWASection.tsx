import React from "react";

import type { DataTileProps } from "./DataTile";
import DataTile from "./DataTile";
import { DailyDeviceSummary, type DeviceDetails } from "@harvest-flow/utils";
import { getStartOfCurrentWeek, getStartOfLastWeek } from "@src/utils";
import RwaDataChart from "@src/components/RwaDataChart";

const ExtraSmallTile: React.FC<DataTileProps> = ({ title, value }) => {
  return (
    <DataTile
      wrapperClassName="border-t border-l border-black w-full"
      title={title}
      value={value}
      size="xs24"
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

const AccountProjectRWASection: React.FC<{ deviceDetails: DeviceDetails }> = ({
  deviceDetails,
}) => {
  return (
    <div className="flex flex-col gap-[58px]">
      <h2 className="text-bodyLarge desktop:text-heading4_30_30 text-center uppercase font-medium tracking-[0.35rem]">
        RWA Data
      </h2>
      <div className="bg-white">
        <div className="flex border-b border-black">
          <div className="w-[40%]">
            <div className="flex w-full">
              <LargeTile
                title="Total hours worked"
                value={`${Math.floor(deviceDetails.totalDrivingTime / 3600)} HRS`}
              />
            </div>
            <div className="grid grid-cols-2 grid-rows-1">
              <ExtraSmallTile
                title="This week"
                value={`${Math.floor(getWeeklyDrivingTime(deviceDetails.dailySummary, true) / 3600)} HRS`}
              />
              <ExtraSmallTile
                title="Last week"
                value={`${Math.floor(getWeeklyDrivingTime(deviceDetails.dailySummary, false) / 3600)} HRS`}
              />
            </div>
            <div className="flex w-full">
              <LargeTile
                title="Total mileage"
                value={`${deviceDetails.totalMileage} KM`}
              />
            </div>
            <div className="grid grid-cols-2 grid-rows-1">
              <ExtraSmallTile
                title="This week"
                value={`${getWeeklyMileage(deviceDetails.dailySummary, true)} km`}
              />
              <ExtraSmallTile
                title="Last week"
                value={`${getWeeklyMileage(deviceDetails.dailySummary, false)} km`}
              />
            </div>
          </div>
          <div className="w-[60%] border-r border-black flex flex-col">
            <DataTile
              title="Driving chart"
              size="large"
              wrapperClassName="flex-1"
              customComponent={
                <RwaDataChart dailyStats={deviceDetails.dailySummary} />
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

function filterDailyData(
  dailySummary: DailyDeviceSummary[],
  referenceDate: Date,
) {
  return dailySummary.filter((dailyData) => {
    const dailyDataDate = new Date(dailyData.date);
    return dailyDataDate >= referenceDate;
  });
}

function getWeeklyMileage(
  dailySummary: DailyDeviceSummary[],
  isThisWeek: boolean,
) {
  const referenceDate = isThisWeek
    ? getStartOfCurrentWeek()
    : getStartOfLastWeek();
  return filterDailyData(dailySummary, referenceDate).reduce(
    (acc, dailyData) => acc + dailyData.dailyMileage,
    0,
  );
}

function getWeeklyDrivingTime(
  dailySummary: DailyDeviceSummary[],
  isThisWeek: boolean,
) {
  const referenceDate = isThisWeek
    ? getStartOfCurrentWeek()
    : getStartOfLastWeek();
  return filterDailyData(dailySummary, referenceDate).reduce(
    (acc, dailyData) => acc + dailyData.dailyDrivingTime,
    0,
  );
}

export default AccountProjectRWASection;
