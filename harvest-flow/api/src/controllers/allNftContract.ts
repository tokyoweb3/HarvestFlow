import { Controller, Get, Query, Route } from "tsoa";
import { NftContract } from "@harvest-flow/utils";
import { getContractsList, requirePool } from "@harvest-flow/db";

@Route('all_nft')
export class AllNftContractController extends Controller {
    @Get()
    public async get(@Query() justActive: boolean = true): Promise<NftContract[]> {
        const pool = requirePool();

        const getContractsListResult = await getContractsList.run(
          { just_activated: justActive },
          pool
        );

        return getContractsListResult.map((contract) => {
            return {
                name: contract.name,
                symbol: contract.symbol,
                chainId: contract.chain_id,
                address: contract.address,
                leaseStart: Date.parse(contract.lease_start.toISOString()),
                leaseEnd: Date.parse(contract.lease_end.toISOString())
            };
        });
    }
}
