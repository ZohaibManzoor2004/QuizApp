'use server';
import fs from 'fs/promises';
import path from 'path';
import { json } from 'stream/consumers';
// import {useQuizStore} from './QuestionStoreHelper';
// import { useUserStore } from '../login/userStore';

const reportFilePath = path.join(process.cwd(), 'reports.json');
const QuestionsFilePath = path.join(process.cwd(), 'questions.json');


export async function ReportRead() {
    const reportsData = await fs.readFile(reportFilePath, 'utf-8');
    const AllReports = JSON.parse(reportsData);
    console.log("ParsedData form ReportRead inside function: ", AllReports);
    return AllReports;
}

export async function QuestionsRead() {
    const QuestionsData = await fs.readFile(QuestionsFilePath, 'utf-8');
    const AllQuestions = JSON.parse(QuestionsData);
    console.log("ParsedData form ReportRead inside function : ", AllQuestions);
    return AllQuestions;
}

export async function Score() {
    let QuestionsData = await QuestionsRead();
    let reportsData = await ReportRead();
    console.log("The QuestionsData from function Score : ", QuestionsData);
    console.log("The reportsData from function Score : ", reportsData);
    console.log()

    let  Scores = [];
    for (let report of reportsData) {
        let correctQuestions = 0;
        let username =report.username;
        Object.keys(report.answers).forEach((key) => {
            let userAnswer = report.answers[key];
            console.log("The console above the previous error line : ")
            let correctAnswer = QuestionsData[Number(key)].correctAnswers;

            if (correctAnswer.includes(userAnswer)) {
                correctQuestions++;
            }
        });
        console.log("The total questions in file are : ",QuestionsData.length);
        console.log("Final Score:", correctQuestions);
        console.log("Username is :", username);

        let percentageScore = (correctQuestions/QuestionsData.length)*100;
        console.log("Score is (Percentage) :", Scores);

        let ScoreRecord ={
            username: username,
            percentageScore:percentageScore 
        }
        Scores.push(ScoreRecord)
    }
    console.log("The score array of record : ",Scores);
    return Scores ;
}

// for (let report of reportsData) {
// let score = 0;
// Object.keys(report.answers).forEach((key:any) => {
//     QuestionsData[key].correctAnswers.includes(key)
// });

// for (let answers of report.answers) {
//     let userAnswer = report.answers[key];
//     let correctAnswer = QuestionsData.correctAnswers[key];

//     if (userAnswer === correctAnswer) {
//         score++;
//     }
// }



