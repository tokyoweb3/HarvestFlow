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
       transaction_history.tx_hash,
       contracts.name
FROM transaction_history
    INNER JOIN tokens ON transaction_history.chain_id = tokens.chain_id AND transaction_history.contract_address = tokens.contract_address AND transaction_history.token_id = tokens.token_id
    INNER JOIN contracts ON transaction_history.chain_id = contracts.chain_id AND transaction_history.contract_address = contracts.address
WHERE tokens.owner_address = LOWER(:owner_address);

/* @name getTokenDetails */
SELECT tokens.yield_claimed,
       tokens.redeemed,
       contracts.name,
       contracts.lease_start,
       contracts.lease_end,
       contracts.min_yield,
       contracts.price,
       contracts.metadata_base_url
FROM tokens
   INNER JOIN contracts ON tokens.chain_id = contracts.chain_id AND tokens.contract_address = contracts.address
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
       contracts.price,
       contracts.metadata_base_url
FROM tokens
    INNER JOIN contracts ON tokens.chain_id = contracts.chain_id AND tokens.contract_address = contracts.address
WHERE tokens.owner_address = LOWER(:owner_address);

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
    t.owner_address,
    c.price,
    c.lease_start,
    c.lease_end,
    ARRAY_AGG(t.token_id) AS token_ids
FROM
    tokens t
        JOIN
    contracts c
    ON
        t.chain_id = c.chain_id AND
        t.contract_address = c.address
WHERE
    t.redeemed = false
GROUP BY
    t.owner_address,
    c.price,
    c.lease_start,
    c.lease_end;

/* @name getTotalLoaned */
SELECT SUM(c.price) AS total_token_prices
FROM tokens t
   JOIN contracts c
   ON t.chain_id = c.chain_id AND t.contract_address = c.address;

/* @name getTotalRepaid */
SELECT SUM(t.yield_claimed + CASE WHEN t.redeemed THEN c.price ELSE 0 END) AS total_repaid_amount
FROM tokens t
    JOIN contracts c
    ON t.chain_id = c.chain_id AND t.contract_address = c.address;

/* @name getOwnersCount */
SELECT COUNT(DISTINCT owner_address) AS total_unique_owners
FROM tokens;






