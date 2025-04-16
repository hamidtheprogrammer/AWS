import { pool } from "../db/dbConfig.js";
import { Cat } from "../index.js";

export async function getAllCatPosts() {
  try {
    const result = await pool.query(`SELECT * FROM cats`);
    return result.rows;
  } catch (error) {
    throw error;
  }
}

export async function savePost(cat: Cat) {
  try {
    const result = await pool.query(
      `INSERT INTO cats (title, description, image) VALUES ($1, $2, $3) RETURNING *`,
      [cat.title, cat.description, cat.image]
    );

    return result.rows[0];
  } catch (error) {
    throw error;
  }
}
