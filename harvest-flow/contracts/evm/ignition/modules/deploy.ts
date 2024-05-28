import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule('TokTokNft', m => {
    const mockToken = m.contract('MockERC20', ['MockToken', 'MT', 1000000]);


  // https://github.com/NomicFoundation/hardhat-ignition/issues/673
  const tokTokNftContract = m.contract("TokTokNft", []);

  const factory = m.contract("NftFactory", [tokTokNftContract]);

  const initParameters1 = {
    name: "Cambodia TukTuk vol.1", // @param name_ Name of the ERC1155
    symbol: "CTT1",// @param symbol_ Symbol of the ERC1155
    cap: 1000,// @param cap_ Total cap of tokens to be issued
    payableToken: mockToken,// @param payable_token_ Address of the token used for payments
    price: BigInt(200e18),// @param price_ Price of the token in the smallest unit
    lendingAt: Date.parse("2024-06-01") / 1000,// @param lendingAt_ Start time of the lending agreement (when claims can begin)
    yield: BigInt(1e17), // 10% @param yield_ Minimum fixed interest rate scaled to the 1e18
    lendingPeriod:  60 * 60 * 24 * 365,// 1 year @param lending period
    baseURI: "",// @param uri_ Base URI for the token
    owner: m.getAccount(0), // @param owner_ Owner of the contract
    signerAddress: m.getAccount(0)// @param signer
  };

  const initParameters2 = {
    name: "Cambodia TukTuk vol.2", // @param name_ Name of the ERC1155
    symbol: "CTT2",// @param symbol_ Symbol of the ERC1155
    cap: 2000,// @param cap_ Total cap of tokens to be issued
    payableToken: mockToken,// @param payable_token_ Address of the token used for payments
    price: BigInt(400e18),// @param price_ Price of the token in the smallest unit
    lendingAt: Math.floor(Date.now() / 1000)+ 60 * 2,// @param lendingAt_ Start time of the lending agreement (when claims can begin)
    yield: BigInt(4e17), // 10% @param yield_ Minimum fixed interest rate scaled to the 1e18
    lendingPeriod:  120,// 1 year @param lending period
    baseURI: "",// @param uri_ Base URI for the token
    owner: m.getAccount(0), // @param owner_ Owner of the contract
    signerAddress: m.getAccount(0)// @param signer
  };


  // send ETH and MockToken to my test account
    m.send("SendingEth", "0xC7894CC334A5D21a833CDe21B53d7Fd76B5D882D", 1_000_000_000_000_000_000n);
    m.call(mockToken, "transfer", ["0xC7894CC334A5D21a833CDe21B53d7Fd76B5D882D", 100_000_000_000_000_000_000_000n]);

    tokTokNftContract.dependencies.add(mockToken);
  factory.dependencies.add(tokTokNftContract);

  const contract1 = m.call(factory, "deploy", [initParameters1], { id: "Deploy1" });
  const contract1Address = m.readEventArgument(contract1, "NftDeployed", "nft", { id: "address1" });
  const nftContract1 = m.contractAt("TokTokNft", contract1Address, {id: "Nft1" });

  const contract2 = m.call(factory, "deploy", [initParameters2], { id: "Deploy2" });
  const contract2Address = m.readEventArgument(contract2, "NftDeployed", "nft", { id: "address2" });
  const nftContract2 = m.contractAt("TokTokNft", contract2Address, {id: "Nft2" });


  // activate contract1
  const activate1 = m.call(nftContract1, "activate", []);
  const publicSale1 = m.call(nftContract1, "setPublicsale", [true]);

  //activate contract2
  const activate2 = m.call(nftContract2, "activate", []);
  const publicSale2 = m.call(nftContract2, "setPublicsale", [true]);

  activate1.dependencies.add(nftContract1);
  publicSale1.dependencies.add(activate1);

  activate2.dependencies.add(nftContract2);
  publicSale2.dependencies.add(activate2);

  return { factory };
});
