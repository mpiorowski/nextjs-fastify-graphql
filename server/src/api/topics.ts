import { Pool } from 'pg';

export async function getAllTopicsByCategoryId(postData: any) {
  const pool = new Pool();
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const queryText = `select * from forum_topics`;
    const res = await client.query(queryText, [postData.title, postData.description, postData.categoryid]);
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

export async function addTopic(postData: any) {
  const pool = new Pool();
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const queryText = `insert into forum_topics(title, description, categoryid, userid) values($1, $2, $3, 1) returning *`;
    const res = await client.query(queryText, [postData.title, postData.description, postData.categoryid]);
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
