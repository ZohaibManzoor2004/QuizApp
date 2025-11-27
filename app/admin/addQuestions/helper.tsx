'use server';
import fs from 'fs/promises';
import path from 'path';

type Props = {}

export async function AddQuestion(data: any) {
  const filePath = path.join(process.cwd(), "questions.json");

  let existingData = [];
  try {
    const content = await fs.readFile(filePath, "utf-8");
    existingData = JSON.parse(content);
  } catch (err) {
    console.log("No existing file or invalid JSON, creating new");
  }

  existingData.push(data); // add new report
  await fs.writeFile(filePath, JSON.stringify(existingData, null, 2));
  return true;
}













