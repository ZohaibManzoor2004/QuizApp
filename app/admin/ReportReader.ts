import React from 'react';
import { db } from "@/lib/db/index";
import { reports } from "@/lib/db/schemas/reportschema";
import { count } from "drizzle-orm";

type Props = {}

export async function reportFetcher() {
    // const reportData = db.select().from(reports);
    const [{ value }] = await db.select({ value: count() }).from(reports);
    console.log("The reportData fetched in reportFetcher.tsx is : ", [{ value }]);
  return value;
}


// import { useUserStore } from "../../components/stores/userStore";


// export function AdminAuth(){
//     const username = useUserStore((state) => state.username);
//     console.log("Username from admin page is : ",username);
//     if(username && username !== 'admin'){
//         return {authorized: false};
//     }
//     return {authorized: true};
// }


// 'use server';
// import fs from 'fs/promises';
// import path from 'path';
// import { json } from 'stream/consumers';
// // import {useQuizStore} from './QuestionStoreHelper';
// // import { useUserStore } from '../login/userStore';

// const reportFilePath = path.join(process.cwd(), 'reports.json');
// const QuestionsFilePath = path.join(process.cwd(), 'questions.json');

// // For json
// export async function ReportRead() {
//     const reportsData = await fs.readFile(reportFilePath, 'utf-8');
//     const AllReports = JSON.parse(reportsData);
//     console.log("ParsedData form ReportRead inside function: ", AllReports);
//     return AllReports;
// }


// export async function QuestionsRead() {
//     const QuestionsData = await fs.readFile(QuestionsFilePath, 'utf-8');
//     const AllQuestions = JSON.parse(QuestionsData);
//     console.log("ParsedData form ReportRead inside function : ", AllQuestions);
//     return AllQuestions;
// }

// export async function Score() {
//     let QuestionsData = await QuestionsRead();
//     let reportsData = await ReportRead();
//     console.log("The QuestionsData from function Score : ", QuestionsData);
//     console.log("The reportsData from function Score : ", reportsData);
//     console.log()

//     let  Scores = [];
//     for (let report of reportsData) {
//         let correctQuestions = 0;
//         let username =report.username;
//         Object.keys(report.answers).forEach((key) => {
//             let userAnswer = report.answers[key];
//             console.log("The console above the previous error line : ")
//             let correctAnswer = QuestionsData[Number(key)].correctAnswers;

//             if (correctAnswer.includes(userAnswer)) {
//                 correctQuestions++;
//             }
//         });
//         console.log("The total questions in file are : ",QuestionsData.length);
//         console.log("Final Score:", correctQuestions);
//         console.log("Username is :", username);

//         let percentageScore = (correctQuestions/QuestionsData.length)*100;
//         console.log("Score is (Percentage) :", Scores);

//         let ScoreRecord ={
//             username: username,
//             percentageScore:percentageScore 
//         }
//         Scores.push(ScoreRecord)
//     }
//     console.log("The score array of record : ",Scores);
//     return Scores ;
// }




