/*
 @name activateContract
 */
UPDATE contracts
SET activated = TRUE
WHERE contracts.address = LOWER(:contractAddress) AND contracts.chain_id = :chainId!;

/*
 @name addMintedAmount
 */

UPDATE contracts
SET minted_amount = minted_amount + :amount!
WHERE contracts.address = LOWER(:contractAddress) AND contracts.chain_id = :chainId!;

/*
 @name addClaimedAmountToToken
 */

UPDATE tokens
SET yield_claimed = yield_claimed + :amount!
WHERE tokens.contract_address = LOWER(:contractAddress) AND tokens.chain_id = :chainId! AND tokens.token_id = :tokenId!;

/*
 @name setTokenRedeemed
 */
UPDATE tokens
SET redeemed = TRUE
WHERE tokens.contract_address = LOWER(:contractAddress) AND tokens.chain_id = :chainId! AND tokens.token_id = :tokenId!;