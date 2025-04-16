import { QueryResult } from "pg";
import { pool } from "./dbConfig.js";

const cats: { title: string; description: string; image: string }[] = [
  {
    title: "Sleepy Cat",
    description: "This cat loves naps. And who doesn't?",
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1443&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Playful Cat",
    description: "Zoomies at 3 AM guaranteed.",
    image:
      "https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Curious Cat",
    description: "Exploring every corner of the house.",
    image:
      "https://images.unsplash.com/photo-1472491235688-bdc81a63246e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

async function seed() {
  try {
    const count: QueryResult<any[]> = await pool.query(`SELECT * FROM cats`);

    if (count.rows.length > 0) {
      return;
    }
    for (const cat of cats) {
      await pool.query(
        `INSERT INTO cats (title, description, image) VALUES ($1, $2, $3)`,
        [cat.title, cat.description, cat.image]
      );
    }

    console.log("DATABASE SEEDED SUCCESSFULLY");
  } catch (error) {
    console.log("Error while seeding:" + error);
  } finally {
    pool.end();
  }
}

seed();
