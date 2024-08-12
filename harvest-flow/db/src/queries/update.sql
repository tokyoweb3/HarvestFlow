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

/*
 @name setBaseUri
 */
UPDATE contracts
SET metadata_base_url = :base_uri!
WHERE contracts.address = LOWER(:contractAddress) AND contracts.chain_id = :chainId!;

/*
 @name setPresaleStatus
 */
UPDATE contracts
SET is_presale = :status!
WHERE contracts.address = LOWER(:contractAddress) AND contracts.chain_id = :chainId!;

/*
 @name setPresalePrice
 */
UPDATE contracts
SET presale_price = :price!
WHERE contracts.address = LOWER(:contractAddress) AND contracts.chain_id = :chainId!;

/*
 @name setPublicsaleStatus
 */
UPDATE contracts
SET is_publicsale = :status!
WHERE contracts.address = LOWER(:contractAddress) AND contracts.chain_id = :chainId!;

/*
 @name setPublicsalePrice
 */
UPDATE contracts
SET publicsale_price = :price!
WHERE contracts.address = LOWER(:contractAddress) AND contracts.chain_id = :chainId!;
