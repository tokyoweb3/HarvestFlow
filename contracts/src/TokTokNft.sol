// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Arrays} from "@openzeppelin/contracts/utils/Arrays.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC2981Upgradeable} from "@openzeppelin/contracts-upgradeable/token/common/ERC2981Upgradeable.sol";
import {ERC721AUpgradeable} from "erc721a-upgradeable/contracts/ERC721AUpgradeable.sol";
import {Math} from "@openzeppelin/contracts/utils/math/Math.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {PausableUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";

contract TokTokNft is ERC721AUpgradeable, ERC2981Upgradeable, OwnableUpgradeable, PausableUpgradeable {
    using Arrays for address[];
    using Arrays for uint256[];
    using ECDSA for bytes32;

    struct BonusTokenSettings {
        uint256 amount;
        uint256 l;
        uint256 r;
    }

    struct InitializationParams {
        /// @param name Name of the ERC1155
        string name;
        /// @param symbol Symbol of the ERC1155
        string symbol;
        /// @param cap Total cap of tokens to be issued
        uint256 cap;
        /// @param payable_token Address of the token used for payments
        address payable_token;
        /// @param price Price of one token
        uint256 price;
        /// @param lendingAt Start time of the lending agreement (when claims can begin)
        uint256 lendingAt;
        /// @param yield Minimum fixed interest rate scaled to the 1e18
        uint256 yield;
        /// @param lending_period Duration of the lending agreement
        uint256 lending_period;
        /// @param baseURI Base URI for the token
        string baseURI;
        /// @param owner Owner of the contract
        address owner;
        /// @param signerAddress Address of the signer for presale signatures
        address signerAddress;
    }

    uint256 constant year = 365 days;
    /// @notice Base URI for the token
    string public baseURI;
    /// @notice Total cap of NFTs to be issued
    uint256 public cap;
    /// @notice Address of the token used for payments
    ERC20 public payable_token;
    /// @notice Start time of the lending agreement (when claims can begin)
    uint256 public lendingAt;
    /// @notice Minimum fixed interest rate, scaled to the 1e18
    uint256 public yield;
    /// @notice Timestamp when the lending agreement matures
    uint256 public maturity;
    /// @notice Total amount of tokens claimed
    uint256 public totalClaimed;
    /// @notice Amount of interest already claimed for specific token ID
    mapping(uint256 tokenId => uint256 claimedInterest) public claimed;
    /// @notice Returns true if `tokenId` has been redeemed
    mapping(uint256 tokenId => bool redeemed) public redeemed;
    /// @notice Bonus token's settings
    mapping(address token => BonusTokenSettings) public bonusToken;
    /// @notice List of bonus tokens
    address[] public bonusTokenList;
    /// @notice Amount of claimed `token` by `tokenId`
    mapping(address token => mapping(uint256 tokenId => uint256 amount)) public claimedToken;
    /// @notice Returns if the presale phase is running
    bool public isPresale;
    /// @notice Returns if the public sale phase is running
    bool public isPublicsale;
    /// @notice Price of token in the presale phase
    uint256 public presalePrice;
    /// @notice Price of token in the public sale phase
    uint256 public publicPrice;
    /// @notice Address of the signer for presale signatures
    address public signerAddress;
    /// @notice Mapping of the amount of tokens minted by the user during the presale phase
    mapping(address user => uint256 minted) public whitelistUserMintedCount;
    /// @notice Is claiming enabled
    bool internal _isActive;
    /// @notice Decimals of the `payable_token`
    uint256 internal payable_token_decimals;

    event Activated();
    event BaseUriChanged(string newBaseURI);
    event BonusTokenAdded(address indexed token, uint256 amount, uint256 l, uint256 r);
    event BonusTokenClaimed(address indexed token, uint256 indexed tokenId, uint256 amount);
    event BonusTokenRemoved(address indexed token);
    event Claimed(address indexed receiver, uint256 indexed tokenId, uint256 amount);
    event Minted(address indexed receiver, uint256 indexed startTokenId, uint256 amount, uint256 cost);
    event Redeemed(address indexed receiver, uint256 indexed tokenId, uint256 amount);
    event Withdrawn(address indexed receiver, address indexed token, uint256 amount);

    error AlreadyRedeemed(uint256 tokenId);
    error BonusTokenAlreadySet(address token);
    error BonusTokenNotSet(address token);
    error BonusTokenStartPeriodNotReached(uint256 startPeriod, uint256 currentTimestamp);
    error CapReached(uint256 cap);
    error AmountZero();
    error InvalidInput(uint256 a, uint256 b);
    error InvalidSignature();
    error LendingAtPassed(uint256 lendingAt, uint256 currentTimestamp);
    error NotActive();
    error NotMaturedYet(uint256 maturity, uint256 currentTimestamp);
    error SaleOngoing();

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    /// @notice Initialize the contract
    /// @param params.name Name of the ERC1155
    /// @param params.symbol Symbol of the ERC1155
    /// @param params.cap Total cap of tokens to be issued
    /// @param params.payable_token Address of the token used for payments
    /// @param params.price Price of one token
    /// @param params.lendingAt Start time of the lending agreement (when claims can begin)
    /// @param params.yield Minimum params.fixed interest rate scaled to the 1e18
    /// @param params.lending_period Duration of the lending agreement
    /// @param params.baseURI Base URI for the token
    /// @param params.owner Owner of the contract
    /// @param params.signerAddress Address of the signer for presale signatures
    function initialize(InitializationParams memory params) public initializerERC721A initializer {
        __ERC721A_init(params.name, params.symbol);
        __Ownable_init(params.owner);
        __Pausable_init();

        cap = params.cap;
        payable_token = ERC20(params.payable_token);
        lendingAt = params.lendingAt;
        yield = params.yield;
        presalePrice = params.price;
        publicPrice = params.price;
        signerAddress = params.signerAddress;
        baseURI = params.baseURI;

        maturity = params.lendingAt + params.lending_period;
        payable_token_decimals = ERC20(params.payable_token).decimals();
    }

    /// @notice Mint `mintAmount` of tokens during active public sale phase by paying `mintAmount * publicPrice` of `payable_token`.
    /// @param mintAmount Amount of tokens to mint
    /// @return tokenId Starting token ID of the consecutive list of minted tokens
    function publicMint(uint256 mintAmount) public whenNotPaused returns (uint256) {
        if (block.timestamp > lendingAt) {
            revert LendingAtPassed(lendingAt, block.timestamp);
        }
        if (!isPublicsale) {
            revert NotActive();
        }
        uint256 cappedMintAmount = _mintCheck(mintAmount);

        uint256 cost = cappedMintAmount * publicPrice;
        payable_token.transferFrom(msg.sender, address(this), cost);

        uint256 tokenId = _nextTokenId();
        _mint(msg.sender, cappedMintAmount);

        emit Minted(msg.sender, tokenId, cappedMintAmount, cost);
        return tokenId;
    }

    /// @notice Mint `mintAmount` of tokens during active presale phase by paying `mintAmount * presalePrice` of `payable_token`.
    /// Maximum mint amount is capped by `maxMintAmount`, which is validated along with the signer address eligibility by the `signature`.
    /// @param mintAmount Amount of tokens to mint
    /// @param maxMintAmount Maximum amount a user is allowed to mint, validated against the signature
    /// @param signature Cryptographic signature to verify the caller's eligibility
    /// @return tokenId Starting token ID of the consecutive list of minted tokens
    function preMint(uint256 mintAmount, uint256 maxMintAmount, bytes memory signature)
        public
        whenNotPaused
        returns (uint256)
    {
        if (block.timestamp > lendingAt) {
            revert LendingAtPassed(lendingAt, block.timestamp);
        }
        if (!isPresale) {
            revert NotActive();
        }

        uint256 cappedMintAmount =
            Math.min(_mintCheck(mintAmount), maxMintAmount - whitelistUserMintedCount[msg.sender]);
        if (cappedMintAmount == 0) {
            revert CapReached(maxMintAmount);
        }

        uint256 cost = cappedMintAmount * presalePrice;
        payable_token.transferFrom(msg.sender, address(this), cost);
        whitelistUserMintedCount[msg.sender] += cappedMintAmount;

        _verifyAddressSigner(signature, maxMintAmount);

        uint256 tokenId = _nextTokenId();
        _mint(msg.sender, cappedMintAmount);

        emit Minted(msg.sender, tokenId, cappedMintAmount, cost);
        return tokenId;
    }

    /// @notice Returns the next token ID to be minted.
    function nextTokenId() public view returns (uint256) {
        return _nextTokenId();
    }

    /// @notice Toggle the state of the sale. Can be executed only by the owner.
    /// @param value Enable or disable presale phase
    function setPresale(bool value) public onlyOwner whenNotPaused {
        isPresale = value;
    }

    /// @notice Toggle the state of the sale. Can be executed only by the owner.
    /// @param value Enable or disable public sale phase
    function setPublicsale(bool value) public onlyOwner whenNotPaused {
        isPublicsale = value;
    }

    /// @notice Set the presale price of token. Can be executed only by the owner and only if presale is not happening yet.
    /// @param value Price of token in the presale phase
    function setPresalePrice(uint256 value) public onlyOwner whenNotPaused {
        if (isPresale) {
            revert SaleOngoing();
        }
        presalePrice = value;
    }

    /// @notice Set the public sale price of token. Can be executed only by the owner and only if public sale is not happening yet.
    /// @param value Price of token in the public sale phase
    function setPublicPrice(uint256 value) public onlyOwner whenNotPaused {
        if (isPublicsale) {
            revert SaleOngoing();
        }
        publicPrice = value;
    }

    /// @notice Enables users to claim and redeem. Can be executed only by the owner.
    function activate() public onlyOwner whenNotPaused {
        _isActive = true;
        emit Activated();
    }

    /// @notice Update the base URI of the token. Can be executed only by the owner.
    function setBaseURI(string memory newBaseURI) public onlyOwner whenNotPaused {
        baseURI = newBaseURI;
        emit BaseUriChanged(newBaseURI);
    }

    /// @notice Claim interest accrued on a specific `tokenId`.
    /// @param tokenId Token ID to claim interest for
    /// @dev Only callable when the contract is active
    function claim(uint256 tokenId) public whenNotPaused {
        if (!_isActive) revert NotActive();

        uint256 claimableInterest = _calculateClaim(tokenId);
        claimed[tokenId] += claimableInterest;
        totalClaimed += claimableInterest;

        address owner = ownerOf(tokenId);
        payable_token.transfer(owner, claimableInterest);
        emit Claimed(owner, tokenId, claimableInterest);
    }

    /// @notice Claim interest accrued on multiple specific `tokenIds`.
    /// @param tokenIds Array of token IDs to claim interest for
    /// @dev Only callable when the contract is active
    function claimAll(uint256[] memory tokenIds) public whenNotPaused {
        if (!_isActive) revert NotActive();

        uint256 claimableInterestCurrentOwner;
        address lastOwner = ownerOf(tokenIds[0]);
        for (uint256 i; i < tokenIds.length;) {
            uint256 tokenId = tokenIds.unsafeMemoryAccess(i);
            address owner = ownerOf(tokenId);
            if (owner != lastOwner) {
                totalClaimed += claimableInterestCurrentOwner;
                payable_token.transfer(lastOwner, claimableInterestCurrentOwner);
                claimableInterestCurrentOwner = 0;
            }
            lastOwner = owner;
            uint256 claimableInterest = _calculateClaim(tokenId);
            claimed[tokenId] += claimableInterest;
            claimableInterestCurrentOwner += claimableInterest;
            emit Claimed(owner, tokenId, claimableInterest);
            unchecked {
                ++i;
            }
        }
        totalClaimed += claimableInterestCurrentOwner;
        payable_token.transfer(lastOwner, claimableInterestCurrentOwner);
    }

    /// @notice Claim interest accrued on a specific `tokenId` and redeem the principal.
    /// @param tokenId Token ID to claim interest and redeem principal for
    /// @dev Only callable when the contract is active (checked in `claim` function call)
    function redeem(uint256 tokenId) public whenNotPaused {
        if (redeemed[tokenId]) {
            revert AlreadyRedeemed(tokenId);
        }
        if (block.timestamp < maturity) {
            revert NotMaturedYet(maturity, block.timestamp);
        }
        claim(tokenId);

        address owner = ownerOf(tokenId);
        redeemed[tokenId] = true;
        payable_token.transfer(owner, publicPrice);

        emit Redeemed(owner, tokenId, publicPrice);
    }

    /// @notice Claim interest accrued on an array of specific `tokenIds` and redeem the principals.
    /// @param tokenIds Array of token IDs to claim interest and redeem principal for
    /// @dev Only callable when the contract is active (checked in `claim` function call)
    function redeemAll(uint256[] memory tokenIds) public whenNotPaused {
        if (block.timestamp < maturity) {
            revert NotMaturedYet(maturity, block.timestamp);
        }
        claimAll(tokenIds);

        uint256 claimablePrincipalCurrentOwner;
        address lastOwner = ownerOf(tokenIds[0]);
        for (uint256 i; i < tokenIds.length;) {
            uint256 tokenId = tokenIds.unsafeMemoryAccess(i);
            if (redeemed[tokenId]) {
                revert AlreadyRedeemed(tokenId);
            }
            address owner = ownerOf(tokenId);
            if (owner != lastOwner) {
                payable_token.transfer(lastOwner, claimablePrincipalCurrentOwner);
                claimablePrincipalCurrentOwner = 0;
            }
            lastOwner = owner;
            uint256 claimablePrincipal = publicPrice;
            claimablePrincipalCurrentOwner += claimablePrincipal;
            redeemed[tokenId] = true;
            emit Redeemed(owner, tokenId, claimablePrincipal);
            unchecked {
                ++i;
            }
        }
        payable_token.transfer(lastOwner, claimablePrincipalCurrentOwner);
    }

    /// @notice Withdraw specified `amount` of `token` from the contract. Can be executed only by the owner.
    /// @param token Address of the token to withdraw
    /// @param amount Amount of the token to withdraw
    /// @param receiver Recipient of the withdrawn tokens
    function withdraw(address token, uint256 amount, address receiver) public onlyOwner whenNotPaused {
        if (token == address(0)) {
            payable(receiver).transfer(amount);
        } else {
            ERC20(token).transfer(receiver, amount);
        }

        emit Withdrawn(receiver, token, amount);
    }

    /// @notice Add `amount` of bonus `token` to the contract, with yielding period from `l` to `r`. Can be executed only by the owner.
    /// @param token Address of the token to add
    /// @param amount Amount of the token to add
    /// @param l Start time of the yielding period
    /// @param r End time of the yielding period
    function addBonusToken(address token, uint256 amount, uint256 l, uint256 r) public onlyOwner whenNotPaused {
        if (bonusToken[token].amount > 0) {
            revert BonusTokenAlreadySet(token);
        }
        if (l < block.timestamp || l > r) {
            revert InvalidInput(l, r);
        }

        ERC20(token).transferFrom(msg.sender, address(this), amount);

        bonusToken[token] = BonusTokenSettings(amount, l, r);
        bonusTokenList.push(token);

        emit BonusTokenAdded(token, amount, l, r);
    }

    /// @notice Remove bonus `token` from the contract, transferring the remaining balance to `receiver`. Can be executed only by the owner.
    /// @param token Address of the token to remove
    /// @param receiver Recipient of the remaining balance
    function removeBonusToken(address token, address receiver) public onlyOwner whenNotPaused {
        if (bonusToken[token].amount == 0) {
            revert BonusTokenNotSet(token);
        }
        delete bonusToken[token];

        for (uint256 i = 0; i < bonusTokenList.length; i++) {
            if (bonusTokenList[i] == token) {
                bonusTokenList[i] = bonusTokenList[bonusTokenList.length - 1];
                bonusTokenList.pop();
                break;
            }
        }

        ERC20(token).transfer(receiver, ERC20(token).balanceOf(address(this)));

        emit BonusTokenRemoved(token);
    }

    /// @notice Claim bonus `token` for `tokenId`.
    /// @param token Address of the bonus token to claim
    /// @param tokenId Token ID to claim bonus for
    function claimToken(address token, uint256 tokenId) public whenNotPaused {
        if (!_isActive) revert NotActive();
        BonusTokenSettings memory settings = bonusToken[token];
        if (block.timestamp < settings.l) {
            revert BonusTokenStartPeriodNotReached(settings.l, block.timestamp);
        }

        // Proportion of time interval, scaled to the 1e18
        uint256 proportionOfIntervalScaled =
            ((Math.min(settings.r, block.timestamp) - settings.l) * 1e18) / (settings.r - settings.l);

        // Amount of token to be sent
        uint256 sendAmount =
            ((((settings.amount * proportionOfIntervalScaled) / 1e18) / totalSupply()) - claimedToken[token][tokenId]);

        claimedToken[token][tokenId] += sendAmount;
        ERC20(token).transfer(ownerOf(tokenId), sendAmount);

        emit BonusTokenClaimed(token, tokenId, sendAmount);
    }

    /// @notice To temporarily suspend the operation of the smart contract. Callable only by the owner.
    function pause() public onlyOwner {
        _pause();
    }

    /// @notice Resume the operation of the smart contract. Callable only by the owner.
    function unpause() public onlyOwner {
        _unpause();
    }

    /// @notice Set the address of the royalty recipient.
    /// @param _royaltyAddress Address of the royalty recipient
    /// @param _royaltyFee Fee to be paid to the royalty recipient expressed in basis points
    function setRoyaltyAddress(address _royaltyAddress, uint96 _royaltyFee) public onlyOwner whenNotPaused {
        _setDefaultRoyalty(_royaltyAddress, _royaltyFee);
    }

    /// @notice Calculate the balance the contract needs to have for claims until timestamp `until`.
    /// @param until Timestamp until which to calculate the balance the contract needs to have for claims
    /// @return totalClaimable Total amount of tokens claimable
    /// @return totalNotYetClaimed Total amount of tokens not yet claimed
    /// @return needPayableTokenAmount Total amount of tokens the contract needs to have for claims
    function calcRemainBalance(uint256 until)
        public
        view
        returns (uint256 totalClaimable, uint256 totalNotYetClaimed, uint256 needPayableTokenAmount)
    {
        // Annual yield of payment tokens scaled to the 1e18
        uint256 annualYieldScaled = publicPrice * yield * totalSupply();

        // Proportion of time interval, scaled to the 1e18
        uint256 proportionOfIntervalScaled = ((Math.min(until, maturity) - lendingAt) * 1e18) / year;

        // Amount of claimable tokens, scaled to the 1e18
        uint256 totalClaimableScaled = ((annualYieldScaled * proportionOfIntervalScaled) / 1e18);

        // Scale the amount of claimable tokens to the payable token's decimals
        totalClaimable = (totalClaimableScaled * 10 ** payable_token_decimals) / 1e18;

        totalNotYetClaimed = totalClaimable - totalClaimed;
        uint256 balance = payable_token.balanceOf(address(this));
        needPayableTokenAmount = balance > totalNotYetClaimed ? 0 : totalNotYetClaimed - balance;
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721AUpgradeable, ERC2981Upgradeable)
        returns (bool)
    {
        return ERC721AUpgradeable.supportsInterface(interfaceId) || ERC2981Upgradeable.supportsInterface(interfaceId);
    }

    /// @notice Check that `mintAmount` is not zero and mint cap has not been reached.
    /// @param mintAmount Amount of tokens to mint
    /// @return cappedMintAmount Amount of tokens to mint, capped by the difference between the mint cap and current total minted amount.
    function _mintCheck(uint256 mintAmount) internal view returns (uint256) {
        if (mintAmount == 0) {
            revert AmountZero();
        }

        uint256 cappedMintAmount = Math.min(mintAmount, cap - _totalMinted());
        if (cappedMintAmount == 0) {
            revert CapReached(cap);
        }
        return cappedMintAmount;
    }

    /// @notice Return the base URI of the token.
    /// @dev Overriden function of ERC721A
    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    /// @notice Starts at 1 because 0 is reserved for a non-existent token ID in default value of `tokenOf` mapping.
    /// @dev Overriden function of ERC721A
    function _startTokenId() internal pure override returns (uint256) {
        return 1;
    }

    /// @notice Verify the `signature` is a hash of `msg.sender` and `maxMintAmount`, signed by the `signerAddress`.
    function _verifyAddressSigner(bytes memory signature, uint256 maxMintAmount) internal view {
        bytes32 hash = keccak256(abi.encodePacked(msg.sender, maxMintAmount));
        if (hash.recover(signature) != signerAddress) {
            revert InvalidSignature();
        }
    }

    /// @notice Calculate claimable interest accrued on a specific `tokenId`.
    /// @param tokenId Token ID to claim interest for
    function _calculateClaim(uint256 tokenId) internal view returns (uint256) {
        // Annual yield of payment tokens scaled to the payable token decimals
        uint256 annualYield = (publicPrice * yield) / 1e18;

        // Proportion of time interval from the beginning of lending period until now to a year, scaled to the 1e18
        uint256 proportionOfIntervalTotalScaled = ((Math.min(block.timestamp, maturity) - lendingAt) * 1e18) / year;

        // Scale the claimable interest to the payable token's decimals and subtract already claimed amount
        uint256 claimableInterest = ((annualYield * proportionOfIntervalTotalScaled) / 1e18) - claimed[tokenId];

        return Math.min(claimableInterest, payable_token.balanceOf(address(this)));
    }
}
