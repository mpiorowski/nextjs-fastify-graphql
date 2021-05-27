import { MercuriusContext } from "mercurius";
import { Pool } from "pg";

export async function getAllTopicsByCategoryId(categoryId: string) {
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

export async function getTopicById(topicId: string) {
  const pool = new Pool();
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // topic
    let queryText = `select * from forum_topics where id = '${topicId}'`;
    let res = await client.query(queryText);
    const topic = res.rows[0];

    // posts
    queryText = `select * from forum_posts where "topicId" = '${topicId}' and "replyId" is null`;
    res = await client.query(queryText);
    const posts = res.rows;

    const postsWithReplies: any[] = [];
    posts.forEach(async (post) => {
      queryText = `select * from forum_posts where "replyId" = '${post.id}'`;
      res = await client.query(queryText);
      postsWithReplies.push({ ...post, replies: [...res.rows] });
    });

    const response = {
      ...topic,
      posts: postsWithReplies,
    };
    await client.query("COMMIT");
    return response;
  } catch (e) {
    await client.query("ROLLBACK");
    console.error(e);
    throw e;
  } finally {
    client.release();
  }
}

export async function addTopic(postData: any, context: MercuriusContext) {
  const user = context.reply.request.user as { id: string };
  const pool = new Pool();
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const queryText = `insert into forum_topics(title, description, "categoryId", "userId") values($1, $2, $3, '${user.id}') returning *`;
    const res = await client.query(queryText, [postData.title, postData.description, postData.categoryId]);
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
