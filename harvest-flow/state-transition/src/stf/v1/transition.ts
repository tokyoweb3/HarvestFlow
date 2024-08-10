import type { SQLUpdate } from '@paima/node-sdk/db';
import { createScheduledData } from '@paima/node-sdk/db';
import {
  persistContractActivation,
  persistNewNftContract,
  updateMintedAmount,
} from './persist/contract';
import type {
  CalcPointsInput,
  ClaimedInput,
  ContractActivatedInput,
  ContractDeployedInput,
  NftMintedInput,
  RedeemedInput,
} from './types';
import { saveEventToHistory } from './persist/history';
import { Block, ethers } from 'ethers';
import type { BlockHeader } from '@paima/sdk/utils';
import { ENV } from '@paima/sdk/utils';
import {
  persistTokenOwnership,
  updateClaimedYieldAmount,
  updateTokenRedeemed,
} from './persist/tokens';
import { NftHistoryEventType } from '@harvest-flow/utils';
import { addUserPoints } from './persist/points';
import type { Pool } from 'pg';
import { getActiveTokensByUsersAndContract, getContract } from '@harvest-flow/db';
import { PARSER_KEYS } from './constants';
import { PrecompileNames } from '@harvest-flow/precompiles';
// TODO: remove once Temporal is standardized into TC39
import { Temporal } from 'temporal-polyfill';

const chainId = process.env.CHAIN_ID!;
const provider = new ethers.JsonRpcProvider(ENV.CHAIN_URI);

export const contractActivated = async (
  input: ContractActivatedInput,
  contractAddress: string
): Promise<SQLUpdate[]> => {
  console.log(`Contract ${contractAddress} activated on chain ${chainId}`);

  const persistActivation = persistContractActivation(chainId, contractAddress);
  return [persistActivation];
};

export const contractDeployed = async (input: ContractDeployedInput): Promise<SQLUpdate[]> => {
  console.log(`Contract ${input.nftAddress} deployed`);

  const abi = [
    'function name() public view returns (string)',
    'function symbol() public view returns (string)',
    'function cap() public view returns (uint256)',
    'function baseURI() public view returns (string)',
    'function payableToken() public view returns (address)',
    'function lendingAt() public view returns (uint256)',
    'function yield() public view returns (uint256)',
    'function maturity() public view returns (uint256)',
    'function publicPrice() public view returns (uint256)',
    'function owner() public view returns (address)',
    'function signerAddress() public view returns (address)',
    'function isPresale() public view returns (bool)',
    'function isPublicsale() public view returns (bool)',
  ];

  const contract = new ethers.Contract(input.nftAddress, abi, provider);

  const [
    name,
    symbol,
    cap,
    baseURI,
    payableToken,
    lendingAt,
    yieldRate,
    maturity,
    price,
    owner,
    signerAddress,
    isPresale,
    isPublicsale,
  ] = await Promise.all([
    contract.name(),
    contract.symbol(),
    contract.cap(),
    contract.baseURI(),
    contract.payableToken(),
    contract.lendingAt(),
    contract.yield(),
    contract.maturity(), // params.lendingAt + params.lendingPeriod
    contract.publicPrice(),
    contract.owner(),
    contract.signerAddress(),
    contract.isPresale(),
    contract.isPublicsale(),
  ]);

  return [
    persistNewNftContract({
      chainId: chainId,
      contractAddress: input.nftAddress,
      name: name,
      symbol: symbol,
      cap: cap,
      baseURI: baseURI,
      payableToken: payableToken,
      lendingAt: new Date(Number(lendingAt) * 1000),
      yieldRate: yieldRate,
      maturity: new Date(Number(maturity) * 1000),
      publicPrice: price,
      owner,
      signerAddress,
      isPresale,
      isPublicsale,
    }),
  ];
};

export const nftMinted = async (
  input: NftMintedInput,
  contractAddress: string,
  transactionHash: string,
  blockHeader: BlockHeader,
  dbConn: Pool
): Promise<SQLUpdate[]> => {
  console.log(
    `NFT from ${input.startTokenId} to ${input.startTokenId + input.amount} minted for contract ${contractAddress} on chain ${chainId} for ${input.receiver} with cost ${input.cost}`
  );

  const persistOwnerShips: SQLUpdate[] = [];
  const persistMintEvents: SQLUpdate[] = [];

  const pricePerToken = input.cost / input.amount;

  for (let i = 0; i < input.amount; i++) {
    const tokenId = input.startTokenId + BigInt(i);
    const persistOwnerShip = persistTokenOwnership(
      chainId,
      contractAddress,
      tokenId,
      input.receiver
    );
    persistOwnerShips.push(persistOwnerShip);

    const persistTransaction = saveEventToHistory(
      NftHistoryEventType.MINT,
      chainId,
      contractAddress,
      tokenId,
      pricePerToken,
      new Date(1000 * blockHeader.timestamp),
      transactionHash
    );
    persistMintEvents.push(persistTransaction);
  }

  const persistUpdateMintedAmount = updateMintedAmount(chainId, contractAddress, input.amount);

  const pointsForMinting =
    Number(ethers.formatEther(BigInt(await getNftPrice(contractAddress, dbConn)) * input.amount)) *
    0.5;
  const addPointsForMinting = addUserPoints(input.receiver, pointsForMinting);

  return [
    persistUpdateMintedAmount,
    ...persistOwnerShips,
    ...persistMintEvents,
    addPointsForMinting,
  ];
};

