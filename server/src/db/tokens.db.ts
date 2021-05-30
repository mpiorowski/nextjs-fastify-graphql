import { Pool } from "pg";
import { Token } from "../../../@types/auth.types";

export async function findToken(token: string, type: string): Promise<Token> {
  const pool = new Pool();
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const queryText = `select * from sys_tokens where token = '${token}' and type = '${type}' and expires > now()`;
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

export async function addToken(token: string, email: string): Promise<void> {
  const pool = new Pool();
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const expires = new Date(
      Date.now() + parseFloat(process.env["TOKEN_EXPIRATION_TIME"] as string) * 1000,
    ).toISOString();
    const queryText = `insert into sys_tokens (token, type, identifier, expires) values('${token}', 'register', '${email}', '${expires}')`;
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

export async function deleteToken(tokenId: string): Promise<void> {
  const pool = new Pool();
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const queryText = `delete from sys_tokens where id = $1`;
    const res = await client.query(queryText, [tokenId]);
    await client.query("COMMIT");
    return res.rows[0];
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}
