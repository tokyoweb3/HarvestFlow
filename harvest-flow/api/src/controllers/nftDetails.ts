import {Get, Query, Route} from "tsoa";
import {Controller} from "@tsoa/runtime";
import {NftDetails} from "@harvest-flow/utils";
import {getTokenDetails, requirePool} from "@harvest-flow/db";

const chainId = process.env.CHAIN_ID;

@Route('nft')
export class ClaimableController extends Controller {
    @Get()
    public async get(@Query() contractAddress: string, @Query() tokenId : string): Promise<NftDetails> {
        const pool = requirePool();

        const getTokenDetailsResult = await getTokenDetails.run(
            { chain_id: chainId, contract_address: contractAddress.toLowerCase(), token_id: BigInt(tokenId)},
            pool
        );

        if(getTokenDetailsResult.length !== 0) {
            return {
                tokenId: tokenId,
                contractAddress: contractAddress,
                projectName: getTokenDetailsResult[0].name,
                lendingData: {
                    principle: getTokenDetailsResult[0].price.toString(),
                    lendingStart: Date.parse(getTokenDetailsResult[0].lease_start.toISOString()),
                    lendingEnd: Date.parse(getTokenDetailsResult[0].lease_end.toISOString()),
                    yield: getTokenDetailsResult[0].min_yield.toString(),
                    claimedYield: getTokenDetailsResult[0].yield_claimed.toString(),
                    isRedeemed: getTokenDetailsResult[0].redeemed
                },
                metadata: {
                    image: getTokenDetailsResult[0].metadata_base_url + `/${tokenId}`,  //TODO fix this
                }
            };
        } else {
            throw new Error("Token not found");
        }

    }
}

