// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "forge-std/Test.sol";

import {NftFactory} from "../src/NftFactory.sol";
import {TokTokNft} from "../src/TokTokNft.sol";

import {MockERC20} from "./mocks/MockERC20.sol";

import {ERC1155Holder} from "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IERC2981} from "@openzeppelin/contracts/interfaces/IERC2981.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {Math} from "@openzeppelin/contracts/utils/math/Math.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";

contract TokTokNftTest is Test, ERC1155Holder {
    uint256 payableTokenSupply = 100_000_000;
    TokTokNft toktok;
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
    address[] actors;

    receive() external payable {}

    function _getRandomActor(uint256 seed) public view returns (address) {
        return actors[seed % actors.length];
    }

    function _signPremint(address receiver, uint256 maxMintAmount) public view returns (bytes memory) {
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(signerPk, keccak256(abi.encodePacked(receiver, maxMintAmount)));
        return abi.encodePacked(r, s, v);
    }

    function setUp() public {
        (signerAddress, signerPk) = makeAddrAndKey("signer");
        payableToken = new MockERC20("MockERC20", "MOCK", payableTokenSupply);

        address nftImpl = address(new TokTokNft());
        NftFactory factory = new NftFactory(nftImpl);
        TokTokNft.InitializationParams memory params = TokTokNft.InitializationParams(
            name, symbol, cap, address(payableToken), price, lendingAt, yield, lendingPeriod, uri, owner, signerAddress
        );
        toktok = TokTokNft(factory.deploy(params));

        payableToken.approve(address(toktok), type(uint256).max);
        payableToken.transfer(address(toktok), cap * price);
        vm.deal(address(toktok), 1 ether);
        toktok.setPublicsale(true);
        toktok.setPresale(true);

        uint256 totalActors = 5;
        for (uint256 i; i < totalActors; ++i) {
            address actor = makeAddr(string(abi.encodePacked(i)));
            actors.push(actor);
            payableToken.transfer(actor, (10 ** payableToken.decimals()) * payableTokenSupply / totalActors / 2);
            vm.prank(actor);
            payableToken.approve(address(toktok), type(uint256).max);
        }
    }

    function test_setUp_correct() public {
        assertEq(toktok.name(), name);
        assertEq(toktok.symbol(), symbol);
        assertEq(toktok.cap(), cap);
        assertEq(address(toktok.payableToken()), address(payableToken));
        assertEq(toktok.lendingAt(), lendingAt);
        assertEq(toktok.yield(), yield);
        assertEq(toktok.maturity(), lendingAt + lendingPeriod);
        assertEq(toktok.baseURI(), uri);
        assertEq(toktok.owner(), owner);
    }

    function test_anyWriteFunction_reverts_ifPaused() public {
        vm.startPrank(toktok.owner());
        toktok.pause();

        vm.expectRevert(Pausable.EnforcedPause.selector);
        toktok.publicMint(0);
        vm.expectRevert(Pausable.EnforcedPause.selector);
        toktok.preMint(0, 0, "");
        vm.expectRevert(Pausable.EnforcedPause.selector);
        toktok.setPresale(true);
        vm.expectRevert(Pausable.EnforcedPause.selector);
        toktok.setPublicsale(true);
        vm.expectRevert(Pausable.EnforcedPause.selector);
        toktok.setPresalePrice(0);
        vm.expectRevert(Pausable.EnforcedPause.selector);
        toktok.setPublicPrice(0);
        vm.expectRevert(Pausable.EnforcedPause.selector);
        toktok.setBaseURI("");
        vm.expectRevert(Pausable.EnforcedPause.selector);
        toktok.claim(0);
        vm.expectRevert(Pausable.EnforcedPause.selector);
        toktok.claimAll(new uint256[](0));
        vm.expectRevert(Pausable.EnforcedPause.selector);
        toktok.redeem(0);
        vm.expectRevert(Pausable.EnforcedPause.selector);
        toktok.redeemAll(new uint256[](0));
        vm.expectRevert(Pausable.EnforcedPause.selector);
        toktok.withdraw(address(0), 0, address(0));
        vm.expectRevert(Pausable.EnforcedPause.selector);
        toktok.addBonusToken(address(0), 0, 0, 0);
        vm.expectRevert(Pausable.EnforcedPause.selector);
        toktok.removeBonusToken(address(0), address(0));
        vm.expectRevert(Pausable.EnforcedPause.selector);
        toktok.claimToken(address(0), 0);
        vm.expectRevert(Pausable.EnforcedPause.selector);
        toktok.setRoyaltyAddress(address(0), 0);
    }

    function test_publicMint_satisfiesRequirements(uint256 seed, uint256 amount) public {
        address receiver = _getRandomActor(seed);
        amount = bound(amount, 1, cap);
        vm.startPrank(receiver);

        uint256 expectedTokenId = toktok.nextTokenId();
        uint256 expectedCost = amount * price;

        uint256 totalSupplyBefore = toktok.totalSupply();
        uint256 tokenReceiverBalanceBefore = toktok.balanceOf(receiver);
        uint256 payableTokenContractBalanceBefore = payableToken.balanceOf(address(toktok));
        uint256 payableTokenReceiverBalanceBefore = payableToken.balanceOf(receiver);

        vm.expectEmit(true, true, true, true);
        emit TokTokNft.Minted(receiver, expectedTokenId, amount, expectedCost);
        toktok.publicMint(amount);

        assertEq(toktok.balanceOf(receiver), tokenReceiverBalanceBefore + amount);
        assertEq(toktok.totalSupply(), totalSupplyBefore + amount);
        assertEq(toktok.nextTokenId(), expectedTokenId + amount);
        assertEq(toktok.ownerOf(expectedTokenId), receiver);
        assertEq(toktok.ownerOf(expectedTokenId + amount / 2), receiver);
        assertEq(toktok.ownerOf(expectedTokenId + amount - 1), receiver);
        assertEq(payableToken.balanceOf(address(toktok)), payableTokenContractBalanceBefore + expectedCost);
        assertEq(payableToken.balanceOf(receiver), payableTokenReceiverBalanceBefore - expectedCost);
    }

    function test_publicMint_mintAmountExceedingCap() public {
        uint256 maxMint = toktok.cap() - toktok.totalSupply();
        address receiver = address(this);
        vm.startPrank(receiver);

        uint256 tokenReceiverBalanceBefore = toktok.balanceOf(receiver);
        uint256 expectedTokenId = toktok.nextTokenId();
        uint256 expectedCost = maxMint * price;

        vm.expectEmit(true, true, true, true);
        emit TokTokNft.Minted(receiver, expectedTokenId, maxMint, expectedCost);
        toktok.publicMint(maxMint + 1);

        assertEq(toktok.balanceOf(receiver), tokenReceiverBalanceBefore + maxMint);
        assertEq(toktok.totalSupply(), toktok.cap());
    }

    function test_publicMint_reverts_ifLendingAtHadPassed() public {
        vm.warp(toktok.lendingAt() + 1);

        uint256 amount = 1;
        address receiver = address(this);
        vm.startPrank(receiver);

        vm.expectRevert(abi.encodeWithSelector(TokTokNft.LendingAtPassed.selector, toktok.lendingAt(), block.timestamp));
        toktok.publicMint(amount);
    }

    function test_publicMint_reverts_ifPublicsaleNotActive() public {
        toktok.setPublicsale(false);

        uint256 amount = 1;
        address receiver = address(this);
        vm.startPrank(receiver);

        vm.expectRevert(TokTokNft.NotActive.selector);
        toktok.publicMint(amount);
    }

    function test_publicMint_reverts_ifAmountZero() public {
        uint256 amount = 0;
        address receiver = address(this);
        vm.startPrank(receiver);

        vm.expectRevert(TokTokNft.AmountZero.selector);
        toktok.publicMint(amount);
    }

    function test_publicMint_reverts_ifCapReached() public {
        uint256 amount = toktok.cap() - toktok.totalSupply();
        address receiver = address(this);
        vm.startPrank(receiver);
        toktok.publicMint(amount);

        vm.expectRevert(abi.encodeWithSelector(TokTokNft.CapReached.selector, toktok.cap()));
        toktok.publicMint(1);
    }

    function test_preMint_satisfiesRequirements(uint256 seed, uint256 amount) public {
        address receiver = _getRandomActor(seed);
        amount = bound(amount, 1, cap);
        bytes memory signature = _signPremint(receiver, amount);
        vm.startPrank(receiver);

        uint256 expectedTokenId = toktok.nextTokenId();
        uint256 expectedCost = amount * price;

        uint256 totalSupplyBefore = toktok.totalSupply();
        uint256 tokenReceiverBalanceBefore = toktok.balanceOf(receiver);
        uint256 payableTokenContractBalanceBefore = payableToken.balanceOf(address(toktok));
        uint256 payableTokenReceiverBalanceBefore = payableToken.balanceOf(receiver);

        vm.expectEmit(true, true, true, true);
        emit TokTokNft.Minted(receiver, expectedTokenId, amount, expectedCost);
        toktok.preMint(amount, amount, signature);

        assertEq(toktok.balanceOf(receiver), tokenReceiverBalanceBefore + amount);
        assertEq(toktok.totalSupply(), totalSupplyBefore + amount);
        assertEq(toktok.nextTokenId(), expectedTokenId + amount);
        assertEq(toktok.ownerOf(expectedTokenId), receiver);
        assertEq(toktok.ownerOf(expectedTokenId + amount / 2), receiver);
        assertEq(toktok.ownerOf(expectedTokenId + amount - 1), receiver);
        assertEq(payableToken.balanceOf(address(toktok)), payableTokenContractBalanceBefore + expectedCost);
        assertEq(payableToken.balanceOf(receiver), payableTokenReceiverBalanceBefore - expectedCost);
    }

    function test_preMint_mintAmountExceedingCap() public {
        uint256 maxMint = toktok.cap() - toktok.totalSupply();
        address receiver = address(this);
        bytes memory signature = _signPremint(receiver, maxMint + 1);
        vm.startPrank(receiver);

        uint256 tokenReceiverBalanceBefore = toktok.balanceOf(receiver);
        uint256 expectedTokenId = toktok.nextTokenId();
        uint256 expectedCost = maxMint * price;

        vm.expectEmit(true, true, true, true);
        emit TokTokNft.Minted(receiver, expectedTokenId, maxMint, expectedCost);
        toktok.preMint(maxMint + 1, maxMint + 1, signature);

        assertEq(toktok.balanceOf(receiver), tokenReceiverBalanceBefore + maxMint);
        assertEq(toktok.totalSupply(), toktok.cap());
    }

    function test_preMint_reverts_ifSignedMaxMintAmountIsDifferent() public {
        uint256 amount = 1;
        uint256 maxMintAmount = 5;
        address receiver = address(this);
        bytes memory signature = _signPremint(receiver, maxMintAmount);
        vm.startPrank(receiver);

        vm.expectRevert(TokTokNft.InvalidSignature.selector);
        toktok.preMint(amount, maxMintAmount * 2, signature);
    }

    function test_preMint_reverts_ifSignedMaxMintReceiverIsDifferent() public {
        uint256 amount = 1;
        uint256 maxMintAmount = 5;
        address receiver = address(this);
        bytes memory signature = _signPremint(address(0x1), maxMintAmount);
        vm.startPrank(receiver);

        vm.expectRevert(TokTokNft.InvalidSignature.selector);
        toktok.preMint(amount, maxMintAmount, signature);
    }

    function test_preMint_reverts_ifSignedMaxMintSignerIsDifferent() public {
        uint256 amount = 1;
        uint256 maxMintAmount = 5;
        address receiver = address(this);

        (, uint256 bobPk) = makeAddrAndKey("bob");
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(bobPk, keccak256(abi.encodePacked(receiver, maxMintAmount)));
        bytes memory signature = abi.encodePacked(r, s, v);

        vm.startPrank(receiver);

        vm.expectRevert(TokTokNft.InvalidSignature.selector);
        toktok.preMint(amount, maxMintAmount, signature);
    }

    function test_preMint_reverts_ifLendingAtHadPassed() public {
        vm.warp(toktok.lendingAt() + 1);

        uint256 amount = 1;
        address receiver = address(this);
        bytes memory signature = _signPremint(receiver, amount);
        vm.startPrank(receiver);

        vm.expectRevert(abi.encodeWithSelector(TokTokNft.LendingAtPassed.selector, toktok.lendingAt(), block.timestamp));
        toktok.preMint(amount, amount, signature);
    }

    function test_preMint_reverts_ifPresaleNotActive() public {
        toktok.setPresale(false);

        uint256 amount = 1;
        address receiver = address(this);
        bytes memory signature = _signPremint(receiver, amount);
        vm.startPrank(receiver);

        vm.expectRevert(TokTokNft.NotActive.selector);
        toktok.preMint(amount, amount, signature);
    }

    function test_preMint_reverts_ifAmountZero() public {
        uint256 amount = 0;
        address receiver = address(this);
        bytes memory signature = _signPremint(receiver, amount);
        vm.startPrank(receiver);

        vm.expectRevert(TokTokNft.AmountZero.selector);
        toktok.preMint(amount, amount, signature);
    }

    function test_preMint_doesNotExceedMaxMintAmount() public {
        uint256 maxMintAmount = 5;
        uint256 amount = maxMintAmount - 1;
        address receiver = address(this);
        bytes memory signature = _signPremint(receiver, maxMintAmount);
        vm.startPrank(receiver);
        toktok.preMint(amount, maxMintAmount, signature);

        uint256 tokenReceiverBalanceBefore = toktok.balanceOf(receiver);
        toktok.preMint(maxMintAmount - amount + 1, maxMintAmount, signature);
        assertEq(toktok.balanceOf(receiver), tokenReceiverBalanceBefore + maxMintAmount - amount);
    }

    function test_preMint_reverts_ifMaxMintAmountSpent() public {
        uint256 maxMintAmount = 5;
        uint256 amount = maxMintAmount;
        address receiver = address(this);
        bytes memory signature = _signPremint(receiver, maxMintAmount);
        vm.startPrank(receiver);
        toktok.preMint(amount, maxMintAmount, signature);

        vm.expectRevert(abi.encodeWithSelector(TokTokNft.CapReached.selector, maxMintAmount));
        toktok.preMint(amount, maxMintAmount, signature);
    }

    function test_setPresale_works() public {
        vm.startPrank(toktok.owner());
        toktok.setPresale(true);
        assertEq(toktok.isPresale(), true);
        toktok.setPresale(false);
        assertEq(toktok.isPresale(), false);
    }

    function test_setPresale_reverts_ifNotOwner() public {
        address sender = makeAddr("random");
        vm.startPrank(sender);

        vm.expectRevert(abi.encodeWithSelector(Ownable.OwnableUnauthorizedAccount.selector, sender));
        toktok.setPresale(true);
        vm.expectRevert(abi.encodeWithSelector(Ownable.OwnableUnauthorizedAccount.selector, sender));
        toktok.setPresale(false);
    }

    function test_setPublicsale_works() public {
        vm.startPrank(toktok.owner());
        toktok.setPublicsale(true);
        assertEq(toktok.isPublicsale(), true);
        toktok.setPublicsale(false);
        assertEq(toktok.isPublicsale(), false);
    }

    function test_setPublicsale_reverts_ifNotOwner() public {
        address sender = makeAddr("random");
        vm.startPrank(sender);

        vm.expectRevert(abi.encodeWithSelector(Ownable.OwnableUnauthorizedAccount.selector, sender));
        toktok.setPublicsale(true);
        vm.expectRevert(abi.encodeWithSelector(Ownable.OwnableUnauthorizedAccount.selector, sender));
        toktok.setPublicsale(false);
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

    function test_setBaseURI_works() public {
        string memory newBaseURI = "abc";
        vm.startPrank(toktok.owner());

        vm.expectEmit(true, true, true, true);
        emit TokTokNft.BaseUriChanged(newBaseURI);
        toktok.setBaseURI(newBaseURI);

        assertEq(toktok.baseURI(), newBaseURI);
    }

    function test_setBaseURI_reverts_ifNotOwner() public {
        address sender = makeAddr("random");
        vm.startPrank(sender);

        vm.expectRevert(abi.encodeWithSelector(Ownable.OwnableUnauthorizedAccount.selector, sender));
        toktok.setBaseURI("abc");
    }

    function test_claim_satisfiesRequirements(uint256 seed) public {
        address receiver = _getRandomActor(seed);
        vm.startPrank(receiver);

        uint256 tokenId = toktok.nextTokenId();
        toktok.publicMint(1);
        vm.startPrank(toktok.owner());
        toktok.activate();
        vm.startPrank(receiver);

        vm.warp(toktok.maturity());

        uint256 payableTokenContractBalanceBefore = payableToken.balanceOf(address(toktok));
        uint256 payableTokenReceiverBalanceBefore = payableToken.balanceOf(receiver);
        uint256 expectedClaimAmount = price * toktok.yield() / 1e18;

        vm.expectEmit(true, true, true, true);
        emit TokTokNft.Claimed(receiver, tokenId, expectedClaimAmount);
        toktok.claim(tokenId);

        assertEq(payableToken.balanceOf(address(toktok)), payableTokenContractBalanceBefore - expectedClaimAmount);
        assertEq(payableToken.balanceOf(receiver), payableTokenReceiverBalanceBefore + expectedClaimAmount);
    }

    function test_claim_wontGiveAnythingMoreAfterMaturity(uint256 seed) public {
        address receiver = _getRandomActor(seed);
        vm.startPrank(receiver);

        uint256 tokenId = toktok.nextTokenId();
        toktok.publicMint(1);
        vm.startPrank(toktok.owner());
        toktok.activate();
        vm.startPrank(receiver);

        vm.warp(toktok.maturity());
        toktok.claim(tokenId);

        uint256 payableTokenContractBalanceBefore = payableToken.balanceOf(address(toktok));
        uint256 payableTokenReceiverBalanceBefore = payableToken.balanceOf(receiver);
        uint256 expectedClaimAmount = 0;
        vm.warp(block.timestamp + 100);

        vm.expectEmit(true, true, true, true);
        emit TokTokNft.Claimed(receiver, tokenId, expectedClaimAmount);
        toktok.claim(tokenId);

        assertEq(payableToken.balanceOf(address(toktok)), payableTokenContractBalanceBefore);
        assertEq(payableToken.balanceOf(receiver), payableTokenReceiverBalanceBefore);
    }

    function test_claim_doesNotDoublespend(uint256 seed, uint256 amount) public {
        address receiver = _getRandomActor(seed);
        amount = bound(amount, 1, payableToken.balanceOf(receiver) / price);
        vm.startPrank(receiver);

        uint256 tokenId = toktok.nextTokenId();
        toktok.publicMint(amount);
        vm.startPrank(toktok.owner());
        toktok.activate();
        vm.startPrank(receiver);

        vm.warp(block.timestamp + 100);
        toktok.claim(tokenId);

        uint256 payableTokenContractBalanceBefore = payableToken.balanceOf(address(toktok));
        uint256 payableTokenReceiverBalanceBefore = payableToken.balanceOf(receiver);
        uint256 expectedClaimAmount = 0;

        vm.expectEmit(true, true, true, true);
        emit TokTokNft.Claimed(receiver, tokenId, expectedClaimAmount);
        toktok.claim(tokenId);

        assertEq(payableToken.balanceOf(address(toktok)), payableTokenContractBalanceBefore);
        assertEq(payableToken.balanceOf(receiver), payableTokenReceiverBalanceBefore);
    }

    function test_claim_reverts_ifNotActive() public {
        vm.expectRevert(TokTokNft.NotActive.selector);
        toktok.claim(1);
    }

    function test_claimAll_satisfiesRequirements(uint256 seed) public {
        uint256 actorsCount = bound(seed, 1, actors.length);
        uint256 tokensForEachActor = bound(actorsCount, 1, 3);
        vm.startPrank(toktok.owner());
        toktok.activate();

        address[] memory receivers = new address[](actorsCount);
        uint256[] memory tokenIds = new uint256[](actorsCount * tokensForEachActor);
        for (uint256 i; i < actorsCount; ++i) {
            receivers[i] = _getRandomActor(i);
            vm.startPrank(receivers[i]);
            uint256 tokenId = toktok.nextTokenId();
            for (uint256 j; j < tokensForEachActor; ++j) {
                tokenIds[i * tokensForEachActor + j] = tokenId + j;
            }
            toktok.publicMint(tokensForEachActor);
        }

        vm.warp(toktok.maturity());

        uint256 payableTokenContractBalanceBefore = payableToken.balanceOf(address(toktok));
        uint256[] memory payableTokenReceiversBalancesBefore = new uint256[](actorsCount);
        uint256[] memory expectedClaimAmounts = new uint256[](actorsCount);
        uint256 totalExpectedClaimAmount;
        for (uint256 i; i < actorsCount; ++i) {
            payableTokenReceiversBalancesBefore[i] = payableToken.balanceOf(receivers[i]);
            expectedClaimAmounts[i] = (price * toktok.yield() / 1e18) * tokensForEachActor;
            totalExpectedClaimAmount += expectedClaimAmounts[i];
        }

        for (uint256 i; i < actorsCount * tokensForEachActor; ++i) {
            vm.expectEmit(true, true, true, true);
            emit TokTokNft.Claimed(
                receivers[i / tokensForEachActor],
                tokenIds[i],
                expectedClaimAmounts[i / tokensForEachActor] / tokensForEachActor
            );
        }
        toktok.claimAll(tokenIds);

        for (uint256 i; i < actorsCount; ++i) {
            assertEq(
                payableToken.balanceOf(receivers[i]), payableTokenReceiversBalancesBefore[i] + expectedClaimAmounts[i]
            );
        }
        assertEq(payableToken.balanceOf(address(toktok)), payableTokenContractBalanceBefore - totalExpectedClaimAmount);
    }

    function test_redeem_satisfiesRequirements(uint256 seed) public {
        address receiver = _getRandomActor(seed);
        vm.startPrank(receiver);

        uint256 tokenId = toktok.nextTokenId();
        toktok.publicMint(1);
        vm.startPrank(toktok.owner());
        toktok.activate();
        vm.startPrank(receiver);

        vm.warp(toktok.maturity());

        uint256 totalSupplyBefore = toktok.totalSupply();
        uint256 payableTokenContractBalanceBefore = payableToken.balanceOf(address(toktok));
        uint256 payableTokenReceiverBalanceBefore = payableToken.balanceOf(receiver);
        uint256 expectedClaimAmount = price * toktok.yield() / 1e18;

        vm.expectEmit(true, true, true, true);
        emit TokTokNft.Redeemed(receiver, tokenId, price);
        toktok.redeem(tokenId);

        assertEq(
            payableToken.balanceOf(address(toktok)), payableTokenContractBalanceBefore - expectedClaimAmount - price
        );
        assertEq(payableToken.balanceOf(receiver), payableTokenReceiverBalanceBefore + expectedClaimAmount + price);
        assertEq(toktok.totalSupply(), totalSupplyBefore);
    }

    function test_redeemAll_satisfiesRequirements(uint256 seed) public {
        uint256 actorsCount = bound(seed, 1, actors.length);
        uint256 tokensForEachActor = bound(actorsCount, 1, 3);
        vm.startPrank(toktok.owner());
        toktok.activate();

        address[] memory receivers = new address[](actorsCount);
        uint256[] memory tokenIds = new uint256[](actorsCount * tokensForEachActor);
        for (uint256 i; i < actorsCount; ++i) {
            receivers[i] = _getRandomActor(i);
            vm.startPrank(receivers[i]);
            uint256 tokenId = toktok.nextTokenId();
            for (uint256 j; j < tokensForEachActor; ++j) {
                tokenIds[i * tokensForEachActor + j] = tokenId + j;
            }
            toktok.publicMint(tokensForEachActor);
        }

        vm.warp(toktok.maturity());

        uint256 payableTokenContractBalanceBefore = payableToken.balanceOf(address(toktok));
        uint256[] memory payableTokenReceiversBalancesBefore = new uint256[](actorsCount);
        uint256[] memory expectedClaimAmounts = new uint256[](actorsCount);
        uint256 totalExpectedClaimAmount;
        for (uint256 i; i < actorsCount; ++i) {
            payableTokenReceiversBalancesBefore[i] = payableToken.balanceOf(receivers[i]);
            expectedClaimAmounts[i] = ((price * toktok.yield() / 1e18) + price) * tokensForEachActor;
            totalExpectedClaimAmount += expectedClaimAmounts[i];
        }

        for (uint256 i; i < actorsCount * tokensForEachActor; ++i) {
            vm.expectEmit(true, true, true, true);
            emit TokTokNft.Redeemed(receivers[i / tokensForEachActor], tokenIds[i], price);
        }
        toktok.redeemAll(tokenIds);

        for (uint256 i; i < actorsCount; ++i) {
            assertEq(
                payableToken.balanceOf(receivers[i]), payableTokenReceiversBalancesBefore[i] + expectedClaimAmounts[i]
            );
        }
        assertEq(payableToken.balanceOf(address(toktok)), payableTokenContractBalanceBefore - totalExpectedClaimAmount);
    }

    function test_redeem_reverts_ifNotActive() public {
        vm.warp(toktok.maturity());
        vm.expectRevert(TokTokNft.NotActive.selector);
        toktok.redeem(1);
    }

    function test_redeem_reverts_ifAlreadyRedeemed() public {
        vm.prank(toktok.owner());
        toktok.activate();

        uint256 tokenId = toktok.nextTokenId();
        toktok.publicMint(1);
        vm.warp(toktok.maturity());
        toktok.redeem(tokenId);
        vm.expectRevert(abi.encodeWithSelector(TokTokNft.AlreadyRedeemed.selector, tokenId));
        toktok.redeem(tokenId);
    }

    function test_withdraw_satisfiesRequirementsForERC20() public {
        address receiver = toktok.owner();
        uint256 payableTokenContractBalanceBefore = payableToken.balanceOf(address(toktok));
        uint256 payableTokenReceiverBalanceBefore = payableToken.balanceOf(receiver);
        uint256 expectedAmount = payableTokenContractBalanceBefore;

        vm.startPrank(receiver);
        vm.expectEmit(true, true, true, true);
        emit TokTokNft.Withdrawn(receiver, address(payableToken), expectedAmount);
        toktok.withdraw(address(payableToken), expectedAmount, receiver);

        assertEq(payableToken.balanceOf(address(toktok)), payableTokenContractBalanceBefore - expectedAmount);
        assertEq(payableToken.balanceOf(receiver), payableTokenReceiverBalanceBefore + expectedAmount);
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
        toktok.withdraw(address(payableToken), 1, sender);
    }

    function test_addBonusToken_satisfiesRequirements() public {
        address receiver = toktok.owner();
        vm.startPrank(receiver);

        uint256 amount = 100 ether;
        MockERC20 bonusToken = new MockERC20("MockERC20", "MOCK", amount);
        bonusToken.approve(address(toktok), type(uint256).max);

        uint256 l = block.timestamp + 100;
        uint256 r = block.timestamp + 200;
        uint256 bonusTokenBalanceContractBefore = bonusToken.balanceOf(address(toktok));
        uint256 bonusTokenBalanceReceiverBefore = bonusToken.balanceOf(receiver);

        vm.expectEmit(true, true, true, true);
        emit TokTokNft.BonusTokenAdded(address(bonusToken), amount, l, r);
        toktok.addBonusToken(address(bonusToken), amount, l, r);

        (uint256 _amount, uint256 _l, uint256 _r) = toktok.bonusToken(address(bonusToken));
        assertEq(_amount, amount);
        assertEq(_l, l);
        assertEq(_r, r);
        assertEq(bonusToken.balanceOf(address(toktok)), bonusTokenBalanceContractBefore + amount);
        assertEq(bonusToken.balanceOf(receiver), bonusTokenBalanceReceiverBefore - amount);
    }

    function test_addBonusToken_reverts_ifBonusTokenAlreadySet() public {
        address receiver = toktok.owner();
        vm.startPrank(receiver);
        uint256 amount = 100 ether;
        MockERC20 bonusToken = new MockERC20("MockERC20", "MOCK", amount);
        bonusToken.approve(address(toktok), type(uint256).max);
        uint256 l = block.timestamp + 100;
        uint256 r = block.timestamp + 200;
        toktok.addBonusToken(address(bonusToken), amount, l, r);

        vm.expectRevert(abi.encodeWithSelector(TokTokNft.BonusTokenAlreadySet.selector, address(bonusToken)));
        toktok.addBonusToken(address(bonusToken), amount, l, r);
    }

    function test_addBonusToken_reverts_ifLeftIsLessThanCurrentTimestamp() public {
        vm.warp(100);
        address receiver = toktok.owner();
        vm.startPrank(receiver);
        uint256 amount = 100 ether;
        MockERC20 bonusToken = new MockERC20("MockERC20", "MOCK", amount);
        bonusToken.approve(address(toktok), type(uint256).max);

        uint256 l = block.timestamp - 1;
        uint256 r = block.timestamp + 200;

        vm.expectRevert(abi.encodeWithSelector(TokTokNft.InvalidInput.selector, l, r));
        toktok.addBonusToken(address(bonusToken), amount, l, r);
    }

    function test_addBonusToken_reverts_ifRightIsLessThanLeft() public {
        vm.warp(100);
        address receiver = toktok.owner();
        vm.startPrank(receiver);
        uint256 amount = 100 ether;
        MockERC20 bonusToken = new MockERC20("MockERC20", "MOCK", amount);
        bonusToken.approve(address(toktok), type(uint256).max);

        uint256 l = block.timestamp + 10;
        uint256 r = block.timestamp + 5;

        vm.expectRevert(abi.encodeWithSelector(TokTokNft.InvalidInput.selector, l, r));
        toktok.addBonusToken(address(bonusToken), amount, l, r);
    }

    function test_removeBonusToken_satisfiesRequirements() public {
        address receiver = toktok.owner();
        vm.startPrank(receiver);
        uint256 amount = 100 ether;
        MockERC20 bonusToken = new MockERC20("MockERC20", "MOCK", amount);
        bonusToken.approve(address(toktok), type(uint256).max);
        uint256 l = block.timestamp + 100;
        uint256 r = block.timestamp + 200;
        toktok.addBonusToken(address(bonusToken), amount, l, r);

        uint256 bonusTokenBalanceContractBefore = bonusToken.balanceOf(address(toktok));
        uint256 bonusTokenBalanceReceiverBefore = bonusToken.balanceOf(receiver);

        vm.expectEmit(true, true, true, true);
        emit TokTokNft.BonusTokenRemoved(address(bonusToken));
        toktok.removeBonusToken(address(bonusToken), receiver);

        (uint256 _amount, uint256 _l, uint256 _r) = toktok.bonusToken(address(bonusToken));
        assertEq(_amount, 0);
        assertEq(_l, 0);
        assertEq(_r, 0);
        assertEq(bonusToken.balanceOf(address(toktok)), bonusTokenBalanceContractBefore - amount);
        assertEq(bonusToken.balanceOf(receiver), bonusTokenBalanceReceiverBefore + amount);
    }

    function test_removeBonusToken_reverts_ifBonusTokenNotSet() public {
        address receiver = toktok.owner();
        vm.startPrank(receiver);
        address bonusToken = address(123);

        vm.expectRevert(abi.encodeWithSelector(TokTokNft.BonusTokenNotSet.selector, bonusToken));
        toktok.removeBonusToken(bonusToken, receiver);
    }

    function test_claimToken_satisfiesRequirements() public {
        // add a second participant to check for proper token ownership proportion
        address secondActor = _getRandomActor(1);
        vm.prank(secondActor);
        toktok.publicMint(3);

        address receiver = toktok.owner();
        vm.startPrank(receiver);
        payableToken.approve(address(toktok), type(uint256).max);
        uint256 tokenId = toktok.nextTokenId();
        toktok.publicMint(1);
        toktok.activate();

        uint256 bonusTokenAmount = 100 ether;
        MockERC20 bonusToken = new MockERC20("MockERC20", "MOCK", bonusTokenAmount);
        bonusToken.approve(address(toktok), type(uint256).max);
        uint256 l = 1;
        uint256 r = 1 + 365 days;
        toktok.addBonusToken(address(bonusToken), bonusTokenAmount, l, r);

        // warp to middle of the bonus period
        vm.warp((l + r) / 2);
        uint256 bonusTokenBalanceContractBefore = bonusToken.balanceOf(address(toktok));
        uint256 bonusTokenBalanceReceiverBefore = bonusToken.balanceOf(receiver);
        // whole yield, halved because we're in the middle of the period, quartered because receiver has quarter of issued
        uint256 expectedClaimAmount = (bonusTokenAmount / 2) / 4;

        toktok.claimToken(address(bonusToken), tokenId);

        assertEq(bonusToken.balanceOf(address(toktok)), bonusTokenBalanceContractBefore - expectedClaimAmount);
        assertEq(bonusToken.balanceOf(receiver), bonusTokenBalanceReceiverBefore + expectedClaimAmount);
    }

    function test_claimToken_multipleClaimYieldIsNotDoublespent() public {
        uint256 amount = 100;
        address receiver = toktok.owner();
        vm.startPrank(receiver);
        payableToken.approve(address(toktok), type(uint256).max);
        uint256 tokenId = toktok.nextTokenId();
        toktok.publicMint(amount);
        toktok.activate();

        uint256 bonusTokenAmount = 100 ether;
        MockERC20 bonusToken = new MockERC20("MockERC20", "MOCK", bonusTokenAmount);
        bonusToken.approve(address(toktok), type(uint256).max);
        uint256 l = 1;
        uint256 r = 1 + 365 days;
        toktok.addBonusToken(address(bonusToken), bonusTokenAmount, l, r);

        vm.warp((l + r) / 2);
        toktok.claimToken(address(bonusToken), tokenId);

        uint256 bonusTokenBalanceContractBefore = bonusToken.balanceOf(address(toktok));
        uint256 bonusTokenBalanceReceiverBefore = bonusToken.balanceOf(receiver);
        toktok.claimToken(address(bonusToken), tokenId);

        assertEq(bonusToken.balanceOf(address(toktok)), bonusTokenBalanceContractBefore);
        assertEq(bonusToken.balanceOf(receiver), bonusTokenBalanceReceiverBefore);
    }

    function test_claimToken_reverts_ifNotActive() public {
        vm.expectRevert(TokTokNft.NotActive.selector);
        toktok.claimToken(address(1), 2);
    }

    function test_claimToken_reverts_ifBonusTokenStartPeriodNotReached() public {
        uint256 bonusTokenAmount = 100 ether;
        MockERC20 bonusToken = new MockERC20("MockERC20", "MOCK", bonusTokenAmount);
        bonusToken.approve(address(toktok), type(uint256).max);
        uint256 l = block.timestamp + 100;
        uint256 r = l + 100;

        vm.startPrank(toktok.owner());
        toktok.activate();
        toktok.addBonusToken(address(bonusToken), bonusTokenAmount, l, r);

        vm.warp(l - 1);
        vm.expectRevert(abi.encodeWithSelector(TokTokNft.BonusTokenStartPeriodNotReached.selector, l, block.timestamp));
        toktok.claimToken(address(bonusToken), 1);
    }

    function test_pause_reverts_ifNotOwner() public {
        address sender = makeAddr("random");
        vm.startPrank(sender);
        vm.expectRevert(abi.encodeWithSelector(Ownable.OwnableUnauthorizedAccount.selector, sender));
        toktok.pause();
    }

    function test_unpause_reverts_ifNotOwner() public {
        address sender = makeAddr("random");
        vm.startPrank(sender);
        vm.expectRevert(abi.encodeWithSelector(Ownable.OwnableUnauthorizedAccount.selector, sender));
        toktok.unpause();
    }

    function test_setRoyaltyAddress_reverts_ifNotOwner() public {
        address sender = makeAddr("random");
        vm.startPrank(sender);
        vm.expectRevert(abi.encodeWithSelector(Ownable.OwnableUnauthorizedAccount.selector, sender));
        toktok.setRoyaltyAddress(address(0), 0);
    }

    function test_calcRemainBalance_satisfiesRequirements() public {
        address receiver = _getRandomActor(1);
        uint256 amount2 = 1;
        vm.startPrank(receiver);
        toktok.publicMint(amount2);

        receiver = _getRandomActor(2);
        uint256 amount = 1;
        vm.startPrank(receiver);
        uint256 tokenId = toktok.nextTokenId();
        toktok.publicMint(amount);

        vm.startPrank(toktok.owner());
        toktok.activate();
        toktok.withdraw(address(payableToken), payableToken.balanceOf(address(toktok)) - 10 ether, toktok.owner());
        vm.startPrank(receiver);

        uint256 timestamp = lendingAt;
        vm.warp(timestamp);
        (uint256 totalClaimable, uint256 totalNotYetClaimed, uint256 needPayableTokenAmount) =
            toktok.calcRemainBalance(timestamp);
        assertEq(totalClaimable, 0);
        assertEq(totalNotYetClaimed, 0);
        assertEq(needPayableTokenAmount, 0);

        timestamp = lendingAt + (lendingPeriod / 2);
        vm.warp(timestamp);
        uint256 balanceBefore = payableToken.balanceOf(receiver);
        toktok.claim(tokenId);
        uint256 claimedAmount = payableToken.balanceOf(receiver) - balanceBefore;

        uint256 expectedTotalClaimable =
            (amount + amount2) * price * yield * ((lendingPeriod / 2) * 1e18 / 365 days) / 1e18;
        uint256 expectedTotalNotYetClaimed = expectedTotalClaimable - claimedAmount;
        uint256 expectedNeedPayableTokenAmount = payableToken.balanceOf(address(toktok)) > expectedTotalNotYetClaimed
            ? 0
            : expectedTotalNotYetClaimed - payableToken.balanceOf(address(toktok));
        (totalClaimable, totalNotYetClaimed, needPayableTokenAmount) = toktok.calcRemainBalance(timestamp);
        assertEq(totalClaimable, expectedTotalClaimable);
        assertEq(totalNotYetClaimed, expectedTotalNotYetClaimed);
        assertEq(needPayableTokenAmount, expectedNeedPayableTokenAmount);
    }

    function test_supportsInterface_satisfiesRequirements() public {
        assertEq(toktok.supportsInterface(type(IERC721).interfaceId), true);
        assertEq(toktok.supportsInterface(type(IERC2981).interfaceId), true);
    }
}
