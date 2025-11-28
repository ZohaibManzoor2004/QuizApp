//----------------------//
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { questions } from './lib/db/schemas/questionschema'
import { users } from "./lib/db/schemas/userschema";
import { reports } from './lib/db/schemas/reportschema';

//import Data from './data.json';
import QuestionsData from './questions.json';
import ReportsData from './reports.json'
import { db } from "@/lib/db/index";


// console.log("THe Questions Data imported is : ",QuestionsData);
// console.log("THe Reports Data imported is : ", ReportsData);

// 1: Create neon connection
const sql = neon(process.env.DATABASE_URL!);

// 2: Initialize drizzle with schema
export const userTable = drizzle(sql, { schema: { users } });
export const questionTable = drizzle(sql, { schema: { questions } })
export const ReportsTable = drizzle(sql, { schema: { reports } })

async function main() {
  // const user = {
  //   username: "Shahid",
  //   password: "shahid12",
//   // };
//   const formattedQuestions = QuestionsData.map((q) => ({
//     question: q.question,
//     options: q.options,                 // array → array ✔️
//     correct_answers: q.correctAnswers   // array → array ✔️
//   }));;
// }
// // INSERT CORRECTLY
// console.log("Data stroing start")
// let allUsers = await questionTable.insert(questions).values(QuestionsData);
// console.log("Data stroing End")
async function main() {
  console.log("Inserting questions...");

  await db.insert(questions).values(
    QuestionsData.map(q => ({
      question: q.question,
      options: q.options,                 // array OK
      correctAnswers: q.correctAnswers   // array OK
    }))
  );

  console.log("Questions inserted successfully");
}

// const formattedReports = ReportsData.map((r) => ({
//     date: new Date(r.date), // ← convert string → Date
//     answers: JSON.stringify(r.answers), // object → JSON string
//   }));
// const usersInDb = await userTable.select().from(users);

// const formattedReports = ReportsData.map((r) => {
//   const user = usersInDb.find(u => u.username === r.username);
//   return {
//     userId: user?.id,                 // <-- required
//     answers: JSON.stringify(r.answers),
//     date: new Date(r.date),
//   };
// });

//   console.log("Insert Data stroing start")
//   let allReports = await ReportsTable.insert(reports).values(formattedReports);
//   console.log("insert Data stroing End")
//   // const usersInDb = await userTable.select().from(users);
//   // FETCH CORRECTLY
//   //const allUsers = await userTable.select().from(users);
//   //console.log("Users in DB:", allUsers);
// }
}
main();
