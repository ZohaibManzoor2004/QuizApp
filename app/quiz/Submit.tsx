// app/quiz/actions.ts
'use server';
import { reports } from "@/lib/db/schemas/reportschema";
import { db } from "@/lib/db/index";
import { questions } from "@/lib/db/schemas/questionschema";


const QuizScore = async (answers: any) => {
  let QuestionsData = await db.select().from(questions);  
  console.log("The QuestionsData from function QuizScore : ", QuestionsData);
  console.log("The answers from function QuizScore : ", answers);
  let correctQuestions = 0;
  Object.keys(answers).forEach((key) => {
      let userAnswer = answers[key];
      console.log("The console above the previous error line : ")
      let correctAnswer = QuestionsData[Number(key)].correctAnswers;
      if (correctAnswer.includes(userAnswer)) {
          correctQuestions++;
      }
  });
  console.log("The total questions in file are : ",QuestionsData.length);
  console.log("Final Score:", correctQuestions);
  let percentageScore = (correctQuestions/QuestionsData.length)*100;
  console.log("Score is (Percentage) :", percentageScore);
  return percentageScore ;
}

export async function saveReport(data: any) {
  console.log("Data received in saveReport function: ", data);
  const score = await QuizScore(data.answers);
  console.log("The score calculated is  from Quizscore function from submit: ", score);
  console.log("DB process Starts!");
  const result = await db.insert(reports).values({
    username: data.username,
    answers: JSON.stringify(data.answers),
    score:score, 
    date: new Date(),
  })
  console.log("DB process Ends!");
  return { success: true}
}

/////Working for Saving report to the json repport.json file
// 'use server';

// import fs from 'fs/promises';
// import path from 'path';

// export async function saveReport(data: any) {
//   const filePath = path.join(process.cwd(), "reports.json");

//   let existingData = [];
//   try {
//     const content = await fs.readFile(filePath, "utf-8");
//     existingData = JSON.parse(content);
//   } catch (err) {
//     console.log("No existing file or invalid JSON, creating new");
//   }
//   console.log("Data received in saveReport function: ", data);
//   console.log("Data Ends");

//   existingData.push(data); // add new report
//   await fs.writeFile(filePath, JSON.stringify(existingData, null, 2));
//   return true;
// }
