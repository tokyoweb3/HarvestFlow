/* @name getContract */
SELECT *
FROM contracts
WHERE contracts.chain_id = :chain_id AND contracts.address = LOWER(:address);

/* @name getHistoryForNft */
SELECT *
FROM transaction_history
WHERE transaction_history.chain_id = LOWER(:chain_id) AND transaction_history.contract_address = LOWER(:contract_address) AND transaction_history.token_id = :token_id;

/* @name getHistoryForUser */
SELECT transaction_history.contract_address,
       transaction_history.type,
       transaction_history.amount,
       transaction_history.timestamp,
       transaction_history.tx_hash,
       contracts.name
FROM transaction_history
    INNER JOIN ownerships ON transaction_history.chain_id = ownerships.chain_id AND transaction_history.contract_address = ownerships.contract_address AND transaction_history.token_id = ownerships.token_id
    INNER JOIN contracts ON transaction_history.chain_id = contracts.chain_id AND transaction_history.contract_address = contracts.address
WHERE ownerships.owner_address = LOWER(:owner_address);

