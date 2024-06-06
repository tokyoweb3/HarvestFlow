// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Arrays} from "@openzeppelin/contracts/utils/Arrays.sol";
import {Clones} from "@openzeppelin/contracts/proxy/Clones.sol";

import {TokTokNft} from "./TokTokNft.sol";

contract NftFactory {
    using Arrays for address[];
    using Arrays for uint256[];

    /// @notice Address of the TokTokNFT implementation contract
    address public nftImplementation;

    event NftDeployed(address nft);

    error InputLengthMismatch(uint256 nftsLength, uint256 tokenIdsLength);
    error InvalidZeroValue();

    constructor(address _nftImplementation) {
        if (_nftImplementation == address(0)) {
            revert InvalidZeroValue();
        }
        nftImplementation = _nftImplementation;
    }

    /// @notice Create and issue a new NFT contract.
    /// @param params.name Name of the ERC721
    /// @param params.symbol Symbol of the ERC721
    /// @param params.cap Total cap of tokens to be issued
    /// @param params.payableToken Address of the token used for payments
    /// @param params.price Price of one token (scaled to `payableToken` decimals)
    /// @param params.lendingAt Start time of the lending agreement (when claims can begin)
    /// @param params.yield Minimum params.fixed interest rate scaled to the 1e18
    /// @param params.lendingPeriod Duration of the lending agreement
    /// @param params.baseURI Base URI for the token
    /// @param params.owner Owner of the contract
    /// @param params.signerAddress Address of the signer for presale signatures
    /// @return Address of the new NFT contract.
    function deploy(TokTokNft.InitializationParams memory params) external returns (address) {
        if (
            params.cap == 0 || params.payableToken == address(0) || params.price == 0 || params.lendingAt == 0
                || params.yield == 0 || params.lendingPeriod == 0 || params.owner == address(0)
                || params.signerAddress == address(0)
        ) {
            revert InvalidZeroValue();
        }
        address nftClone = Clones.clone(nftImplementation);
        TokTokNft(nftClone).initialize(params);
        emit NftDeployed(nftClone);
        return nftClone;
    }

    /// @notice Claim all NFTs from the given addresses and token IDs. If an NFT is past maturity, redeem it.
    /// @param nfts Array of NFT addresses
    /// @param tokenIds Array of token IDs (one for each NFT address)
    function claimAll(address[] memory nfts, uint256[] memory tokenIds) external {
        uint256 nftsLength = nfts.length;
        if (nftsLength != tokenIds.length) {
            revert InputLengthMismatch(nftsLength, tokenIds.length);
        }

        uint256 i;
        while (i < nftsLength) {
            // Find the length of the current group of consecutive identical NFTs
            uint256 groupStart = i;
            while (i < nftsLength - 1 && nfts[i] == nfts[i + 1]) {
                i++;
            }

            // Length of the current group
            uint256 groupLength = i - groupStart + 1;

            if (groupLength > 1) {
                // If the group has more than one NFT, call claimAll/redeemAll on the group
                uint256[] memory groupTokenIds = new uint256[](groupLength);
                for (uint256 j = 0; j < groupLength; j++) {
                    groupTokenIds[j] = tokenIds[groupStart + j];
                }
                TokTokNft nft = TokTokNft(nfts[groupStart]);
                if (block.timestamp >= nft.maturity()) {
                    nft.redeemAll(groupTokenIds);
                } else {
                    nft.claimAll(groupTokenIds);
                }
            } else {
                // If the group has only one NFT, call claim/redeem on the single NFT
                TokTokNft nft = TokTokNft(nfts[groupStart]);
                if (block.timestamp >= nft.maturity()) {
                    nft.redeem(tokenIds[groupStart]);
                } else {
                    nft.claim(tokenIds[groupStart]);
                }
            }

            // Move to the next group
            i++;
        }
    }
}
