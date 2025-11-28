// 'use server';
// import fs from 'fs/promises';
// import path from 'path';

// import {useQuizStore} from '../QuestionStoreHelper';
// const sql = neon(process.env.DATABASE_URL!);


// import { db } from "@/lib/db/index";
// import { questions } from '../../lib/db/schemas/questionschema'
// // import { neon } from "@neondatabase/serverless";

// export async function QuestionsData() {
//   const questionsData = await db
//     .select()
//     .from(questions)
//   // console.log("The data fetched from database is :", questionsData);
//   return questionsData;
// }



//////////
'use server';
import { db } from "@/lib/db/index";
import { questions } from "@/lib/db/schemas/questionschema";

export async function QuestionsData() {
  const queData = await db.select().from(questions);
  console.log("THe questions from QuestionData() : ",queData)
  return queData;
}

//////////////////

// type Props = {}
// export async function QuestionsData() {

//     const filePath = path.join(process.cwd(), "questions.json");
//   try {
//     const fileContent = await fs.readFile(filePath, 'utf-8');
//     const filedata = JSON.parse(fileContent)
//     console.log("at readAuthData function: and the data is : ", filedata);
//     return filedata;
//   }
//   catch (err) {
//     console.log("Error while trying to read the file at :", filePath);
//     return { users: [] };
//   }
// }
