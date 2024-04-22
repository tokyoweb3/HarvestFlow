// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "forge-std/Test.sol";

import {TokTokNft} from "../src/TokTokNft.sol";

import {MockERC20} from "./mocks/MockERC20.sol";

import {ERC1155Holder} from "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract TokTokNftTest is Test, ERC1155Holder {
    uint256 payable_token_supply = 100_000_000;
    TokTokNft toktok;
    string name = "TokTokNft";
    string symbol = "TOK";
    uint256 cap = payable_token_supply / 10;
    ERC20 payable_token;
    uint256 lendingAt = 100;
    uint256 yield = 0.1 ether;
    uint256 lending_period = 365 days;
    string uri = "https://token-cdn-domain/{id}.json";
    address owner = address(this);
    address[] actors;

    receive() external payable {}

    function _getRandomActor(uint256 seed) public view returns (address) {
        return actors[seed % actors.length];
    }

    function setUp() public {
        payable_token = new MockERC20("MockERC20", "MOCK", payable_token_supply);
        toktok = new TokTokNft(name, symbol, cap, address(payable_token), lendingAt, yield, lending_period, uri, owner);
        payable_token.approve(address(toktok), type(uint256).max);
        payable_token.transfer(address(toktok), cap * 1e18);
        vm.deal(address(toktok), 1 ether);

        uint256 totalActors = 5;
        for (uint256 i; i < totalActors; ++i) {
            address actor = makeAddr(string(abi.encodePacked(i)));
            actors.push(actor);
            payable_token.transfer(actor, payable_token_supply / totalActors / 2);
            vm.prank(actor);
            payable_token.approve(address(toktok), type(uint256).max);
        }
    }

    function test_setUp_correct() public view {
        assertEq(toktok.name(), name);
        assertEq(toktok.symbol(), symbol);
        assertEq(toktok.cap(), cap);
        assertEq(address(toktok.payable_token()), address(payable_token));
        assertEq(toktok.lendingAt(), lendingAt);
        assertEq(toktok.yield(), yield);
        assertEq(toktok.maturity(), lendingAt + lending_period);
        assertEq(toktok.uri(0), uri);
        assertEq(toktok.owner(), owner);
    }

    function test_mint_satisfiesRequirements(uint256 seed, uint256 amount) public {
        address receiver = _getRandomActor(seed);
        amount = bound(amount, 1, payable_token.balanceOf(receiver));
        bytes memory data = "";
        vm.startPrank(receiver);

        bool receiverShouldGetAssignedNewTokenId = toktok.tokenOf(receiver) == 0;
        uint256 expectedTokenId =
            receiverShouldGetAssignedNewTokenId ? toktok.currentTokenId() : toktok.tokenOf(receiver);

        uint256 currentTokenIdBefore = toktok.currentTokenId();
        uint256 totalIssuedBefore = toktok.totalIssued();
        uint256 tokenReceiverBalanceBefore = toktok.balanceOf(receiver);
        uint256 payableTokenContractBalanceBefore = payable_token.balanceOf(address(toktok));
        uint256 payableTokenReceiverBalanceBefore = payable_token.balanceOf(receiver);

        vm.expectEmit(true, true, true, true);
        emit TokTokNft.Minted(receiver, expectedTokenId, amount);
        toktok.mint(amount, receiver, data);

        assertEq(toktok.balanceOf(receiver), tokenReceiverBalanceBefore + amount);
        assertEq(toktok.totalIssued(), totalIssuedBefore + amount);
        assertEq(
            toktok.currentTokenId(), receiverShouldGetAssignedNewTokenId ? expectedTokenId + 1 : currentTokenIdBefore
        );
        assertEq(toktok.tokenOf(receiver), expectedTokenId);
        assertEq(payable_token.balanceOf(address(toktok)), payableTokenContractBalanceBefore + amount);
        assertEq(payable_token.balanceOf(receiver), payableTokenReceiverBalanceBefore - amount);
    }

    function test_mint_multipleMintingReusesExistingTokenId(uint256 seed, uint256 amount) public {
        address receiver = _getRandomActor(seed);
        amount = bound(amount, 2, payable_token.balanceOf(receiver) / 2);
        bytes memory data = "";
        vm.startPrank(receiver);

        bool receiverShouldGetAssignedNewTokenId = toktok.tokenOf(receiver) == 0;
        uint256 expectedTokenId =
            receiverShouldGetAssignedNewTokenId ? toktok.currentTokenId() : toktok.tokenOf(receiver);

        uint256 currentTokenIdBefore = toktok.currentTokenId();

        toktok.mint(amount, receiver, data);
        toktok.mint(amount, receiver, data);

        assertEq(
            toktok.currentTokenId(), receiverShouldGetAssignedNewTokenId ? expectedTokenId + 1 : currentTokenIdBefore
        );
        assertEq(toktok.tokenOf(receiver), expectedTokenId);
    }

    function test_mint_mintAmountExceedingCap() public {
        uint256 maxMint = toktok.cap() - toktok.totalIssued();
        address receiver = address(this);
        bytes memory data = "";

        uint256 tokenReceiverBalanceBefore = toktok.balanceOf(receiver);
        uint256 expectedTokenId = toktok.tokenOf(receiver) == 0 ? toktok.currentTokenId() : toktok.tokenOf(receiver);

        vm.expectEmit(true, true, true, true);
        emit TokTokNft.Minted(receiver, expectedTokenId, maxMint);
        toktok.mint(maxMint + 1, receiver, data);

        assertEq(toktok.balanceOf(receiver), tokenReceiverBalanceBefore + maxMint);
        assertEq(toktok.totalIssued(), toktok.cap());
    }

    function test_mint_reverts_ifLendingAtHadPassed() public {
        vm.warp(toktok.lendingAt() + 1);

        uint256 amount = 1;
        address receiver = address(this);
        bytes memory data = "";

        vm.expectRevert(abi.encodeWithSelector(TokTokNft.LendingAtPassed.selector, toktok.lendingAt(), block.timestamp));
        toktok.mint(amount, receiver, data);
    }

    function test_mint_reverts_ifCapReached() public {
        uint256 amount = toktok.cap() - toktok.totalIssued();
        address receiver = address(this);
        bytes memory data = "";
        toktok.mint(amount, receiver, data);

        vm.expectRevert(abi.encodeWithSelector(TokTokNft.CapReached.selector, toktok.cap()));
        toktok.mint(1, receiver, data);
    }

    function test_activate_works() public {
        vm.prank(toktok.owner());
        vm.expectEmit(true, true, true, true);
        emit TokTokNft.Activated();
        toktok.activate();
    }

    function test_activate_reverts_ifNotOwner() public {
        address sender = makeAddr("random");
        vm.prank(sender);
        vm.expectRevert(abi.encodeWithSelector(Ownable.OwnableUnauthorizedAccount.selector, sender));
        toktok.activate();
    }

    function test_claim_satisfiesRequirements(uint256 seed, uint256 amount) public {
        address receiver = _getRandomActor(seed);
        amount = bound(amount, 1, payable_token.balanceOf(receiver));
        bytes memory data = "";
        vm.startPrank(receiver);

        uint256 tokenId = toktok.tokenOf(receiver) == 0 ? toktok.currentTokenId() : toktok.tokenOf(receiver);
        toktok.mint(amount, receiver, data);
        vm.startPrank(toktok.owner());
        toktok.activate();
        vm.startPrank(receiver);

        vm.warp(toktok.maturity());

        uint256 payableTokenContractBalanceBefore = payable_token.balanceOf(address(toktok));
        uint256 payableTokenReceiverBalanceBefore = payable_token.balanceOf(receiver);
        uint256 expectedClaimAmount = amount * toktok.yield();

        vm.expectEmit(true, true, true, true);
        emit TokTokNft.Claimed(receiver, tokenId, expectedClaimAmount);
        toktok.claim(tokenId);

        assertEq(payable_token.balanceOf(address(toktok)), payableTokenContractBalanceBefore - expectedClaimAmount);
        assertEq(payable_token.balanceOf(receiver), payableTokenReceiverBalanceBefore + expectedClaimAmount);
    }

    function test_claim_wontGiveAnythingMoreAfterMaturity(uint256 seed, uint256 amount) public {
        address receiver = _getRandomActor(seed);
        amount = bound(amount, 1, payable_token.balanceOf(receiver));
        bytes memory data = "";
        vm.startPrank(receiver);

        uint256 tokenId = toktok.tokenOf(receiver) == 0 ? toktok.currentTokenId() : toktok.tokenOf(receiver);
        toktok.mint(amount, receiver, data);
        vm.startPrank(toktok.owner());
        toktok.activate();
        vm.startPrank(receiver);

        vm.warp(toktok.maturity());
        toktok.claim(tokenId);

        uint256 payableTokenContractBalanceBefore = payable_token.balanceOf(address(toktok));
        uint256 payableTokenReceiverBalanceBefore = payable_token.balanceOf(receiver);
        uint256 expectedClaimAmount = 0;
        vm.warp(block.timestamp + 100);

        vm.expectEmit(true, true, true, true);
        emit TokTokNft.Claimed(receiver, tokenId, expectedClaimAmount);
        toktok.claim(tokenId);

        assertEq(payable_token.balanceOf(address(toktok)), payableTokenContractBalanceBefore);
        assertEq(payable_token.balanceOf(receiver), payableTokenReceiverBalanceBefore);
    }

    function test_claim_doesNotDoublespend(uint256 seed, uint256 amount) public {
        address receiver = _getRandomActor(seed);
        amount = bound(amount, 1, payable_token.balanceOf(receiver));
        bytes memory data = "";
        vm.startPrank(receiver);

        uint256 tokenId = toktok.tokenOf(receiver) == 0 ? toktok.currentTokenId() : toktok.tokenOf(receiver);
        toktok.mint(amount, receiver, data);
        vm.startPrank(toktok.owner());
        toktok.activate();
        vm.startPrank(receiver);

        vm.warp(block.timestamp + 100);
        toktok.claim(tokenId);

        uint256 payableTokenContractBalanceBefore = payable_token.balanceOf(address(toktok));
        uint256 payableTokenReceiverBalanceBefore = payable_token.balanceOf(receiver);
        uint256 expectedClaimAmount = 0;

        vm.expectEmit(true, true, true, true);
        emit TokTokNft.Claimed(receiver, tokenId, expectedClaimAmount);
        toktok.claim(tokenId);

        assertEq(payable_token.balanceOf(address(toktok)), payableTokenContractBalanceBefore);
        assertEq(payable_token.balanceOf(receiver), payableTokenReceiverBalanceBefore);
    }

    function test_claim_reverts_ifNotActive() public {
        vm.expectRevert(TokTokNft.NotActive.selector);
        toktok.claim(1);
    }

    function test_redeem_satisfiesRequirements(uint256 seed, uint256 amount) public {
        address receiver = _getRandomActor(seed);
        amount = bound(amount, 1, payable_token.balanceOf(receiver));
        bytes memory data = "";
        vm.startPrank(receiver);

        uint256 tokenId = toktok.tokenOf(receiver) == 0 ? toktok.currentTokenId() : toktok.tokenOf(receiver);

        toktok.mint(amount, receiver, data);
        vm.startPrank(toktok.owner());
        toktok.activate();
        vm.startPrank(receiver);

        vm.warp(toktok.maturity());

        uint256 totalIssuedBefore = toktok.totalIssued();
        uint256 payableTokenContractBalanceBefore = payable_token.balanceOf(address(toktok));
        uint256 payableTokenReceiverBalanceBefore = payable_token.balanceOf(receiver);
        uint256 expectedClaimAmount = amount * toktok.yield();

        vm.expectEmit(true, true, true, true);
        emit TokTokNft.Redeemed(receiver, tokenId, amount);
        toktok.redeem(tokenId);

        assertEq(
            payable_token.balanceOf(address(toktok)), payableTokenContractBalanceBefore - expectedClaimAmount - amount
        );
        assertEq(payable_token.balanceOf(receiver), payableTokenReceiverBalanceBefore + expectedClaimAmount + amount);
        assertEq(toktok.balanceOf(receiver), 0);
        assertEq(toktok.totalIssued(), totalIssuedBefore);
    }

    function test_redeem_reverts_ifNotActive() public {
        vm.expectRevert(TokTokNft.NotActive.selector);
        toktok.redeem(1);
    }

    function test_withdraw_satisfiesRequirementsForERC20() public {
        address receiver = toktok.owner();
        uint256 payableTokenContractBalanceBefore = payable_token.balanceOf(address(toktok));
        uint256 payableTokenReceiverBalanceBefore = payable_token.balanceOf(receiver);
        uint256 expectedAmount = payableTokenContractBalanceBefore;

        vm.startPrank(receiver);
        vm.expectEmit(true, true, true, true);
        emit TokTokNft.Withdrawn(receiver, address(payable_token), expectedAmount);
        toktok.withdraw(address(payable_token), expectedAmount, receiver);

        assertEq(payable_token.balanceOf(address(toktok)), payableTokenContractBalanceBefore - expectedAmount);
        assertEq(payable_token.balanceOf(receiver), payableTokenReceiverBalanceBefore + expectedAmount);
    }

    function test_withdraw_satisfiesRequirementsForEth() public {
        address receiver = toktok.owner();
        uint256 etherContractBalanceBefore = address(toktok).balance;
        uint256 etherReceiverBalanceBefore = receiver.balance;
        uint256 expectedAmount = etherContractBalanceBefore;

        vm.startPrank(receiver);
        vm.expectEmit(true, true, true, true);
        emit TokTokNft.Withdrawn(receiver, address(0), expectedAmount);
        toktok.withdraw(address(0), expectedAmount, receiver);

        assertEq(address(toktok).balance, etherContractBalanceBefore - expectedAmount);
        assertEq(receiver.balance, etherReceiverBalanceBefore + expectedAmount);
    }

    function test_withdraw_reverts_ifNotOwner() public {
        address sender = makeAddr("random");
        vm.prank(sender);
        vm.expectRevert(abi.encodeWithSelector(Ownable.OwnableUnauthorizedAccount.selector, sender));
        toktok.withdraw(address(payable_token), 1, sender);
    }
}
