export type DeviceSummaryResponse = {
  data : DeviceSummary[];
  err : string;
}

type DeviceSummary = {
  deviceId: number;
  totalMileage: number;
  totalDrivingtime: number;
  firstCommunicatedAt: Date;
  lastCommunicatedAt: Date;
  updatedAt: Date;
}