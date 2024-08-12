import { Get, Query, Route, Response } from 'tsoa';
import { Controller } from '@tsoa/runtime';
import type { UserDetails } from '@harvest-flow/utils';
import { getUserTokens, getUserRankWithPoints, requirePool } from '@harvest-flow/db';
import { StatusCodes } from 'http-status-codes';
import type { InternalServerErrorResult, ValidateErrorResult } from '@paima/sdk/utils';

@Route('user_details')
export class UserDetailsController extends Controller {
  @Response<InternalServerErrorResult>(StatusCodes.INTERNAL_SERVER_ERROR)
  @Response<ValidateErrorResult>(StatusCodes.UNPROCESSABLE_ENTITY)
  @Get()
  public async getUserDetails(@Query() userAddress: string): Promise<UserDetails> {
    const pool = requirePool();

    const getTokenDetailsResult = await getUserTokens.run(
      { owner_address: userAddress.toLowerCase() },
      pool
    );

    const getUserRankWithPointsResult = await getUserRankWithPoints.run(
      { user_address: userAddress.toLowerCase() },
      pool
    );

    const userPoints = Number(getUserRankWithPointsResult[0]?.balance ?? 0);
    const userRank = Number(getUserRankWithPointsResult[0]?.rank ?? 0);

    return {
      points: userPoints,
      rank: userRank,
      ownedNfts: getTokenDetailsResult.map(tokenDetails => {
        return {
          tokenId: tokenDetails.token_id,
          contractAddress: tokenDetails.contract_address,
          projectName: tokenDetails.name,
          lendingData: {
            principle: tokenDetails.amount,
            lendingStart: Date.parse(tokenDetails.lease_start.toISOString()),
            lendingEnd: Date.parse(tokenDetails.lease_end.toISOString()),
            yield: tokenDetails.min_yield,
            claimedYield: tokenDetails.yield_claimed,
            isRedeemed: tokenDetails.redeemed,
          },
          metadata: {
            image: tokenDetails.metadata_base_url + `/${tokenDetails.token_id}`, // TODO fix this
          },
        };
      }),
    };
  }
}
