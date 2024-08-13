import { Get, Query, Route, Response } from 'tsoa';
import { Controller } from '@tsoa/runtime';
import type { NftContractDetailsResponse } from '@harvest-flow/utils';
import { getContract, requirePool } from '@harvest-flow/db';
import { StatusCodes } from 'http-status-codes';
import type { InternalServerErrorResult, ValidateErrorResult } from '@paima/sdk/utils';

const chainId = `eip155:${process.env.CHAIN_ID}`;

@Route('nft_details')
export class DetailedNftContractController extends Controller {
  @Response<InternalServerErrorResult>(StatusCodes.INTERNAL_SERVER_ERROR)
  @Response<ValidateErrorResult>(StatusCodes.UNPROCESSABLE_ENTITY)
  @Response<null>(StatusCodes.NO_CONTENT)
  @Get()
  public async getProjectDetails(
    @Query() contractAddress: string
  ): Promise<NftContractDetailsResponse> {
    const pool = requirePool();

    const contractAddressLc = contractAddress.toLowerCase();

    const getContractDataResult = await getContract.run(
      { address: contractAddressLc, chain_id: chainId },
      pool
    );

    if (getContractDataResult.length !== 0) {
      return {
        details: {
          name: getContractDataResult[0].name,
          symbol: getContractDataResult[0].symbol,
          chainId: getContractDataResult[0].chain_id,
          address: getContractDataResult[0].address,
          supplyCap: getContractDataResult[0].supply_cap.toString(),
          mintedAmount: getContractDataResult[0].minted_amount.toString(),
          leaseStart: Date.parse(getContractDataResult[0].lease_start.toISOString()),
          leaseEnd: Date.parse(getContractDataResult[0].lease_end.toISOString()),
          minYield: getContractDataResult[0].min_yield.toString(),
          accepted_token: getContractDataResult[0].accepted_token,
          presalePrice: getContractDataResult[0].presale_price.toString(),
          publicsalePrice: getContractDataResult[0].publicsale_price.toString(),
          metadata: getContractDataResult[0].metadata_base_url,
          activated: getContractDataResult[0].activated,
          owner: getContractDataResult[0].owner,
          signerAddress: getContractDataResult[0].signer_address,
          isPresale: getContractDataResult[0].is_presale,
          isPublicsale: getContractDataResult[0].is_publicsale,
        },
      };
    } else {
      return { details: null };
    }
  }
}
