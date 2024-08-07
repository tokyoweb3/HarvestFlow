-- Generic paima engine table, that can't be modified
CREATE TABLE block_heights ( 
  block_height INTEGER PRIMARY KEY,
  seed TEXT NOT NULL,
  done BOOLEAN NOT NULL DEFAULT false
);

-- Extend the schema to fit your needs
CREATE DOMAIN UINT256 AS NUMERIC
CHECK (VALUE >= 0 AND VALUE < 2^256)
CHECK (SCALE(VALUE) = 0);

CREATE TABLE contracts (
   name TEXT NOT NULL,
   symbol VARCHAR(6) NOT NULL,
   chain_id TEXT NOT NULL,
   address TEXT NOT NULL,
   supply_cap UINT256 NOT NULL,
   minted_amount UINT256 NOT NULL DEFAULT 0,
   lease_start timestamp NOT NULL,
   lease_end timestamp NOT NULL,
   min_yield UINT256 NOT NULL DEFAULT 0,
   accepted_token TEXT NOT NULL,
   price UINT256 NOT NULL,
   metadata_base_url TEXT,
   activated BOOLEAN NOT NULL DEFAULT false,

   PRIMARY KEY (chain_id, address)
);

CREATE TABLE tokens (
   chain_id TEXT NOT NULL,
   contract_address TEXT NOT NULL,
   token_id UINT256 NOT NULL,
   owner_address TEXT NOT NULL,
   yield_claimed UINT256 NOT NULL DEFAULT 0,
   redeemed BOOLEAN NOT NULL DEFAULT false,
   PRIMARY KEY (chain_id, contract_address, token_id)
);

CREATE TABLE transaction_history (
   type VARCHAR(10) NOT NULL,
   chain_id TEXT NOT NULL,
   contract_address TEXT NOT NULL,
   token_id UINT256,
   amount UINT256,
   timestamp timestamp NOT NULL,
   tx_hash TEXT NOT NULL,
   PRIMARY KEY (chain_id, contract_address, token_id, type, timestamp)
);

CREATE TABLE points (
    user_address TEXT NOT NULL,
    balance NUMERIC(20,6) NOT NULL DEFAULT 0,
    PRIMARY KEY (user_address)
);