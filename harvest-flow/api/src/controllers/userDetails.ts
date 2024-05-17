import {Get, Query, Route} from "tsoa";
import {Controller} from "@tsoa/runtime";
import {UserDetails} from "@harvest-flow/utils";
import {
    getUserTokens,
    requirePool
} from "@harvest-flow/db";



@Route('user_details')
export class UserDetailsController extends Controller {
    @Get()
    public async get(@Query() userAddress: string): Promise<UserDetails> {
        const pool = requirePool();

        const getTokenDetailsResult = await getUserTokens.run(
            { owner_address: userAddress.toLowerCase()},
            pool
        );

        // TODO: Implement
        const userPoints = 100;
        const userRank = 15;


        return {
            points: userPoints,
            rank: userRank,
            ownedNfts: getTokenDetailsResult.map((tokenDetails) => {
                return {
                    tokenId: tokenDetails.token_id.toString(),
                    contractAddress: tokenDetails.contract_address,
                    projectName: tokenDetails.name,
                    lendingData: {
                        principle: tokenDetails.price.toString(),
                        lendingStart: Date.parse(tokenDetails.lease_start.toISOString()),
                        lendingEnd: Date.parse(tokenDetails.lease_end.toISOString()),
                        yield: tokenDetails.min_yield.toString(),
                        claimedYield: tokenDetails.yield_claimed.toString(),
                        isRedeemed: tokenDetails.redeemed
                    },
                    metadata: {
                        image: tokenDetails.metadata_base_url + `/${tokenDetails.token_id}`,  //TODO fix this
                    }

                };
            })
        }

    }
}
