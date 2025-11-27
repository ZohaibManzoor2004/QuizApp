'use server';
import fs from 'fs/promises';
import path from 'path';
// import {useQuizStore} from '../QuestionStoreHelper';

type Props = {}
export async function QuestionsData() {
    const filePath = path.join(process.cwd(), "questions.json");
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const filedata = JSON.parse(fileContent)
    console.log("at readAuthData function: and the data is : ", filedata);
    return filedata;
  }
  catch (err) {
    console.log("Error while trying to read the file at :", filePath);
    return { users: [] };
  }
}
