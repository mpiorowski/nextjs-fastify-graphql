import { Pool } from "pg";
import { Post } from "../../../@types/forum.types";

export async function getAllPostsByTopicId(topicId: string): Promise<Post[]> {
  const pool = new Pool();
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const queryText = `select * from forum_posts where "topicId" = $1 and "replyId" is null`;
    const res = await client.query(queryText, [topicId]);
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

export async function getAllRepliesByPostId(postId: string): Promise<Post[]> {
  const pool = new Pool();
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const queryText = `select * from forum_posts where "replyId" = $1`;
    const res = await client.query(queryText, [postId]);
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

export async function addPost(post: Post, context: any): Promise<Post> {
  const user = context.request.user as { id: string };
  const pool = new Pool();
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const queryText = `insert into forum_posts(content, "topicId", "userId", "replyId") values($1, $2, '${user.id}', $3) returning *`;
    const res = await client.query(queryText, [post.content, post.topicId, post.replyId]);
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
