import { Controller, Get, Query, Route, Response } from 'tsoa';
import type { NftContract } from '@harvest-flow/utils';
import { getContractsList, requirePool } from '@harvest-flow/db';
import { StatusCodes } from 'http-status-codes';
import type { InternalServerErrorResult, ValidateErrorResult } from '@paima/sdk/utils';

@Route('all_nft')
export class AllNftContractController extends Controller {
  @Response<InternalServerErrorResult>(StatusCodes.INTERNAL_SERVER_ERROR)
  @Response<ValidateErrorResult>(StatusCodes.UNPROCESSABLE_ENTITY)
  @Get()
  public async getAllNfts(@Query() justActive: boolean = true): Promise<NftContract[]> {
    const pool = requirePool();

    const getContractsListResult = await getContractsList.run({ just_activated: justActive }, pool);

    return getContractsListResult.map(contract => {
      return {
        name: contract.name,
        symbol: contract.symbol,
        chainId: contract.chain_id,
        address: contract.address,
        leaseStart: Date.parse(contract.lease_start.toISOString()),
        leaseEnd: Date.parse(contract.lease_end.toISOString()),
      };
    });
  }
}
