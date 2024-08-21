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
   presale_price UINT256 NOT NULL,
   publicsale_price UINT256 NOT NULL,
   metadata_base_url TEXT,
   activated BOOLEAN NOT NULL DEFAULT false,
   owner TEXT NOT NULL,
   signer_address TEXT NOT NULL,
   is_presale BOOLEAN NOT NULL,
   is_publicsale BOOLEAN NOT NULL,

   PRIMARY KEY (chain_id, address)
);

CREATE TABLE tokens (
   chain_id TEXT NOT NULL,
   contract_address TEXT NOT NULL,
   token_id UINT256 NOT NULL,
   minter_address TEXT NOT NULL,
   yield_claimed UINT256 NOT NULL DEFAULT 0,
   redeemed BOOLEAN NOT NULL DEFAULT false,
   PRIMARY KEY (chain_id, contract_address, token_id)
);

CREATE TABLE transaction_history (
   type VARCHAR(10) NOT NULL,
   chain_id TEXT NOT NULL,
   -- keep track of the owner when this action was made. We have to do this, as owners can change over time
   owner_address TEXT NOT NULL,
   contract_address TEXT NOT NULL,
   token_id UINT256,
   amount UINT256,
   timestamp timestamp NOT NULL,
   evm_tx_hash TEXT NOT NULL,
   paima_tx_hash TEXT NOT NULL,
   -- we don't support logIndex in Paima yet
   -- so we use the Paima tx hash as part of the primary key
   -- https://github.com/PaimaStudios/paima-engine/issues/412
   PRIMARY KEY (chain_id, contract_address, token_id, type, paima_tx_hash)
);

CREATE TABLE points (
    user_address TEXT NOT NULL,
    balance NUMERIC(20,6) NOT NULL DEFAULT 0,
    PRIMARY KEY (user_address)
);