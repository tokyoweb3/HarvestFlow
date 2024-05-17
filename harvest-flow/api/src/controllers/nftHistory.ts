import {Get, Query, Route} from "tsoa";
import {Controller} from "@tsoa/runtime";
import {NftHistory, NftHistoryEvent, NftHistoryEventType} from "@harvest-flow/utils";
import {getHistoryForContract, getHistoryForUser, requirePool} from "@harvest-flow/db";

const chainId = process.env.CHAIN_ID;

@Route('nft_history')
export class NftHistoryController extends Controller {
    @Get("/user")
    public async getUserHistory(@Query() userAddress: string): Promise<NftHistory> {
        const pool = requirePool();

        const userProjectHistoryRes = await getHistoryForUser.run(
            {  owner_address: userAddress.toLowerCase() },
            pool
        );

        const events: NftHistoryEvent[] = userProjectHistoryRes.map((history) => {
            return {
                eventType: ToNftHistoryEventType(history.type),
                price: history.amount?.toString() ?? undefined,
                projectName: history.name,
                transactionHash: history.tx_hash,
                timestamp: Date.parse(history.timestamp.toISOString())
            }
        })

        console.log(`events: ${events}`);

        return {
            address: userAddress,
            history: events
        };
    }

    @Get("/project")
    public async getProjectHistory(@Query() contractAddress: string): Promise<NftHistory> {
        const pool = requirePool();

        const projectHistoryRes = await getHistoryForContract.run(
            { contract_address: contractAddress.toLowerCase(), chain_id: chainId },
            pool
        );

        const events: NftHistoryEvent[] = projectHistoryRes.map((history) => {
            return {
                eventType: ToNftHistoryEventType(history.type),
                price: history.amount?.toString() ?? undefined,
                transactionHash: history.tx_hash,
                timestamp: Date.parse(history.timestamp.toISOString())
            }
        })

        console.log(`events: ${events}`);

        return {
            address: contractAddress,
            history: events
        };
    }
}

function ToNftHistoryEventType(eventType: string): NftHistoryEventType {
    switch(eventType) {
        case 'contract_created':
            return NftHistoryEventType.CONTRACT_CREATED;
        case 'mint':
            return NftHistoryEventType.MINT;
        case 'activate':
            return NftHistoryEventType.ACTIVATE;
        case 'claim':
            return NftHistoryEventType.CLAIM;
        case 'redeem':
            return NftHistoryEventType.REDEEM;
        default:
            throw new Error(`Unknown event type: ${eventType}`);
    }
}