import "dotenv/config";
const { drizzle } = require("drizzle-orm"); // <-- use require instead of import
const { neon } = require("@neondatabase/serverless");

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql);
