/*
 @name insertMint
 */
INSERT INTO ownerships (
    chain_id,
    contract_address,
    token_id,
    owner_address,
    amount
) VALUES (
    LOWER(:chainId!),
    LOWER(:contract_address!),
    :token_id!,
    LOWER(:owner_address!),
    :amount!
);

/*
 @name saveTransaction
 */

 INSERT INTO transaction_history (
    type,
    chain_id,
    contract_address,
    token_id,
    amount,
    timestamp
 )  VALUES (
    :type!,
    LOWER(:chainId!),
    LOWER(:contract_address!),
    :token_id!,
    :amount!,
    :timestamp!
 );