import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import { users } from "./schemas/userschema";
import { questions } from "./schemas/questionschema";
import { reports } from "./schemas/reportschema";

const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle(sql); // NOT userTable
export { users, questions, reports };


// import "dotenv/config";
// const { drizzle } = require("drizzle-orm"); // <-- use require instead of import
// const { neon } = require("@neondatabase/serverless");

// import { questions } from './schemas/questionschema'
// import { users } from "./schemas/userschema";
// import { reports } from './schemas/reportschema';

// const sql = neon(process.env.DATABASE_URL!);
// // export const db = drizzle(sql);

// export const userTable = drizzle(sql, { schema: { users } });
