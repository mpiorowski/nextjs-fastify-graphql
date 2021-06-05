import { Pool } from "pg";
import { Chat } from "../../../@types/chat.types";

export async function addChat(chat: Chat, context: any): Promise<Chat> {
  const user = context.request.user as { id: string };
  const pool = new Pool();
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const queryText = `insert into chat(content, "userId") values($1, $2) returning *`;
    const res = await client.query(queryText, [chat.content, user.id]);
    await client.query("COMMIT");
    return res.rows[0];
  } catch (e) {
    await client.query("ROLLBACK");
    console.error(e);
    throw e;
  } finally {
    client.release();
  }
}

export async function getAllChats(context: any): Promise<Chat[]> {
  const user = context.request.user as { id: string };
  const pool = new Pool();
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const queryText = `select * from chat where "userId" = $1`;
    const res = await client.query(queryText, [user.id]);
    await client.query("COMMIT");
    return res.rows;
  } catch (e) {
    await client.query("ROLLBACK");
    console.error(e);
    throw e;
  } finally {
    client.release();
  }
}
