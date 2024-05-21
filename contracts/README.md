## HarvestFlow contracts

Implemented with [Foundry](https://book.getfoundry.sh/).

### Usage

Install dependencies with:

```shell
npm i
```

Create `.env` file from `.env.example` and fill with values.

### Deployment

Deploy to an EVM chain of your choice based on `RPC_URL` provided in `.env`.

This will also verify the contract on Etherscan-like explorer with `ETHERSCAN_API_KEY` provided in `.env.`. If verifying on non Etherscan-like explorer, refer to [Verification Options](https://book.getfoundry.sh/reference/forge/forge-script#verification-options) and update the deployment script accordingly.

```shell
npm run deploy
```

### Run local chain and deploy to it

```shell
anvil
```

```shell
npm run deploy:local
```

### Run tests

```shell
npm run test
```

### Run formatter

```shell
npm run format
```
