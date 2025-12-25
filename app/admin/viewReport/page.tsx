import React from 'react'
// import { ReportRead } from '../ReportReader';
import Link from 'next/link';
// import {QuestionsRead} from '../ReportReader';
// import { Score } from '../ReportReader';
import { reportFetcher } from './reportFetcher';

type Props = {}

export default async function Page({}: Props) {
    // const questions = useQuestionStore(state => state.questions);
    let reports =  await reportFetcher();
    console.log("The reports fetched in page.tsx are : ", reports);
    return (
    <div className="p-6">
        
        <h1 className="text-2xl font-bold mb-4">Welcome to the Reports Page</h1>
        <Link href="/admin">
            <button
                type="button"
                className="w-full py-3 px-4 bg-purple-600 text-white font-semibold 
                rounded-lg shadow-md hover:bg-red-700 focus:outline-none 
                focus:ring-4 focus:ring-blue-300 transition duration-600 ease-in-out mt-4"
            >
                    {"<= .. Back To Admin Panel"}
            </button>
        </Link>


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

