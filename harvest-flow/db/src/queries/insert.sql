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

/*
    @name saveNewContract
 */
INSERT INTO contracts (name,
                       symbol,
                       chain_id,
                       address,
                       supply_cap,
                       lease_start,
                       lease_end,
                       min_yield,
                       accepted_token,
                       price,
                       metadata_base_url,
                       owner,
                       signer_address,
                       is_presale,
                       is_publicsale)
VALUES (:name!,
        :symbol!,
        LOWER(:chain_id!),
        LOWER(:address!),
        :supply_cap!,
        :lease_start!,
        :lease_end!,
        :min_yield!,
        LOWER(:accepted_token!),
        :price!,
        :metadata_base_url!,
        :owner!,
        :signer_address!,
        :is_presale!,
        :is_publicsale!);