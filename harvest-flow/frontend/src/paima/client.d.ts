import type { Client } from 'openapi-fetch';
import type { paths as GameRestPaths } from './rest-schema.js';
export declare function getGameRestClient(): Client<GameRestPaths>;
export declare const gameRestClient: Client<GameRestPaths, `${string}/${string}`>;
