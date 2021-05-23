import { Pool } from "pg";
import { User } from "../../../@types/users.types";

export async function addUser() {
  const pool = new Pool();
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const queryText = "insert into ";
    const res = await client.query(queryText);
    await client.query("COMMIT");
    return res.rows;
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}

export async function getUserByEmail(email: string): Promise<User> {
  const pool = new Pool();
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const queryText = `select * from users where email = '${email}'`;
    const res = await client.query(queryText);
    await client.query("COMMIT");
    return res.rows[0];
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}
