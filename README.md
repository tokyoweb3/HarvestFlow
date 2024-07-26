# HarvestFlow

## Development
To run the app in development environment with local chain, navigate to `harvest-flow` and run the following commands:

1. Initialize the project: `npm run initialize`
2. Start the local chain: `npm run chain:start`
3. Deploy the factory contract and Nft template: `npm run chain:deploy`
4. Deploy test project to the local chain: `npm run chain:deploy:localtest`
5. Set the following environment variables in `.env.localhost`:
    - `TOKTOK_NFT_FACTORY_CONTRACT_ADDRESS` - address of the factory contract
    - `PAYMENT_TOKEN_CONTRACT_ADDRESS` - address of the NFT template
These values can be found in `harvest-flow/contracts/ignition/deployments/{chainId}/deployed_addresses.json`
    - GMS_CLOUD_CLIENT_ID
    - GMS_CLOUD_CLIENT_SECRET
These can be obtained from https://ops.cloud-gms.com/operation/ in the user information section
6. In the root folder extensions.yml change every `contractAddress` to the address of the deployed factory contract address
7. Start the database: `npm run db:start`
8. Build backend: `npm run build`
9. Pack the code: `npm run pack`
10. Pack middleware: `npm run pack:middleware`
11. Start the backend: In the root folder run  `./paima-engine-linux run` or `./paima-engine-macos run` 
12. Start the frontend: navigate to `harvest-flow/frontend` and run `npm run start`

## Deploy smart contracts to the testnet
First run `npm run initialize` if you haven't already.

To deploy the smart contracts to the testnet, make a copy of `.env.localhost` and name it `.env.testnet`. Set the following environment variables:
 - All variables in the CHAIN Data section
 - DEPLOYER_PRIVATE_KEY

### Deploying the factory contract and NFT template
Navigate to `harvest-flow` and run the following commands: `npm run chain:deploy --network testnet`
That will deploy the factory contract and NFT template to the testnet. The addresses of the deployed contracts adresses will be saved in `harvest-flow/contracts/ignition/deployments/{chainId}/deployed_addresses.json`

When you have the factory contract address, you can set it to the `.env.testnet` file as `TOKTOK_NFT_FACTORY_CONTRACT_ADDRESS`.
And also set this address in the `extensions.yml` file in the root folder as contractAddress.

### Deploying the test project
1. Set the `factoryContractAddress` value in harvest-flow/contracts/ignition/modules/deploy_testnet_projects.ts to the address of the deployed factory contract address from the previous step.
2. If you have a test token on the testnet, set the `paymentTokenContractAddress` value in harvest-flow/contracts/ignition/modules/deploy_testnet_projects.ts to the address of the test token.
3. If you don't have a test token, you can deploy one if you leave the `paymentTokenContractAddress` value as undefinied. 
4. If you deploy a test token and want to send an initial amount to a test account, set the `testAccountAddress` value too. 
5. Set the `initParameters1` value to the desired value for the test project.
6. If everything is set up, run the following command: `npm run chain:deploy:testnet


