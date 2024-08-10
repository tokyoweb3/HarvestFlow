import { Controller, Get, Route, Response } from 'tsoa';
import type { Summary } from '@harvest-flow/utils';
import { getOwnersCount, getTotalLoaned, getTotalRepaid, requirePool } from '@harvest-flow/db';
import { ethers } from 'ethers';
import { StatusCodes } from 'http-status-codes';
import type { InternalServerErrorResult, ValidateErrorResult } from '@paima/sdk/utils';

@Route('summary')
export class SummaryController extends Controller {
  @Response<InternalServerErrorResult>(StatusCodes.INTERNAL_SERVER_ERROR)
  @Response<ValidateErrorResult>(StatusCodes.UNPROCESSABLE_ENTITY)
  @Get()
  public async getSummary(): Promise<Summary> {
    const pool = requirePool();

    const totalLoanedResult = await getTotalLoaned.run(undefined as void, pool);
    const totalRepaidResult = await getTotalRepaid.run(undefined as void, pool);
    const getOwnersCountResult = await getOwnersCount.run(undefined as void, pool);

    const totalLoaned =
      totalLoanedResult.length > 0
        ? Number(ethers.formatEther(totalLoanedResult[0].total_token_prices ?? 0))
        : 0;
    const totalRepaid =
      totalRepaidResult.length > 0
        ? Number(ethers.formatEther(totalRepaidResult[0].total_repaid_amount ?? 0))
        : 0;

    return {
      totalLoaned: totalLoaned,
      totalRepaid: totalRepaid,
      userCount: Number(
        getOwnersCountResult.length > 0 ? getOwnersCountResult[0].total_unique_owners : 0
      ),
    };
  }
}
