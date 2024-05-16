import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';
import {Bytecode} from "hardhat/internal/hardhat-network/stack-traces/model";

export default buildModule('TokTokNft', m => {
    const mockToken = m.contract('MockERC20', ['MockToken', 'MT', 1000000]);

    // https://github.com/NomicFoundation/hardhat-ignition/issues/673
    const tokTokNftContract = m.contract('TokTokNft',
      [
              "Cambodia TukTuk vol.1", // @param name_ Name of the ERC1155
              "CTT1",// @param symbol_ Symbol of the ERC1155
              1000,// @param cap_ Total cap of tokens to be issued
              mockToken,// @param payable_token_ Address of the token used for payments
              BigInt(200e18),// @param price_ Price of the token in the smallest unit
              Date.parse("2024-06-01") / 1000,// @param lendingAt_ Start time of the lending agreement (when claims can begin)
              BigInt(1e17), // 10% @param yield_ Minimum fixed interest rate scaled to the 1e18
              1000 * 60 * 60 * 24 * 365,// 1 year @param lending period
              "",// @param uri_ Base URI for the token
              m.getAccount(0), // @param owner_ Owner of the contract
              m.getAccount(0)// @param signer
      ]);

    //activate the contract
    const activate = m.call(tokTokNftContract, "activate", []);
    const publicSale = m.call(tokTokNftContract, "setPublicsale", [true]);

    // send ETH and MockToken to my test account
    m.send("SendingEth", "0xC7894CC334A5D21a833CDe21B53d7Fd76B5D882D", 1_000_000_000_000_000_000n);
    m.call(mockToken, "transfer", ["0xC7894CC334A5D21a833CDe21B53d7Fd76B5D882D", 100_000_000_000_000_000_000_000n]);

    tokTokNftContract.dependencies.add(mockToken);
    return { tokTokNftContract };
});
