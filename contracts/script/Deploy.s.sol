// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Script, console2} from "forge-std/Script.sol";

import {NftFactory} from "../src/NftFactory.sol";
import {TokTokNft} from "../src/TokTokNft.sol";

contract Deploy is Script {
    function run() public {
        vm.startBroadcast();

        TokTokNft nft = new TokTokNft();
        NftFactory factory = new NftFactory(address(nft));
        console2.log("NftFactory address:", address(factory));

        vm.stopBroadcast();
    }
}
