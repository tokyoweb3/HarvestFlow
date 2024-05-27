import { SQLUpdate } from "@paima/node-sdk/db";
import { Pool } from "pg";
import type Prando from "@paima/sdk/prando";
import type { SubmittedChainData } from "@paima/sdk/utils";
import parse, { isInvalid } from "./parser";
import { PARSER_KEYS } from "./constants";
import {
    calculateDailyPoints,
    contractActivated,
    contractDeployed,
    interestClaimed,
    nftMinted,
    principalRedeemed
} from "./transition";

export default async function (
    inputData: SubmittedChainData,
    blockHeight: number,
    randomnessGenerator: Prando,
    dbConn: Pool
): Promise<SQLUpdate[]> {
    console.log(inputData, 'parsing input data');
    console.log(`Processing input string: ${inputData.inputData}`);
    const expanded = parse(inputData.inputData);
    if (isInvalid(expanded)) {
        console.log(`Invalid input string`);
        return [];
    }
    console.log(`Input string parsed as: ${expanded.input}`);
    console.log(expanded, 'expanded input');

    switch (expanded.input) {
        case PARSER_KEYS.contractDeployed:
            return contractDeployed(expanded);
        case PARSER_KEYS.contractActivated:
            return contractActivated(expanded);
        case PARSER_KEYS.nftMinted:
            return nftMinted(expanded, blockHeight,dbConn);
        case PARSER_KEYS.claimed:
            return interestClaimed(expanded, blockHeight);
        case PARSER_KEYS.redeemed:
            return principalRedeemed(expanded, blockHeight);
        case PARSER_KEYS.calcPoints:
            return calculateDailyPoints(expanded, dbConn);
        default:
            return [];
    }
}