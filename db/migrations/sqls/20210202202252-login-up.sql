-- crate table sys_users
CREATE TABLE sys_users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
  name varchar(255),
  email varchar(255),
  email_verified timestamptz,
  image text,
  active boolean DEFAULT TRUE,
  created timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated timestamptz
);

CREATE TRIGGER set_timestamp
  BEFORE UPDATE ON sys_users
  FOR EACH ROW
  EXECUTE PROCEDURE trigger_set_timestamp ();

CREATE TABLE sys_tokens (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
  token varchar(255) NOT NULL,
  identifier varchar(255) NOT NULL,
  type varchar(255) NOT NULL,
  expires timestamptz NOT NULL,
  created timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated timestamptz
);

CREATE TRIGGER set_timestamp
  BEFORE UPDATE ON sys_tokens
  FOR EACH ROW
  EXECUTE PROCEDURE trigger_set_timestamp ();

