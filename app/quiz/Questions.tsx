
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

// export default function Questions({ }: Props) {
//     return (
//         <div>
//             <div>
//                 Questions Component :
//             </div>
//                     <div className="mt-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
//                         <h2 className="text-xl font-bold">Question 1:</h2>
//                         <p>What is the capital of France?</p>
//                     </div>

//         </div>
//     )
// }