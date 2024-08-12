export type DeviceSummaryResponse = {
  data: DeviceSummary[];
  err: string;
};

export type DeviceReportsResponse = {
  data: DailySummary[];
  err: string;
};

type DeviceSummary = {
  deviceId: number;
  totalMileage: number;
  totalDrivingtime: number;
  firstCommunicatedAt: Date;
  lastCommunicatedAt: Date;
  updatedAt: Date;
};

type DailySummary = {
  datetime: string;
  mileage: number;
  drivingtime: number;
};
