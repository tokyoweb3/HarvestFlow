import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

const factoryContractAddress = '0x004e062a1B77e7887db4f6E648773271Cf733ABA'; // Set the factory contract address here
const paymentTokenAddress = '0x5Fd03dD7Cb1171cc120fD86f3162283F9426E126'; // if you have a specific token address, you can set it here
const testAccountAddress = '0xC7894CC334A5D21a833CDe21B53d7Fd76B5D882D'; // if you want to send some tokens to your test account, you can set it here

export default buildModule('TokTokNftTestNet', m => {
  if (!factoryContractAddress) {
    throw new Error('Factory contract address is required');
  }
  const factory = m.contractAt('NftFactory', factoryContractAddress);
  let paymentToken = undefined;

  if (paymentTokenAddress) {
    console.log('Payment token address provided, using it');
    paymentToken = m.contractAt('MockERC20', paymentTokenAddress);
  } else {
    console.log('No payment token address provided, deploying a new one');
    paymentToken = m.contract('MockERC20', ['MockToken', 'MT', 100000000]);
  }

  // TODO: this would be better as a parameter with a comment
  // https://github.com/NomicFoundation/hardhat-ignition/issues/790#issuecomment-2282331735
  const leaseAt = '2024-08-15';
  const initParameters1 = {
    name: 'Cambodia TukTuk test vol.2', // @param name_ Name of the ERC1155
    symbol: 'CTT2', // @param symbol_ Symbol of the ERC1155
    cap: 1000, // @param cap_ Total cap of tokens to be issued
    payableToken: paymentToken, // @param payable_token_ Address of the token used for payments
    price: BigInt(200e18), // @param price_ Price of the token in the smallest unit
    lendingAt: Date.parse(leaseAt) / 1000, // @param lendingAt_ Start time of the lending agreement (when claims can begin)
    yield: BigInt(1e17), // 10% @param yield_ Minimum fixed interest rate scaled to the 1e18
    lendingPeriod: 60 * 60 * 24 * 365, // 1 year @param lending period
    baseURI: '', // @param uri_ Base URI for the token
    owner: m.getAccount(0), // @param owner_ Owner of the contract
    signerAddress: m.getAccount(0), // @param signer
  };

  // send MockToken to my test account if needed
  if (!paymentTokenAddress && testAccountAddress) {
    m.call(paymentToken, 'transfer', [testAccountAddress, 100_000_000_000_000_000_000_000n]);
  }

  const contract1 = m.call(factory, 'deploy', [initParameters1], { id: 'Deploy1' });
  const contract1Address = m.readEventArgument(contract1, 'NftDeployed', 'nft', { id: 'address1' });
  const nftContract1 = m.contractAt('TokTokNft', contract1Address, { id: 'Nft1' });

  contract1.dependencies.add(paymentToken);

  return { nftContract1 };
});
