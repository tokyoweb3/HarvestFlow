/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TsoaRoute, fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserDetailsController } from './../controllers/userDetails';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { NftHistoryController } from './../controllers/nftHistory';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ClaimableController } from './../controllers/nftDetails';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { DetailedNftContractController } from './../controllers/detailedNftContract';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AllNftContractController } from './../controllers/allNftContract';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "NftDetails": {
        "dataType": "refObject",
        "properties": {
            "tokenId": {"dataType":"string","required":true},
            "contractAddress": {"dataType":"string","required":true},
            "projectName": {"dataType":"string","required":true},
            "lendingData": {"dataType":"nestedObjectLiteral","nestedProperties":{"isRedeemed":{"dataType":"boolean","required":true},"claimedYield":{"dataType":"string","required":true},"yield":{"dataType":"string","required":true},"lendingEnd":{"dataType":"double","required":true},"lendingStart":{"dataType":"double","required":true},"principle":{"dataType":"string","required":true}},"required":true},
            "metadata": {"dataType":"nestedObjectLiteral","nestedProperties":{"image":{"dataType":"string","required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserDetails": {
        "dataType": "refObject",
        "properties": {
            "points": {"dataType":"double","required":true},
            "rank": {"dataType":"double","required":true},
            "ownedNfts": {"dataType":"array","array":{"dataType":"refObject","ref":"NftDetails"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NftHistoryEventType": {
        "dataType": "refEnum",
        "enums": ["contract_created","mint","activate","claim","redeem"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NftHistoryEvent": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"timestamp":{"dataType":"double","required":true},"transactionHash":{"dataType":"string","required":true},"projectName":{"dataType":"string"},"price":{"dataType":"string"},"eventType":{"ref":"NftHistoryEventType","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NftHistory": {
        "dataType": "refObject",
        "properties": {
            "address": {"dataType":"string","required":true},
            "history": {"dataType":"array","array":{"dataType":"refAlias","ref":"NftHistoryEvent"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NftContractDetails": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "symbol": {"dataType":"string","required":true},
            "chainId": {"dataType":"string","required":true},
            "address": {"dataType":"string","required":true},
            "supplyCap": {"dataType":"double","required":true},
            "mintedAmount": {"dataType":"double","required":true},
            "leaseStart": {"dataType":"double","required":true},
            "leaseEnd": {"dataType":"double","required":true},
            "minYield": {"dataType":"string","required":true},
            "accepted_token": {"dataType":"string","required":true},
            "price": {"dataType":"string","required":true},
            "metadata": {"dataType":"any","required":true},
            "activated": {"dataType":"boolean","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NftContract": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "symbol": {"dataType":"string","required":true},
            "chainId": {"dataType":"string","required":true},
            "leaseStart": {"dataType":"double","required":true},
            "leaseEnd": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        app.get('/user_details',
            ...(fetchMiddlewares<RequestHandler>(UserDetailsController)),
            ...(fetchMiddlewares<RequestHandler>(UserDetailsController.prototype.get)),

            async function UserDetailsController_get(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    userAddress: {"in":"query","name":"userAddress","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new UserDetailsController();

              await templateService.apiHandler({
                methodName: 'get',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/nft_history/user',
            ...(fetchMiddlewares<RequestHandler>(NftHistoryController)),
            ...(fetchMiddlewares<RequestHandler>(NftHistoryController.prototype.getUserHistory)),

            async function NftHistoryController_getUserHistory(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    userAddress: {"in":"query","name":"userAddress","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new NftHistoryController();

              await templateService.apiHandler({
                methodName: 'getUserHistory',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/nft_history/project',
            ...(fetchMiddlewares<RequestHandler>(NftHistoryController)),
            ...(fetchMiddlewares<RequestHandler>(NftHistoryController.prototype.getProjectHistory)),

            async function NftHistoryController_getProjectHistory(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    contractAddress: {"in":"query","name":"contractAddress","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new NftHistoryController();

              await templateService.apiHandler({
                methodName: 'getProjectHistory',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/nft',
            ...(fetchMiddlewares<RequestHandler>(ClaimableController)),
            ...(fetchMiddlewares<RequestHandler>(ClaimableController.prototype.get)),

            async function ClaimableController_get(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    contractAddress: {"in":"query","name":"contractAddress","required":true,"dataType":"string"},
                    tokenId: {"in":"query","name":"tokenId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new ClaimableController();

              await templateService.apiHandler({
                methodName: 'get',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/nft_details',
            ...(fetchMiddlewares<RequestHandler>(DetailedNftContractController)),
            ...(fetchMiddlewares<RequestHandler>(DetailedNftContractController.prototype.get)),

            async function DetailedNftContractController_get(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    contractAddress: {"in":"query","name":"contractAddress","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new DetailedNftContractController();

              await templateService.apiHandler({
                methodName: 'get',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/all_nft',
            ...(fetchMiddlewares<RequestHandler>(AllNftContractController)),
            ...(fetchMiddlewares<RequestHandler>(AllNftContractController.prototype.get)),

            async function AllNftContractController_get(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    notEnded: {"default":true,"in":"query","name":"notEnded","dataType":"boolean"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new AllNftContractController();

              await templateService.apiHandler({
                methodName: 'get',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
