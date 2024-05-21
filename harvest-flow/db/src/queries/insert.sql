/*
 @name insertToken
 */
INSERT INTO tokens (
    chain_id,
    contract_address,
    token_id,
    owner_address
) VALUES (
    LOWER(:chainId!),
    LOWER(:contract_address!),
    :token_id!,
    LOWER(:owner_address!)
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
    timestamp,
    tx_hash
 )  VALUES (
    :type!,
    LOWER(:chainId!),
    LOWER(:contract_address!),
    :token_id!,
    :amount!,
    :timestamp!,
    :tx_hash!
 );

/*
    @name addPoints
*/
INSERT INTO points (user_address, balance)
VALUES (LOWER(:user_address!), :amount!)
ON CONFLICT (user_address)
   DO UPDATE SET balance = points.balance + :amount!;