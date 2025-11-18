// 'use client';
// import React, { useState } from 'react';
// import { FetchQuestions } from './EditHelper';
// import { UpdateQuestions } from './EditHelper';

// export default function Page() {

//   const [questions, setQuestions] = useState<Question[]>([]);
//   type Question = {
//     id: number;
//     question: string;
//     options: string[];
//     correctAnswers: string[];
//   };

//   const handleLoad = async () => {
//     const data = await FetchQuestions();
//     setQuestions(data);
//   };

//   // DELETE HANDLER — simple & clean
//   const handleDelete = (id: number) => {
//     setQuestions(prev => prev.filter(q => q.id !== id));
//   };
//   const handleEdit = async () => {
//     await UpdateQuestions(questions);
//     console.log('the updated questions are : ')
//   }

//   return (
//     <div className="p-6 space-y-4">
//       <h1 className="text-xl font-bold">Edit Questions</h1>

//       {/* Load button */}
//       <button
//         onClick={handleLoad}
//         className="px-4 py-2 bg-blue-500 text-white rounded"
//       >
//         Load Questions
//       </button>

//       {/* Render Questions */}
//       <div className="space-y-6 mt-4">
//         {questions.map((q: {
//           id: number;
//           question: string;
//           options: string[];
//           correctAnswers: string[];
//         }) => (
//           <div key={q.id} className="border p-4 rounded-lg">

//             <p className="font-semibold mb-2">
//               ID: {q.id}
//             </p>
//             <p>Question </p>

//             <input
//               type="text"
//               value={q.question} // controlled input
//               onChange={(e) => {
//                 (idx: any) => {
//                   const newQuestions = [...questions];       // copy state
//                   newQuestions[idx].question = e.target.value; // update question field
//                   setQuestions(newQuestions);

//                 }               // set updated state
//               }}
//             />

//             <p>Options (edit by comma Separated values) </p>

//             <input
//               type="text"
//               value={q.options.join(",")}
//               onChange={(e) => {
//                 (idx: any) => {

//                   const newQuestions = [...questions];
//                   newQuestions[idx].options = e.target.value.split(","); // split by comma
//                   setQuestions(newQuestions);
//                 }
//               }}
//             />

//             <p>CorrectAnswers (include by comma Separated values) </p>

//             <input
//               type="text"
//               value={q.correctAnswers.join(",")}
//               onChange={(e) => {
//                 (idx: any) => {
//                   const newQuestions = [...questions];
//                   newQuestions[idx].correctAnswers = e.target.value.split(",");
//                   setQuestions(newQuestions);
//                 }
//                 }
//               }
//             />

//             {/* DELETE BUTTON */}
//             <button
//               onClick={() => handleDelete(q.id)}
//               className="px-3 py-1 bg-red-500 text-white rounded"
//             >
//               Delete
//             </button>
//           </div>
//         )
//         )
//         }
//         <div>  &&
//           <button
//             onClick={handleEdit}
//             className="px-3 py-1 bg-blue-500 text-white rounded"
//           >
//             Update All
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
