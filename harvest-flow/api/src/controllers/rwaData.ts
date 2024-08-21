import { Get, Query, Route, Response } from 'tsoa';
import { Controller } from '@tsoa/runtime';
import type { DeviceDetails } from '@harvest-flow/utils';
import { getDailyHistory, getDeviceSummary } from '@harvest-flow/game-logic';
import { StatusCodes } from 'http-status-codes';
import type { InternalServerErrorResult, ValidateErrorResult } from '@paima/sdk/utils';

@Route('rwaData')
export class RWADataController extends Controller {
  @Response<InternalServerErrorResult>(StatusCodes.INTERNAL_SERVER_ERROR)
  @Response<ValidateErrorResult>(StatusCodes.UNPROCESSABLE_ENTITY)
  @Get()
  public async getRwaData(
    @Query() contractAddress: string,
    @Query() tokenId: string
  ): Promise<DeviceDetails> {
    console.log('Getting device details');

    // TODO: get deviceId
    const deviceId = 10254142;

    const [deviceSummary, dailySummary] = await Promise.all([
      getDeviceSummary(deviceId),
      getDailyHistory(deviceId),
    ]);

    return {
      deviceId: deviceId,
      totalMileage: deviceSummary.totalMileage,
      totalDrivingTime: deviceSummary.totalDrivingTime,
      assetType: 'Vehicle',
      vehicleModel: 'TVS Deluxe 200CC',
      history: [
        {
          eventTime: deviceSummary.operationStarted.getTime(),
          eventDescription: 'Started Operation',
        },
      ],
      dailySummary: dailySummary,
    };
  }
}
