import { Get, Query, Route, Response } from 'tsoa';
import { Controller } from '@tsoa/runtime';
import type { NftDetails } from '@harvest-flow/utils';
import { getTokenDetails, requirePool } from '@harvest-flow/db';
import { StatusCodes } from 'http-status-codes';
import type { InternalServerErrorResult, ValidateErrorResult } from '@paima/sdk/utils';

const chainId = `eip155:${process.env.CHAIN_ID}`;

@Route('nft')
export class ClaimableController extends Controller {
  @Response<InternalServerErrorResult>(StatusCodes.INTERNAL_SERVER_ERROR)
  @Response<ValidateErrorResult>(StatusCodes.UNPROCESSABLE_ENTITY)
  @Get()
  public async getTokenDetails(
    @Query() contractAddress: string,
    @Query() tokenId: string
  ): Promise<NftDetails> {
    const pool = requirePool();

    const getTokenDetailsResult = await getTokenDetails.run(
      { chain_id: chainId, contract_address: contractAddress.toLowerCase(), token_id: tokenId },
      pool
    );

    if (getTokenDetailsResult.length !== 0) {
      return {
        tokenId: tokenId,
        contractAddress: contractAddress,
        projectName: getTokenDetailsResult[0].name,
        lendingData: {
          principle: getTokenDetailsResult[0].amount,
          lendingStart: Date.parse(getTokenDetailsResult[0].lease_start.toISOString()),
          lendingEnd: Date.parse(getTokenDetailsResult[0].lease_end.toISOString()),
          yield: getTokenDetailsResult[0].min_yield,
          claimedYield: getTokenDetailsResult[0].yield_claimed,
          isRedeemed: getTokenDetailsResult[0].redeemed,
        },
        metadata: {
          image: getTokenDetailsResult[0].metadata_base_url + `/${tokenId}`, // TODO fix this
        },
      };
    } else {
      throw new Error('Token not found');
    }
  }
}
