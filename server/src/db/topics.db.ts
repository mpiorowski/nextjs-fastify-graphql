import { Pool } from "pg";
import { Topic } from "../../../@types/forum.types";

export async function getAllTopicsByCategoryId(categoryId: string): Promise<Topic[]> {
  const pool = new Pool();
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const queryText = `select * from forum_topics where "categoryId" = $1`;
    const res = await client.query(queryText, [categoryId]);
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

export async function getTopicById(topicId: string): Promise<Topic> {
  const pool = new Pool();
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const queryText = `select * from forum_topics where id = '${topicId}'`;
    const res = await client.query(queryText);
    const topic = res.rows[0];

    await client.query("COMMIT");
    return topic;
  } catch (e) {
    await client.query("ROLLBACK");
    console.error(e);
    throw e;
  } finally {
    client.release();
  }
}

export async function addTopic(topic: Topic, context: any): Promise<Topic> {
  const user = context.request.user as { id: string };
  const pool = new Pool();
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const queryText = `insert into forum_topics(title, description, "categoryId", "userId") values($1, $2, $3, '${user.id}') returning *`;
    const res = await client.query(queryText, [topic.title, topic.description, topic.categoryId]);
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
