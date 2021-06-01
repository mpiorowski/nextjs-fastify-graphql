-- categories table
CREATE TABLE chat (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
  "userId" uuid NOT NULL REFERENCES sys_users (id) ON DELETE RESTRICT,
  content varchar(40) NOT NULL,
  active boolean DEFAULT TRUE,
  created timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated timestamptz
);

CREATE TRIGGER set_timestamp
  BEFORE UPDATE ON chat
  FOR EACH ROW
  EXECUTE PROCEDURE trigger_set_timestamp ();