export const interestClaimed = async (
  input: ClaimedInput,
  contractAddress: string,
  transactionHash: string,
  blockHeader: BlockHeader
): Promise<SQLUpdate[]> => {
  console.log(
    `Interest claimed for NFT ${input.tokenId} on chain ${chainId} for ${input.receiver} with amount ${input.amount}`
  );

  const persistTransaction = saveEventToHistory(
    NftHistoryEventType.CLAIM,
    chainId,
    contractAddress,
    input.tokenId,
    input.amount,
    new Date(1000 * blockHeader.timestamp),
    transactionHash
  );
  const updateClaimedYield = updateClaimedYieldAmount(
    chainId,
    contractAddress,
    input.tokenId,
    input.amount
  );

  return [persistTransaction, updateClaimedYield];
};

export const principalRedeemed = async (
  input: RedeemedInput,
  contractAddress: string,
  transactionHash: string,
  blockHeader: BlockHeader
): Promise<SQLUpdate[]> => {
  console.log(
    `Principal redeemed for NFT ${input.tokenId} on chain ${chainId} for ${input.receiver} with amount ${input.amount}`
  );

  return [
    saveEventToHistory(
      NftHistoryEventType.REDEEM,
      chainId,
      contractAddress,
      input.tokenId,
      input.amount,
      new Date(1000 * blockHeader.timestamp),
      transactionHash
    ),
    updateTokenRedeemed(chainId, contractAddress, input.tokenId),
  ];
};

export const calculateDailyPoints = async (
  input: CalcPointsInput,
  dbConn: Pool,
  blockHeader: BlockHeader
): Promise<SQLUpdate[]> => {
  console.log(`Calculating points`);

  const persistNextCalculation = createScheduledData(
    `${PARSER_KEYS.calcPoints}|${blockHeader.timestamp}`,
    await getNextMidnightBlockHeight(blockHeader),
    PrecompileNames.PointsCalculation
  );

  if (input.lastCalculationTimestamp === 0) {
    // this is the first time this runs when the app starts
    // all we really wanted was to schedule the next call, so we can return early
    // see https://github.com/PaimaStudios/paima-engine/issues/414
    return [];
  }

  const pointsByUsers = await getDailyPointsByUsers(
    new Date(input.lastCalculationTimestamp),
    new Date(blockHeader.timestamp),
    dbConn
  );
  const persistUsersPoints = [...pointsByUsers].map(([user, points]) =>
    addUserPoints(user, points)
  );

  return [persistNextCalculation, ...persistUsersPoints];
};

async function getNftPrice(contractAddress: string, dbConn: Pool) {
  const getContractDataResult = await getContract.run(
    { address: contractAddress.toLowerCase(), chain_id: chainId },
    dbConn
  );

  if (getContractDataResult.length !== 0) {
    return getContractDataResult[0].price;
  } else {
    throw new Error(`Contract not found: ${contractAddress}`);
  }
}

async function getNextMidnightBlockHeight(blockHeader: BlockHeader): Promise<number> {
  // next execution will be next day at midnight JST

  const midnightTimestamp = Temporal.Instant.fromEpochMilliseconds(blockHeader.timestamp * 1000)
    .toZonedDateTimeISO('Asia/Tokyo')
    .add({ days: 1 })
    .startOfDay().epochMilliseconds;
  const nextExecutionTimestamp = midnightTimestamp / 1000;
  const remainingTime = nextExecutionTimestamp - blockHeader.timestamp;

  // DANGER: ENV.BLOCK_TIME is just an APPROXIMATE
  //         Most chains like Polygon have no fixed block time
  //         So this can be off from the real value by sometimes more than 10%
  //         This is okay because `getDailyPointsByUsers` doesn't depend on this being exactly 24hrs
  const remainingBlocks = (remainingTime / ENV.BLOCK_TIME) >> 0;

  return blockHeader.blockHeight + remainingBlocks;
}

async function getDailyPointsByUsers(
  lastCalculationTimestamp: Date,
  currentReferenceTimestamp: Date,
  dbConn: Pool
): Promise<Map<string, number>> {
  const usersPoints = new Map<string, number>();

  const getTokensByUsersAndContractResult = await getActiveTokensByUsersAndContract.run(
    void {},
    dbConn
  );

  for (const token of getTokensByUsersAndContractResult) {
    const lendingPeriod = token.lease_end.getTime() - token.lease_start.getTime();
    const pointsForHold = Number(ethers.formatEther(token.price)) * 0.5;
    const currentPeriodStart = Math.max(
      token.lease_start.getTime(),
      lastCalculationTimestamp.getTime()
    );
    const currentPeriodEnd = Math.min(
      token.lease_end.getTime(),
      currentReferenceTimestamp.getTime()
    );
    let currentPeriod = currentPeriodEnd - currentPeriodStart;
    if (currentPeriod < 0) {
      currentPeriod = 0;
    }

    const points = ((token.token_ids?.length ?? 0) * pointsForHold * currentPeriod) / lendingPeriod;

    if (usersPoints.has(token.owner_address)) {
      usersPoints.set(token.owner_address, usersPoints.get(token.owner_address)! + points);
    } else {
      usersPoints.set(token.owner_address, points);
    }
  }

  return usersPoints;
}
