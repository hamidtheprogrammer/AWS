import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function createSchema() {
  try {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS cats (
          id SERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          description TEXT NOT NULL,
          image TEXT NOT NULL
        );
      `);
    console.log("Table created ✅");
  } catch (err) {
    console.error("Error creating table:", err);
  }
}

createSchema();
