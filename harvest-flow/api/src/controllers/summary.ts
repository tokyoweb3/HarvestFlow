import { Controller, Get, Route } from "tsoa";
import { Summary } from "@harvest-flow/utils";
import { getOwnersCount,
  getTotalLoaned,
  getTotalRepaid,
  requirePool
} from "@harvest-flow/db";
import { ethers } from "ethers";

@Route('summary')
export class SummaryController extends Controller {
  @Get()
  public async get(): Promise<Summary> {
    const pool = requirePool();

    const totalLoanedResult = await getTotalLoaned.run( undefined as void, pool);
    const totalRepaidResult = await getTotalRepaid.run( undefined as void, pool);
    const getOwnersCountResult = await getOwnersCount.run( undefined as void, pool);

    const totalLoaned = totalLoanedResult.length > 0 ? Number(ethers.formatEther(totalLoanedResult[0].total_token_prices ?? 0)) : 0;
    const totalRepaid = totalRepaidResult.length > 0 ? Number(ethers.formatEther(totalRepaidResult[0].total_repaid_amount ?? 0)) : 0;

    return {
      totalLoaned: totalLoaned,
      totalRepaid: totalRepaid,
      userCount: Number(getOwnersCountResult.length > 0 ? getOwnersCountResult[0].total_unique_owners : 0)
    }
  }
}