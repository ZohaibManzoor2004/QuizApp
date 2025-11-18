import React from 'react'
import { ReportRead } from '../ReportReader';
import Link from 'next/link';
import {QuestionsRead} from '../ReportReader';
import { Score } from '../ReportReader';
type Props = {}

export default async function page({}: Props) {
    let reports =  await ReportRead()
    let questions = await QuestionsRead(); 
    let ScoreData = await Score();
    console.log("Reports Data : ",reports);
    console.log("Questions Data : ",questions);
    console.log("Score Data : ",ScoreData);

    return (
    <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome to the Reports Page</h1>
        <p className="text-gray-600 mb-6">New Edit</p>

        <ul className="space-y-2">
            {ScoreData.map((ScoreRecord: any, idx: number) => (
                <li key={idx} className="border-b py-3">
                        Candidate Name: {ScoreRecord.username} : Score : {ScoreRecord.percentageScore}
                </li>

            ))}
        </ul>
    </div>
)
}

// export default async function AllReports({ }: Props) {
//     // let username = useUserStore((state) => state.username);
//     let data = await ReportRead()

//     console.log("Report read function returned data is : ", data);
//     // console.log("ZUstand Username: ", username)

//     return (
//         <div>
//             <div>Username : {data.username}</div>
//             <h2>Answers</h2>
//             {data.map((Info : any) => (
//                 <div>Username : {Info.username}</div>

//             ))}
//         </div>
//     )
// }