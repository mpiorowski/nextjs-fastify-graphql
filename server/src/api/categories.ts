import { Pool } from 'pg';

export async function getAllCategories() {
  const pool = new Pool();
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
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    let queryText = `select * from forum_categories where id = ${categoryId}`;
    let res = await client.query(queryText);
    await client.query('COMMIT');
    // console.log(res.rows[0]);
    // return res.rows[0];
    const category = res.rows[0];

    console.log(category);

    queryText = `select * from forum_topics where categoryid = ${categoryId}`;
    res = await client.query(queryText);
    await client.query('COMMIT');

    const topics = res.rows;

    const response = {
      ...category,
      topics: topics,
    };
    return response;
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}

export async function addCategory(categoryData: any) {
  const pool = new Pool();
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
