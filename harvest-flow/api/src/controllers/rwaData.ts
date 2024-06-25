import { Get, Query, Route } from "tsoa";
import { Controller } from "@tsoa/runtime";
import { DeviceDetails } from "@harvest-flow/utils";
import { getDailyHistory, getDeviceSummary } from "@harvest-flow/game-logic";

@Route('rwaData')
export class RWADataController extends Controller {
  @Get()
  public async get(@Query() contractAddress: string, @Query() tokenId : string): Promise<DeviceDetails> {
    console.log("Getting device details");

    //TODO: get deviceId
    const deviceId = 10254142;

    const [deviceSummary, dailySummary] = await Promise.all([
      getDeviceSummary(deviceId),
      getDailyHistory(deviceId)
    ]);

    return {
      deviceId: deviceId,
      totalMileage: deviceSummary.totalMileage,
      totalDrivingTime: deviceSummary.totalDrivingTime,
      assetType: "Vehicle",
      vehicleModel: "TVS Deluxe 200CC",
      history: [
        {
          eventTime: deviceSummary.operationStarted.getTime(),
          eventDescription: "Started Operation"
        }
      ],
      dailySummary: dailySummary
    }
  }


}