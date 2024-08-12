/* @name getContract */
SELECT *
FROM contracts
WHERE contracts.chain_id = :chain_id AND contracts.address = LOWER(:address);

/* @name getContractsList */
SELECT name,
       symbol,
       address,
       chain_id,
       lease_start,
       lease_end
FROM contracts
WHERE (activated = :just_activated)
    OR (:just_activated = false);

/* @name getHistoryForContract */
SELECT *
FROM transaction_history
WHERE transaction_history.chain_id = LOWER(:chain_id) AND transaction_history.contract_address = LOWER(:contract_address);

/* @name getHistoryForUser */
SELECT transaction_history.contract_address,
       transaction_history.type,
       transaction_history.amount,
       transaction_history.timestamp,
       transaction_history.evm_tx_hash,
       contracts.name
FROM transaction_history
    INNER JOIN tokens ON transaction_history.chain_id = tokens.chain_id AND transaction_history.contract_address = tokens.contract_address AND transaction_history.token_id = tokens.token_id
    INNER JOIN contracts ON transaction_history.chain_id = contracts.chain_id AND transaction_history.contract_address = contracts.address
WHERE transaction_history.owner_address = LOWER(:owner_address);

/* @name getTokenDetails */
SELECT tokens.yield_claimed,
       tokens.redeemed,
       contracts.name,
       contracts.lease_start,
       contracts.lease_end,
       contracts.min_yield,
       contracts.presale_price,
       contracts.publicsale_price,
       contracts.metadata_base_url,
       h.amount as "amount!"
FROM tokens
   INNER JOIN contracts ON tokens.chain_id = contracts.chain_id AND tokens.contract_address = contracts.address
   INNER JOIN transaction_history h
        ON tokens.chain_id = h.chain_id AND
           tokens.contract_address = h.contract_address AND
           tokens.token_id = h.token_id AND
           h.type = 'mint'
WHERE tokens.chain_id = :chain_id AND tokens.contract_address = LOWER(:contract_address) AND tokens.token_id = :token_id;

/* @name getUserTokens */
SELECT tokens.chain_id,
       tokens.contract_address,
       tokens.token_id,
       tokens.yield_claimed,
       tokens.redeemed,
       contracts.name,
       contracts.lease_start,
       contracts.lease_end,
       contracts.min_yield,
       contracts.presale_price,
       contracts.publicsale_price,
       contracts.metadata_base_url,
       h.amount as "amount!"
FROM cde_erc721_data
JOIN cde_dynamic_primitive_config
    ON cde_dynamic_primitive_config.cde_name = cde_erc721_data.cde_name
JOIN chain_data_extensions
    ON cde_dynamic_primitive_config.cde_name = chain_data_extensions.cde_name
JOIN tokens
    ON LOWER(cde_dynamic_primitive_config.config->>'contractAddress') = tokens.contract_address
    AND tokens.chain_id = chain_data_extensions.cde_caip2
    AND tokens.token_id::TEXT = cde_erc721_data.token_id
JOIN contracts
    ON tokens.chain_id = contracts.chain_id AND tokens.contract_address = contracts.address
INNER JOIN transaction_history h
    ON tokens.chain_id = h.chain_id AND
        tokens.contract_address = h.contract_address AND
        tokens.token_id = h.token_id AND
        h.type = 'mint'
WHERE cde_erc721_data.nft_owner = LOWER(:owner_address);

/* @name getUserPoints */
SELECT balance
FROM points
WHERE user_address = LOWER(:user_address);

/* @name getUserRankWithPoints */
WITH ranked_users AS (
    SELECT
        user_address,
        balance,
        RANK() OVER (ORDER BY balance DESC) AS rank
    FROM
        points
)
SELECT
    user_address,
    balance,
    rank
FROM
    ranked_users
WHERE
    user_address = LOWER(:user_address);

/* @name getActiveTokensByUsersAndContract */
SELECT
    cde_erc721_data.nft_owner,
    c.lease_start,
    c.lease_end,
    h.amount as "amount!",
    ARRAY_AGG(t.token_id) AS token_ids
FROM cde_erc721_data
JOIN cde_dynamic_primitive_config
    ON cde_dynamic_primitive_config.cde_name = cde_erc721_data.cde_name
JOIN chain_data_extensions
    ON cde_dynamic_primitive_config.cde_name = chain_data_extensions.cde_name
JOIN tokens t
    ON LOWER(cde_dynamic_primitive_config.config->>'contractAddress') = t.contract_address
    AND t.chain_id = chain_data_extensions.cde_caip2
    AND t.token_id::TEXT = cde_erc721_data.token_id
JOIN contracts c
    ON t.chain_id = c.chain_id AND t.contract_address = c.address
INNER JOIN transaction_history h
    ON t.chain_id = h.chain_id AND
        t.contract_address = h.contract_address AND
        t.token_id = h.token_id AND
        h.type = 'mint'
WHERE
    t.redeemed = false
GROUP BY
    cde_erc721_data.nft_owner,
    h.amount,
    c.lease_start,
    c.lease_end;

/* @name getTotalLoaned */
SELECT SUM(h.amount) AS total_token_prices
FROM transaction_history h
WHERE h.type = 'mint';

/* @name getTotalRepaid */
SELECT SUM(t.yield_claimed + CASE WHEN t.redeemed THEN h.amount ELSE 0 END) AS total_repaid_amount
FROM tokens t
    JOIN transaction_history h
    ON
        t.chain_id = h.chain_id AND
        t.contract_address = h.contract_address AND
        t.token_id = h.token_id AND
        h.type = 'mint';

/* @name getOwnersCount */
SELECT COUNT(DISTINCT nft_owner) AS total_unique_owners
FROM cde_erc721_data;
