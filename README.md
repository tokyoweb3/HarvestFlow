# HarvestFlow

## Development
To run the app in development environment with local chain, navigate to `harvest-flow` and run the following commands:

1. Initialize the project: `npm run initialize`
2. Start the local chain: `npm run chain:start`
3. Deploy the factory contract and Nft template: `npm run chain:deploy`
4. Deploy test project to the local chain: `npm run chain:deploy:localhost`

While referencing values found in `harvest-flow/contracts/ignition/deployments/{chainId}/deployed_addresses.json`

5. Set the following environment variables in `.env.localhost`:
    - `TOKTOK_NFT_FACTORY_CONTRACT_ADDRESS` - address of the factory contract
    - `PAYMENT_TOKEN_CONTRACT_ADDRESS` - address of the NFT template

While using the data obtained from https://ops.cloud-gms.com/operation/ in the user information section

6. Set the following envs in your `.env.localhost`
- GMS_CLOUD_CLIENT_ID
- GMS_CLOUD_CLIENT_SECRET


7. In the root folder `extensions.yml` change every `contractAddress` to the address of the deployed factory contract address
7. Follow the Paima Engine backend setup steps: [docs](https://docs.paimastudios.com/home/setup/how-to-use-paima-engine#tldr)
7. Start the frontend: navigate to `harvest-flow/frontend` and run `npm run start`

## Deploy smart contracts to the testnet
First run `npm run initialize` if you haven't already.

To deploy the smart contracts to the testnet, make a copy of `.env.localhost` and name it `.env.testnet`. Set the following environment variables:
 - All variables in the CHAIN Data section
 - DEPLOYER_PRIVATE_KEY

### Deploying the factory contract and NFT template

1. Navigate to `harvest-flow`
2. Set the network you want to use (ex: `export NETWORK=testnet`)
3. Run `npm run chain:deploy`
That will deploy the factory contract and NFT template to the testnet. The addresses of the deployed contracts addresses will be saved in `harvest-flow/contracts/ignition/deployments/{chainId}/deployed_addresses.json`

When you have the factory contract address,
1. Set it to the `.env.testnet` file as `TOKTOK_NFT_FACTORY_CONTRACT_ADDRESS`.
2. Set this address in the `extensions.yml` file in the root folder as contractAddress.

### Deploying the test project

1. Set the `factoryContractAddress` value in harvest-flow/contracts/ignition/modules/deploy_testnet_projects.ts to the address of the deployed factory contract address from the previous step.
2. If you have a test token on the testnet, set the `paymentTokenContractAddress` value in harvest-flow/contracts/ignition/modules/deploy_testnet_projects.ts to the address of the test token.
3. If you don't have a test token, you can deploy one if you leave the `paymentTokenContractAddress` value as undefined. 
4. If you deploy a test token and want to send an initial amount to a test account, set the `testAccountAddress` value too. 
5. Set the `initParameters1` value to the desired value for the test project.
6. If everything is set up, run the following command: `npm run chain:deploy:testnet

### Verifying contracts

1. Get a Polyscan api key [here](https://docs.polygonscan.com/getting-started/viewing-api-usage-statistics)
2. Place your API key as `POLYGONSCAN_API_KEY` in the corresponding `.env` (ex: `.env.testnet` for Polygon Amoy)
1. Run `npx hardhat ignition verify chain-80002` after deploying the contracts (where `chain-${id}` is the network whose contracts you're verifying)