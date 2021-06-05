import { Pool } from "pg";
import { Category } from "../../../@types/forum.types";

export async function getAllCategories(context: any): Promise<Category[]> {
  console.log("context");
  const user = context.request.user as { id: string };
  console.log(user);
  const pool = new Pool();
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    // TODO - categories only for user that added it
    const queryText = `select * from forum_categories where "userId" = $1`;
    const res = await client.query(queryText, [user.id]);
    await client.query("COMMIT");
    return res.rows;
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}

export async function getCategoryById(categoryId: string): Promise<Category[]> {
  const pool = new Pool();
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const queryText = `select * from forum_categories where id = '${categoryId}'`;
    const res = await client.query(queryText);
    const category = res.rows[0];
    await client.query("COMMIT");
    return category;
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}

export async function addCategory(category: Category, context: any): Promise<Category> {
  const user = context.request.user as { id: string };
  const pool = new Pool();
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const queryText = `insert into forum_categories(title, description, icon, "userId") values('${category.title}', '${category.description}', 'icon', '${user.id}') returning *`;
    console.log(queryText);
    const res = await client.query(queryText);
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

export async function countAllPostsByCategoryId(categoryId: string): Promise<string> {
  const pool = new Pool();
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const queryText = `select count(*) as "postsCount" from forum_categories fc join forum_topics ft on fc.id = ft."categoryId" join forum_posts fp on ft.id = fp."topicId" where fc.id = $1`;
    const res = await client.query(queryText, [categoryId]);
    await client.query("COMMIT");
    const postsCount = res.rows[0] as { postsCount: string };
    return postsCount.postsCount;
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}
