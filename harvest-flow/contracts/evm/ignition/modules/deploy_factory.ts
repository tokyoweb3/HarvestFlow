import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule('TokTokNftFactory', m => {
  // https://github.com/NomicFoundation/hardhat-ignition/issues/673
  const tokTokNftContract = m.contract("TokTokNft", []);

  const factory = m.contract("NftFactory", [tokTokNftContract]);

  factory.dependencies.add(tokTokNftContract);

  return { factory };
});
