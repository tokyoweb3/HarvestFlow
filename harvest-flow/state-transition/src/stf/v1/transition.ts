import type { SQLUpdate } from '@paima/node-sdk/db';
import { createScheduledData } from '@paima/node-sdk/db';
import {
  persistBaseUriChanged,
  persistContractActivation,
  persistNewNftContract,
  persistPresalePriceChanged,
  persistPresaleStatusChanged,
  persistPublicsalePriceChanged,
  persistPublicsaleStatusChanged,
  updateMintedAmount,
} from './persist/contract';
import type {
  BaseUriInput,
  CalcPointsInput,
  ClaimedInput,
  ContractActivatedInput,
  ContractDeployedInput,
  NftMintedInput,
  PresalePriceInput,
  PresaleStatusInput,
  PublicsalePriceInput,
  PublicsaleStatusInput,
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

const provider = new ethers.JsonRpcProvider(ENV.CHAIN_URI);

export const contractActivated = async (
  input: ContractActivatedInput,
  caip2: string,
  contractAddress: string
): Promise<SQLUpdate[]> => {
  console.log(`Contract ${contractAddress} activated on chain ${caip2}`);

  const persistActivation = persistContractActivation(caip2, contractAddress);
  return [persistActivation];
};

export const baseUriChanged = async (
  input: BaseUriInput,
  caip2: string,
  contractAddress: string
): Promise<SQLUpdate[]> => {
  console.log(`Contract ${contractAddress} baseURI changed on chain ${caip2}`);

  const persistActivation = persistBaseUriChanged(caip2, contractAddress, input.newBaseURI);
  return [persistActivation];
};

export const presaleStatusChanged = async (
  input: PresaleStatusInput,
  caip2: string,
  contractAddress: string
): Promise<SQLUpdate[]> => {
  console.log(`Contract ${contractAddress} presale status changed on chain ${caip2}`);

  const persistActivation = persistPresaleStatusChanged(caip2, contractAddress, input.newValue);
  return [persistActivation];
};

export const presalePriceChanged = async (
  input: PresalePriceInput,
  caip2: string,
  contractAddress: string
): Promise<SQLUpdate[]> => {
  console.log(`Contract ${contractAddress} presale price changed on chain ${caip2}`);

  const persistActivation = persistPresalePriceChanged(caip2, contractAddress, input.newPrice);
  return [persistActivation];
};

export const publicsaleStatusChanged = async (
  input: PublicsaleStatusInput,
  caip2: string,
  contractAddress: string
): Promise<SQLUpdate[]> => {
  console.log(`Contract ${contractAddress} publicsale status changed on chain ${caip2}`);

  const persistActivation = persistPublicsaleStatusChanged(caip2, contractAddress, input.newValue);
  return [persistActivation];
};

export const publicsalePriceChanged = async (
  input: PublicsalePriceInput,
  caip2: string,
  contractAddress: string
): Promise<SQLUpdate[]> => {
  console.log(`Contract ${contractAddress} publicsale status changed on chain ${caip2}`);

  const persistActivation = persistPublicsalePriceChanged(caip2, contractAddress, input.newPrice);
  return [persistActivation];
};

export const contractDeployed = async (
  input: ContractDeployedInput,
  caip2: string,
  blockHeader: BlockHeader
): Promise<SQLUpdate[]> => {
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
    'function presalePrice() public view returns (uint256)',
    'function publicPrice() public view returns (uint256)',
    'function owner() public view returns (address)',
    'function signerAddress() public view returns (address)',
    'function isPresale() public view returns (bool)',
    'function isPublicsale() public view returns (bool)',
  ];

  const contract = new ethers.Contract(input.nftAddress, abi, provider);

  // to ensure determinism, we have to ensure we're getting the data at a specific block, even when resyncing
  const blockTag = { blockTag: blockHeader.blockHeight };
  const [
    name,
    symbol,
    cap,
    baseURI,
    payableToken,
    lendingAt,
    yieldRate,
    maturity,
    presalePrice,
    publicPrice,
    owner,
    signerAddress,
    isPresale,
    isPublicsale,
  ] = await Promise.all([
    contract.name(blockTag),
    contract.symbol(blockTag),
    contract.cap(blockTag),
    contract.baseURI(blockTag),
    contract.payableToken(blockTag),
    contract.lendingAt(blockTag),
    contract.yield(blockTag),
    contract.maturity(blockTag), // recall: maturity = params.lendingAt + params.lendingPeriod
    contract.presalePrice(blockTag),
    contract.publicPrice(blockTag),
    contract.owner(blockTag),
    contract.signerAddress(blockTag),
    contract.isPresale(blockTag),
    contract.isPublicsale(blockTag),
  ]);

  return [
    persistNewNftContract({
      chainId: caip2,
      contractAddress: input.nftAddress,
      name: name,
      symbol: symbol,
      cap: cap,
      baseURI: baseURI,
      payableToken: payableToken,
      lendingAt: new Date(Number(lendingAt) * 1000),
      yieldRate: yieldRate,
      maturity: new Date(Number(maturity) * 1000),
      presalePrice: presalePrice,
      publicsalePrice: publicPrice,
      owner,
      signerAddress,
      isPresale,
      isPublicsale,
    }),
  ];
};

