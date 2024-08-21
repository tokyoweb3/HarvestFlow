/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TsoaRoute, fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserDetailsController } from './../controllers/userDetails';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { SummaryController } from './../controllers/summary';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { RWADataController } from './../controllers/rwaData';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { PresaleController } from './../controllers/presaleAllowlist';
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
    "FailedResult": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"enum","enums":[false],"required":true},
            "errorMessage": {"dataType":"string","required":true},
            "errorCode": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "InternalServerErrorResult": {
        "dataType": "refAlias",
        "type": {"ref":"FailedResult","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FieldErrors": {
        "dataType": "refObject",
        "properties": {
        },
        "additionalProperties": {"dataType":"nestedObjectLiteral","nestedProperties":{"value":{"dataType":"any"},"message":{"dataType":"string","required":true}}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ValidateErrorResult": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"enum","enums":["Validation Failed"],"required":true},
            "details": {"ref":"FieldErrors"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Summary": {
        "dataType": "refObject",
        "properties": {
            "totalLoaned": {"dataType":"double","required":true},
            "totalRepaid": {"dataType":"double","required":true},
            "userCount": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DeviceHistory": {
        "dataType": "refObject",
        "properties": {
            "eventTime": {"dataType":"double","required":true},
            "eventDescription": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DailyDeviceSummary": {
        "dataType": "refObject",
        "properties": {
            "date": {"dataType":"string","required":true},
            "dailyMileage": {"dataType":"double","required":true},
            "dailyDrivingTime": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DeviceDetails": {
        "dataType": "refObject",
        "properties": {
            "deviceId": {"dataType":"double","required":true},
            "totalMileage": {"dataType":"double","required":true},
            "totalDrivingTime": {"dataType":"double","required":true},
            "assetType": {"dataType":"string","required":true},
            "vehicleModel": {"dataType":"string","required":true},
            "history": {"dataType":"array","array":{"dataType":"refObject","ref":"DeviceHistory"},"required":true},
            "dailySummary": {"dataType":"array","array":{"dataType":"refObject","ref":"DailyDeviceSummary"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SignatureInfo": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"signature":{"dataType":"string","required":true},"amount":{"dataType":"double","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PresaleParticipation": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"buyable":{"ref":"SignatureInfo"},"amountBought":{"dataType":"double","required":true}},"validators":{}},
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
            "supplyCap": {"dataType":"string","required":true},
            "mintedAmount": {"dataType":"string","required":true},
            "leaseStart": {"dataType":"double","required":true},
            "leaseEnd": {"dataType":"double","required":true},
            "minYield": {"dataType":"string","required":true},
            "accepted_token": {"dataType":"string","required":true},
            "presalePrice": {"dataType":"string","required":true},
            "publicsalePrice": {"dataType":"string","required":true},
            "metadata": {"dataType":"any","required":true},
            "activated": {"dataType":"boolean","required":true},
            "owner": {"dataType":"string","required":true},
            "signerAddress": {"dataType":"string","required":true},
            "isPresale": {"dataType":"boolean","required":true},
            "isPublicsale": {"dataType":"boolean","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NftContractDetailsResponse": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"details":{"dataType":"union","subSchemas":[{"ref":"NftContractDetails"},{"dataType":"enum","enums":[null]}],"required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NftContract": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "symbol": {"dataType":"string","required":true},
            "chainId": {"dataType":"string","required":true},
            "address": {"dataType":"string","required":true},
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
            ...(fetchMiddlewares<RequestHandler>(UserDetailsController.prototype.getUserDetails)),

            async function UserDetailsController_getUserDetails(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    userAddress: {"in":"query","name":"userAddress","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new UserDetailsController();

              await templateService.apiHandler({
                methodName: 'getUserDetails',
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
        app.get('/summary',
            ...(fetchMiddlewares<RequestHandler>(SummaryController)),
            ...(fetchMiddlewares<RequestHandler>(SummaryController.prototype.getSummary)),

            async function SummaryController_getSummary(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new SummaryController();

              await templateService.apiHandler({
                methodName: 'getSummary',
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
        app.get('/rwaData',
            ...(fetchMiddlewares<RequestHandler>(RWADataController)),
            ...(fetchMiddlewares<RequestHandler>(RWADataController.prototype.getRwaData)),

            async function RWADataController_getRwaData(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    contractAddress: {"in":"query","name":"contractAddress","required":true,"dataType":"string"},
                    tokenId: {"in":"query","name":"tokenId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new RWADataController();

              await templateService.apiHandler({
                methodName: 'getRwaData',
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
        app.get('/presale',
            ...(fetchMiddlewares<RequestHandler>(PresaleController)),
            ...(fetchMiddlewares<RequestHandler>(PresaleController.prototype.forAddress)),

            async function PresaleController_forAddress(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    contractAddress: {"in":"query","name":"contractAddress","required":true,"dataType":"string"},
                    userAddress: {"in":"query","name":"userAddress","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new PresaleController();

              await templateService.apiHandler({
                methodName: 'forAddress',
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
            ...(fetchMiddlewares<RequestHandler>(ClaimableController.prototype.getTokenDetails)),

            async function ClaimableController_getTokenDetails(request: ExRequest, response: ExResponse, next: any) {
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
                methodName: 'getTokenDetails',
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
            ...(fetchMiddlewares<RequestHandler>(DetailedNftContractController.prototype.getProjectDetails)),

            async function DetailedNftContractController_getProjectDetails(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    contractAddress: {"in":"query","name":"contractAddress","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new DetailedNftContractController();

              await templateService.apiHandler({
                methodName: 'getProjectDetails',
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
            ...(fetchMiddlewares<RequestHandler>(AllNftContractController.prototype.getAllNfts)),

            async function AllNftContractController_getAllNfts(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    justActive: {"default":true,"in":"query","name":"justActive","dataType":"boolean"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new AllNftContractController();

              await templateService.apiHandler({
                methodName: 'getAllNfts',
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
