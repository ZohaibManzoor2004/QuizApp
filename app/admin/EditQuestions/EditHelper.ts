'use server';
import { db } from "@/lib/db/index";
import { questions } from "@/lib/db/schemas/questionschema";
import { eq } from "drizzle-orm";


export async function FetchQuestions() {
  const queData = await db.select().from(questions);
  console.log("THe questions from QuestionData() : ",queData)
  return queData;
}

export async function DeleteQue(id: number) {
  const result = await db.delete(questions).where(eq(questions.id, id)).returning();
  console.log(`Deleted question with id ${id}:`, result);
  return result;
}

export async function UpdateQuestions(data: any[]) {
  // 1. Delete all existing questions
  await db.delete(questions).execute();

  // 2. Insert all new questions
  const formatted = data.map(q => ({
    question: q.question,
    options: q.options,
    correctAnswers: q.correctAnswers,
  }));

  await db.insert(questions).values(formatted);

  console.log("All questions updated in DB successfully");
}




// 'use server';

// import fs from 'fs/promises';
// import path from 'path';
// type Props = {}

// export async function FetchQuestions() {
//   const filePath = path.join(process.cwd(), "questions.json");

//   let QuestionData = [];
//   try {
//     const content = await fs.readFile(filePath, "utf-8");
//     QuestionData = JSON.parse(content);
//     return QuestionData;
//   } catch (err) {
//     console.log("No existing file or invalid JSON, creating new");
//     return 0;
//   }
// }
 
// export async function UpdateQuestions(data:any) {
//     const filePath = path.join(process.cwd(), "questions.json");
//     await fs.writeFile(filePath, JSON.stringify(data, null, 2));
//     console.log("Reached on the Update Questions with data : ",data);
// }