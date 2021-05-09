import { Pool } from 'pg';

export async function getAllCategories() {
  const pool = new Pool();
  // note: we don't try/catch this because if connecting throws an exception
  // we don't need to dispose of the client (it will be undefined)
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const queryText = 'select * from forum_categories';
    const res = await client.query(queryText);
    await client.query('COMMIT');
    return res.rows;
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}

export async function getCategoryById(categoryId: string) {
  const pool = new Pool();
  // note: we don't try/catch this because if connecting throws an exception
  // we don't need to dispose of the client (it will be undefined)
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const queryText = `select * from forum_categories where id = ${categoryId}`;
    const res = await client.query(queryText);
    await client.query('COMMIT');
    return res.rows[0];
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}

export async function addCategory(categoryData: any) {
  const pool = new Pool();
  // note: we don't try/catch this because if connecting throws an exception
  // we don't need to dispose of the client (it will be undefined)
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const queryText = `insert into forum_categories(title, description, icon, userid) values('${categoryData.title}', '${categoryData.description}', 'icon', 1) returning *`;
    console.log(queryText);
    const res = await client.query(queryText);
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
  // note: we don't try/catch this because if connecting throws an exception
  // we don't need to dispose of the client (it will be undefined)
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
