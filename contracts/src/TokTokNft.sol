// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract TokTokNft is ERC1155, Ownable {
    /// @notice Name of the ERC1155
    string name;
    /// @notice Symbol of the ERC1155
    string symbol;
    /// @notice Total cap of NFTs to be issued
    uint256 cap;
    /// @notice Address of the token used for payments
    address payable_token;
    /// @notice Start time of the lending agreement (when claims can begin)
    uint256 lendingAt;
    /// @notice Minimum fixed interest rate
    uint256 yield;

    /// @notice NFT id corresponding to the owner address
    mapping(address => uint256) public tokenOf;

    constructor(
        string memory name_,
        string memory symbol_,
        uint256 cap_,
        address payable_token_,
        uint256 lendingAt_,
        uint256 yield_,
        string memory uri_,
        address owner_
    ) ERC1155(uri_) Ownable(owner_) {
        name = name_;
        symbol = symbol_;
        cap = cap_;
        payable_token = payable_token_;
        lendingAt = lendingAt_;
        yield = yield_;
    }

    function mint(uint256 amount, address receiver) public {}

    function activate() public onlyOwner {}

    function claim(uint256 tokenId) public {}

    function redeem(uint256 tokenId) public {}

    function withdraw(address token, uint256 amount, address receiver) public onlyOwner {}

    function addBonusToken(address token, uint256 amount, uint256 l, uint256 r) public onlyOwner {}

    function removeBonusToken(address token, address receiver) public onlyOwner {}

    function claimToken(address token, uint256 tokenId) public {}

    function calcRemainBalance() public {}

    function maturity() public {}
}
