// import { db } from "@/lib/db/index";
// // import { questions } from '@lib/db/schemas/questionschema';
// // import { users } from "../../lib/db/schemas/userschema";
// import { questions } from "../../../lib/db/schemas/questionschema";

// export async function AddQuestion(question: { question: string, options: string[], correctAnswers: string[] }) {
//     return await db.insert(questions).values(question);
// }
// app/admin/addQuestions/helper.ts (server)
'use server'
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { questions } from "@/lib/db/schemas/questionschema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema: { questions } });

export async function AddQuestion(newQuestion: {
  question: string;
  options: string[];
  correctAnswers: string[];
}) {
  await db.insert(questions).values(newQuestion);
}



// 'use server';
// import fs from 'fs/promises';
// import path from 'path';

// type Props = {}

// export async function AddQuestion(data: any) {
//   const filePath = path.join(process.cwd(), "questions.json");

//   let existingData = [];
//   try {
//     const content = await fs.readFile(filePath, "utf-8");
//     existingData = JSON.parse(content);
//   } catch (err) {
//     console.log("No existing file or invalid JSON, creating new");
//   }

//   existingData.push(data); // add new report
//   await fs.writeFile(filePath, JSON.stringify(existingData, null, 2));
//   return true;
// }













