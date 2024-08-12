import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

export default buildModule('TokTokNft', m => {
  const factory = m.contractAt('NftFactory', '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512');

  const mockToken = m.contract('MockERC20', ['MockToken', 'MT', 1000000]);

  // note: this breaks replayability of the deployment, but for localhost networks that's okay
  const time = new Date().getTime();
  const testTime = time - (time % 1000);

  const initParameters1 = {
    name: 'Cambodia TukTuk vol.1', // @param name_ Name of the ERC1155
    symbol: 'CTT1', // @param symbol_ Symbol of the ERC1155
    cap: 1000, // @param cap_ Total cap of tokens to be issued
    payableToken: mockToken, // @param payable_token_ Address of the token used for payments
    price: BigInt(200e18), // @param price_ Price of the token in the smallest unit
    lendingAt: (testTime + 10 * 60 * 1000) / 1000, // @param lendingAt_ Start time of the lending agreement (when claims can begin)
    yield: BigInt(1e17), // 10% @param yield_ Minimum fixed interest rate scaled to the 1e18
    // lendingPeriod: 60 * 60 * 24 * 365, // 1 year @param lending period
    lendingPeriod: 60 * 2,
    baseURI: '', // @param uri_ Base URI for the token
    owner: m.getAccount(0), // @param owner_ Owner of the contract
    signerAddress: m.getAccount(0), // @param signer
  };

  const initParameters2 = {
    name: 'Cambodia TukTuk vol.2(rapid)', // @param name_ Name of the ERC1155
    symbol: 'CTT2', // @param symbol_ Symbol of the ERC1155
    cap: 2000, // @param cap_ Total cap of tokens to be issued
    payableToken: mockToken, // @param payable_token_ Address of the token used for payments
    price: BigInt(400e18), // @param price_ Price of the token in the smallest unit
    lendingAt: Math.floor((testTime + 2 * 60 * 1000) / 1000) + 90, // @param lendingAt_ Start time of the lending agreement (when claims can begin)
    yield: BigInt(4e17), // 10% @param yield_ Minimum fixed interest rate scaled to the 1e18
    lendingPeriod: 60, // 1 year @param lending period
    baseURI: '', // @param uri_ Base URI for the token
    owner: m.getAccount(0), // @param owner_ Owner of the contract
    signerAddress: m.getAccount(0), // @param signer
  };

  // send ETH and MockToken to my test account
  m.send('SendingEth', '0xC7894CC334A5D21a833CDe21B53d7Fd76B5D882D', 1_000_000_000_000_000_000n);
  m.call(mockToken, 'transfer', [
    '0xC7894CC334A5D21a833CDe21B53d7Fd76B5D882D',
    100_000_000_000_000_000_000_000n,
  ]);

  const contract1 = m.call(factory, 'deploy', [initParameters1], { id: 'Deploy1' });
  const contract1Address = m.readEventArgument(contract1, 'NftDeployed', 'nft', { id: 'address1' });
  const nftContract1 = m.contractAt('TokTokNft', contract1Address, { id: 'Nft1' });

  const contract2 = m.call(factory, 'deploy', [initParameters2], { id: 'Deploy2' });
  const contract2Address = m.readEventArgument(contract2, 'NftDeployed', 'nft', { id: 'address2' });
  const nftContract2 = m.contractAt('TokTokNft', contract2Address, { id: 'Nft2' });

  contract1.dependencies.add(mockToken);
  contract2.dependencies.add(mockToken);

  // send mock token to contracts for the repayments
  m.call(mockToken, 'transfer', [contract1Address, 100_000_000_000_000_000_000_000n], {
    id: 'Mock_token_to_contract1',
  });
  m.call(mockToken, 'transfer', [contract2Address, 100_000_000_000_000_000_000_000n], {
    id: 'Mock_token_to_contract2',
  });

  // activate contract1
  const activate1 = m.call(nftContract1, 'activate', []);
  const publicSale1 = m.call(nftContract1, 'setPublicsale', [true]);

  // activate contract2
  const activate2 = m.call(nftContract2, 'activate', []);
  const publicSale2 = m.call(nftContract2, 'setPublicsale', [true]);

  activate1.dependencies.add(nftContract1);
  publicSale1.dependencies.add(activate1);

  activate2.dependencies.add(nftContract2);
  publicSale2.dependencies.add(activate2);

  return { factory };
});
