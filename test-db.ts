import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import { users } from "./lib/db/userschema";


// 1: Create neon connection
const sql = neon(process.env.DATABASE_URL!);

// 2: Initialize drizzle with schema
const db = drizzle(sql, { schema: { users } });

async function main() {
  const user = {
    username: "Ali",
    password: "test123",
  };

  // INSERT CORRECTLY
  await db.insert(users).values(user);

  // FETCH CORRECTLY
  const allUsers = await db.select().from(users);
  console.log("Users in DB:", allUsers);
}

main();
