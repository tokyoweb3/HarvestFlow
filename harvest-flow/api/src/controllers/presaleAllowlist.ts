import { Get, Query, Route, Response } from 'tsoa';
import { Controller } from '@tsoa/runtime';
import { StatusCodes } from 'http-status-codes';
import type { InternalServerErrorResult, ValidateErrorResult } from '@paima/sdk/utils';
import { getTotalMinted, requirePool } from '@harvest-flow/db';
import type { PresaleParticipation, SignatureInfo } from '@harvest-flow/utils';

/**
 * Mapping of <contract address, <userWallet, amount>>
 */

type ContractAddress = string;
type UserWallet = string;

type PresaleInfo = Record<ContractAddress, Record<UserWallet, SignatureInfo>>;
const presaleList: PresaleInfo = {
  // localhost mock nft address
  '0xcafac3dd18ac6c6e92c921884f9e4176737c052c': {
    '0xca42796111c79b49cf9c2fc5491c68bf29aa0f10': {
      amount: 1,
      signature:
        '0x30c40fabc8512d11c75d86aab58fd9cdf57ae35492799fae4b4616aa80d5396f74a8ec42d1ab1eaba0c67934b64052481ca7a593ebdb094393127a0b79faa4b41b',
    },
    '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266': {
      amount: 2,
      signature:
        '0xb3198d426d5aecc4f1436045b88e66d1b833f6afa8eb451cc66e2c45879ed66b431c16d62ecaab96ed5302f73ca52f5daa8edb053471ae9fc64a58485715e2291b',
    },
  },
};

@Route('presale')
export class PresaleController extends Controller {
  @Response<InternalServerErrorResult>(StatusCodes.INTERNAL_SERVER_ERROR)
  @Response<ValidateErrorResult>(StatusCodes.UNPROCESSABLE_ENTITY)
  @Get()
  public async forAddress(
    @Query() contractAddress: string,
    @Query() userAddress: string
  ): Promise<PresaleParticipation> {
    const pool = requirePool();

    const buyable =
      presaleList[contractAddress.toLowerCase()]?.[userAddress.toLowerCase()] ?? undefined;

    const [amountBought] = await getTotalMinted.run(
      {
        minter_address: userAddress.toLowerCase(),
        contract_address: contractAddress.toLowerCase(),
      },
      pool
    );
    return {
      amountBought:
        amountBought.total_minted == null ? 0 : Number.parseInt(amountBought.total_minted),
      buyable,
    };
  }
}
