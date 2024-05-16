/* @name getContract */
SELECT *
FROM contracts
WHERE contracts.chain_id = :chain_id AND contracts.address = LOWER(:address);

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

