CREATE TABLE accounts (
  id serial,
  compound_id varchar(255) NOT NULL,
  user_id integer NOT NULL,
  provider_type varchar(255) NOT NULL,
  provider_id varchar(255) NOT NULL,
  provider_account_id varchar(255) NOT NULL,
  refresh_token text,
  access_token text,
  access_token_expires timestamptz,
  created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE sessions (
  id serial,
  user_id integer NOT NULL,
  expires timestamptz NOT NULL,
  session_token varchar(255) NOT NULL,
  access_token varchar(255) NOT NULL,
  created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE users (
  id serial,
  name varchar(255),
  email varchar(255),
  email_verified timestamptz,
  image text,
  created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE verification_requests (
  id serial,
  identifier varchar(255) NOT NULL,
  token varchar(255) NOT NULL,
  expires timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE UNIQUE INDEX compound_id ON accounts (compound_id);

CREATE INDEX provider_account_id ON accounts (provider_account_id);

CREATE INDEX provider_id ON accounts (provider_id);

CREATE INDEX user_id ON accounts (user_id);

CREATE UNIQUE INDEX session_token ON sessions (session_token);

CREATE UNIQUE INDEX access_token ON sessions (access_token);

CREATE UNIQUE INDEX email ON users (email);

CREATE UNIQUE INDEX token ON verification_requests (token);

