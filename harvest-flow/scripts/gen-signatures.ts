import { ethers } from 'ethers';

type UserWallet = string;
type SignatureInfo = {
  amount: number;
  signature: string;
};

async function signMintData(wallet: ethers.Wallet, values: { address: string; amount: number }[]) {
  const signatures: Record<UserWallet, SignatureInfo> = {};

  for (let i = 0; i < values.length; i++) {
    const { address, amount } = values[i];

    const hash = ethers.solidityPackedKeccak256(
      ['address', 'uint256'],
      [address.toLowerCase(), amount]
    );

    const signature = await wallet.signingKey.sign(ethers.getBytes(hash));
    signatures[address.toLowerCase()] = {
      amount,
      signature: signature.serialized,
    };
  }

  return signatures;
}

async function main() {
  if (!process.env.PRESALE_KEY) {
    console.error(
      'DANGER. WARNING: PRESALE_KEY env not set. Using hardhat network key as the default'
    );
  }
  /**
   * Replace with your private key
   * DANGER: every new NFT contract requires a different private key to avoid replay attacks
   * If you want all these keys to be managed by a single mnemonic, you can use an HD wallet with different accounts
   * Note: MetaMask supports importing/exporting private keys from your wallet in case you want to connect this wallet to MetaMask
   */
  const privateKey =
    process.env.PRESALE_KEY ?? '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'; // hardhat private key 0
  const wallet = new ethers.Wallet(privateKey);

  // Replace this with the addresses relevant for the presale
  const values = [
    {
      address: '0xcA42796111C79B49cF9C2fc5491c68Bf29Aa0F10', // Harvest flow production address
      amount: 1,
    },
    {
      address: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', // hardhat address 0
      amount: 2,
    },
  ];

  const signatures = await signMintData(wallet, values);

  console.log(signatures);
}

main().catch(console.error);
