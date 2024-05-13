import {Get, Query, Route} from "tsoa";
import {Controller} from "@tsoa/runtime";
import {NftHistory, NftHistoryEvent, NftHistoryEventType} from "@harvest-flow/utils";
import {getContract, requirePool} from "@harvest-flow/db";
import {getHistoryForUser} from "@harvest-flow/db/build/select.queries";


@Route('nft_history')
export class NftHistoryController extends Controller {
    @Get()
    public async get(@Query() userAddress: string): Promise<NftHistory> {
        const pool = requirePool();

        console.log(`Getting history for user: ${userAddress}`);

        const userProjectHistoryRes = await getHistoryForUser.run(
            {  owner_address: userAddress.toLowerCase() },
            pool
        );

        console.log(userProjectHistoryRes);

        const events: NftHistoryEvent[] = userProjectHistoryRes.map((history) => {
            return {
                eventType: ToNftHistoryEventType(history.type),
                price: history.amount,
                projectName: history.name,
                transactionHash: "0x1234567890abcdef1234567890abcdef12345678",
                timestamp: Date.parse(history.timestamp.toISOString())
            }
        })

        console.log(`events: ${events}`);

        return {
            address: userAddress,
            history: events
        };
    }
}

function ToNftHistoryEventType(eventType: string): NftHistoryEventType {
    switch(eventType) {
        case 'contract_created':
            return 'contract_created';
        case 'mint':
            return 'purchase';
        case 'activate':
            return 'activate';
        case 'claim':
            return 'claim';
        case 'remove_principal':
            return 'remove_principal';
        case 'withdraw':
            return 'withdraw';
        case 'deposit':
            return 'deposit';
        default:
            throw new Error(`Unknown event type: ${eventType}`);
    }
}