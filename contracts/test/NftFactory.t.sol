// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "forge-std/Test.sol";

import {NftFactory} from "../src/NftFactory.sol";
import {TokTokNft} from "../src/TokTokNft.sol";

import {MockERC20} from "./mocks/MockERC20.sol";

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract NftFactoryTest is Test {
    NftFactory factory;

    uint256 payableTokenSupply = 100_000_000;
    string name = "TokTokNft";
    string symbol = "TOK";
    uint256 cap = 1000;
    ERC20 payableToken;
    uint256 price = 1 ether;
    uint256 lendingAt = 100;
    uint256 yield = 0.1 ether;
    uint256 lendingPeriod = 365 days;
    string uri = "https://token-cdn-domain/{id}.json";
    address owner = address(this);
    address signerAddress;
    uint256 signerPk;

    address[] nfts;
    uint256[] tokenIds;

    receive() external payable {}

    function setUp() public {
        (signerAddress, signerPk) = makeAddrAndKey("signer");
        payableToken = new MockERC20("MockERC20", "MOCK", payableTokenSupply);

        address nftImpl = address(new TokTokNft());
        factory = new NftFactory(nftImpl);
        TokTokNft.InitializationParams memory params = TokTokNft.InitializationParams(
            name, symbol, cap, address(payableToken), price, lendingAt, yield, lendingPeriod, uri, owner, signerAddress
        );

        for (uint256 i; i < 5; ++i) {
            TokTokNft toktok = TokTokNft(factory.deploy(params));
            payableToken.approve(address(toktok), type(uint256).max);
            payableToken.transfer(address(toktok), cap * price);
            toktok.setPublicsale(true);

            uint256 amount = 3;
            uint256 startTokenId = toktok.publicMint(amount);
            for (uint256 j; j < amount; ++j) {
                nfts.push(address(toktok));
                tokenIds.push(startTokenId + j);
            }
            toktok.activate();
        }
    }

    function test_claimAll() public {
        vm.warp(lendingAt + 1 days);
        factory.claimAll(nfts, tokenIds);
    }
}