export const nftMinted = async (
  input: NftMintedInput,
  caip2: string,
  contractAddress: string,
  evmTxHash: string,
  paimaTxHash: string,
  blockHeader: BlockHeader,
  dbConn: Pool
): Promise<SQLUpdate[]> => {
  console.log(
    `NFT from ${input.startTokenId} to ${input.startTokenId + input.amount} minted for contract ${contractAddress} on chain ${caip2} for ${input.receiver} with cost ${input.cost}`
  );

  const persistOwnerShips: SQLUpdate[] = [];
  const persistMintEvents: SQLUpdate[] = [];

  const pricePerToken = input.cost / input.amount;

  for (let i = 0; i < input.amount; i++) {
    const tokenId = input.startTokenId + BigInt(i);
    const persistOwnerShip = persistTokenOwnership(caip2, contractAddress, tokenId, input.receiver);
    persistOwnerShips.push(persistOwnerShip);

    const persistTransaction = saveEventToHistory(
      NftHistoryEventType.MINT,
      caip2,
      input.receiver,
      contractAddress,
      tokenId,
      pricePerToken,
      new Date(1000 * blockHeader.timestamp),
      evmTxHash,
      paimaTxHash
    );
    persistMintEvents.push(persistTransaction);
  }

  const persistUpdateMintedAmount = updateMintedAmount(caip2, contractAddress, input.amount);

  const pointsForMinting = Number(ethers.formatEther(input.cost)) * 0.5;
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
  caip2: string,
  contractAddress: string,
  evmTxHash: string,
  paimaTxHash: string,
  blockHeader: BlockHeader
): Promise<SQLUpdate[]> => {
  console.log(
    `Interest claimed for NFT ${input.tokenId} on chain ${caip2} for ${input.receiver} with amount ${input.amount}`
  );

  const persistTransaction = saveEventToHistory(
    NftHistoryEventType.CLAIM,
    caip2,
    contractAddress,
    input.receiver,
    input.tokenId,
    input.amount,
    new Date(1000 * blockHeader.timestamp),
    evmTxHash,
    paimaTxHash
  );
  const updateClaimedYield = updateClaimedYieldAmount(
    caip2,
    contractAddress,
    input.tokenId,
    input.amount
  );

  return [persistTransaction, updateClaimedYield];
};

export const principalRedeemed = async (
  input: RedeemedInput,
  caip2: string,
  contractAddress: string,
  evmTxHash: string,
  paimaTxHash: string,
  blockHeader: BlockHeader
): Promise<SQLUpdate[]> => {
  console.log(
    `Principal redeemed for NFT ${input.tokenId} on chain ${caip2} for ${input.receiver} with amount ${input.amount}`
  );

  return [
    saveEventToHistory(
      NftHistoryEventType.REDEEM,
      caip2,
      contractAddress,
      input.receiver,
      input.tokenId,
      input.amount,
      new Date(1000 * blockHeader.timestamp),
      evmTxHash,
      paimaTxHash
    ),
    updateTokenRedeemed(caip2, contractAddress, input.tokenId),
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
    getNextMidnightBlockHeight(blockHeader),
    PrecompileNames.PointsCalculation
  );

  if (input.lastCalculationTimestamp === 0) {
    // this is the first time this runs when the app starts
    // all we really wanted was to schedule the next call, so we can return early
    // see https://github.com/PaimaStudios/paima-engine/issues/414
    return [persistNextCalculation];
  }

  const pointsByUsers = await getDailyPointsByUsers(
    new Date(input.lastCalculationTimestamp * 1000),
    new Date(blockHeader.timestamp * 1000),
    dbConn
  );
  const persistUsersPoints = [...pointsByUsers].map(([user, points]) =>
    addUserPoints(user, points)
  );

  return [persistNextCalculation, ...persistUsersPoints];
};

function getNextMidnightBlockHeight(blockHeader: BlockHeader): number {
  // next execution will be next day at midnight JST

  const midnightTimestamp = Temporal.Instant.fromEpochMilliseconds(blockHeader.timestamp * 1000)
    .toZonedDateTimeISO('Asia/Tokyo')
    .add({ days: 1 })
    .startOfDay()
    // .add({ minutes: 1 })
    .epochMilliseconds;
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

    // TODO: should this instead calculate points based on how long you held the NFT and not the full lease period?
    //       if you're transferring the underlying collateral, it feels like the points should be carried over as well
    //       but maybe some users won't be expecting their points to drop even if they sell their NFT before it matures
    const pointsForHold = Number(ethers.formatEther(token.amount)) * 0.5;

    const getTokenIds = (() => {
      if (token.token_ids == null) return [];
      // this shouldn't happen, but for some reason the database returns "{1,2,3}"
      if (typeof token.token_ids === 'string') {
        return JSON.parse((token.token_ids as string).replace('{', '[').replace('}', ']'));
      }
      return token.token_ids;
    })();

    const points = (getTokenIds.length * pointsForHold * currentPeriod) / lendingPeriod;
    if (usersPoints.has(token.nft_owner)) {
      usersPoints.set(token.nft_owner, usersPoints.get(token.nft_owner)! + points);
    } else {
      usersPoints.set(token.nft_owner, points);
    }
  }

  return usersPoints;
}
