-- crate table users
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
  name varchar(255),
  email varchar(255),
  email_verified timestamptz,
  image text,
  active boolean DEFAULT TRUE,
  created timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated timestamptz
);

