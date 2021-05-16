import { MercuriusContext } from 'mercurius';
import { Pool } from 'pg';

export async function addPost(postData: any, context: MercuriusContext) {
  const user = context.reply.request.user as { id: string };
  const pool = new Pool();
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const queryText = `insert into forum_posts(content, topicId, userId) values($1, $2, ${user.id}) returning *`;
    const res = await client.query(queryText, [postData.content, postData.topicId]);
    await client.query('COMMIT');
    console.log(res.rows);
    return res.rows[0];
  } catch (e) {
    await client.query('ROLLBACK');
    console.error(e);
    throw e;
  } finally {
    client.release();
  }
}
