'use server';

import fs from 'fs/promises';
import path from 'path';
type Props = {}


export async function FetchQuestions() {
  const filePath = path.join(process.cwd(), "questions.json");

  let QuestionData = [];
  try {
    const content = await fs.readFile(filePath, "utf-8");
    QuestionData = JSON.parse(content);
    return QuestionData;
  } catch (err) {
    console.log("No existing file or invalid JSON, creating new");
    return 0;
  }
}
 

export async function UpdateQuestions(data:any) {
    const filePath = path.join(process.cwd(), "questions.json");
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    console.log("Reached on the Update Questions with data : ",data);
}