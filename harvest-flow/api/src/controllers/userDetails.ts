import {Get, Query, Route} from "tsoa";
import {Controller} from "@tsoa/runtime";
import {UserDetails} from "@harvest-flow/utils";
import {
    getUserTokens,
    getUserRankWithPoints,
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

        const getUserRankWithPointsResult = await getUserRankWithPoints.run(
            { user_address: userAddress.toLowerCase()},
            pool
        );

        const userPoints = Number(getUserRankWithPointsResult[0]?.balance ?? 0) ;
        const userRank = Number(getUserRankWithPointsResult[0]?.rank ?? 0) ;

        return {
            points: userPoints,
            rank: userRank,
            ownedNfts: getTokenDetailsResult.map((tokenDetails) => {
                return {
                    tokenId: tokenDetails.token_id,
                    contractAddress: tokenDetails.contract_address,
                    projectName: tokenDetails.name,
                    lendingData: {
                        principle: tokenDetails.price,
                        lendingStart: Date.parse(tokenDetails.lease_start.toISOString()),
                        lendingEnd: Date.parse(tokenDetails.lease_end.toISOString()),
                        yield: tokenDetails.min_yield,
                        claimedYield: tokenDetails.yield_claimed,
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
