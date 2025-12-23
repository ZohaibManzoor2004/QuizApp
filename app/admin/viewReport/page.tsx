import React from 'react'
import { ReportRead } from '../ReportReader';
import Link from 'next/link';
import {QuestionsRead} from '../ReportReader';
import { Score } from '../ReportReader';
import { reportFetcher } from './reportFetcher';

type Props = {}

export default async function Page({}: Props) {
    // const questions = useQuestionStore(state => state.questions);
    let reports =  await reportFetcher();
    console.log("The reports fetched in page.tsx are : ", reports);
    return (
    <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome to the Reports Page</h1>
        <ul className="space-y-2">
            {reports.map((report: any, idx: number) => (
                <li key={idx} className="border-b py-3">
                        Candidate Name: {report.username} : Score : {report.score} % 
                </li>
            ))}
        </ul>
    </div>
    )
}

// export default async function page({}: Props) {
//     // const questions = useQuestionStore(state => state.questions);
//     let reports =  await ReportRead()
//     let questions1 = await QuestionsRead(); 
//     // setQuestions(questions1);
//     let ScoreData = await Score();
//     console.log("Reports Data : ",reports);
//     // console.log("Questions Data : ",questions);
//     console.log("Score Data : ",ScoreData);

//     return (
//     <div className="p-6">
//         <h1 className="text-2xl font-bold mb-4">Welcome to the Reports Page</h1>
//         <p className="text-gray-600 mb-6">New Edit</p>

//         <ul className="space-y-2">
//             {ScoreData.map((ScoreRecord: any, idx: number) => (
//                 <li key={idx} className="border-b py-3">
                    
//                         Candidate Name: {ScoreRecord.username} : Score : {ScoreRecord.percentageScore} % 
//                 </li>
//             ))}
//         </ul>
//     </div>
// )}

