import {Get, Query, Route} from "tsoa";
import {Controller} from "@tsoa/runtime";
import {UserDetails} from "@harvest-flow/utils";



@Route('user_details')
export class UserDetailsController extends Controller {
    @Get()
    public async get(@Query() userAddress: string): Promise<UserDetails> {


        const userDetails: UserDetails = {
            ownedNfts:  {'0x1234567890abcdef1234567890abcdef12345678': [1, 2, 3],},
            points: 100,
            rank: 15,
            lendingAmount: 4000,
            totalYield: 50,
            apr: 0.08,
            claimableYield: 40,
            claimablePrincipal: 4000,
        }

        return userDetails;
    }
}

