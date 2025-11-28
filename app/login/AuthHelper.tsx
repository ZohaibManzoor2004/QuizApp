//----------------------//
'use server'
import "dotenv/config";
// import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";
// import { questions } from '../../lib/db/schemas/questionschema'
import { users } from "../../lib/db/schemas/userschema";
// import { reports } from '../../lib/db/schemas/reportschema';
// import { db, users } from "@/lib/db";

//db is the db conection with drizzle(wrap)
import { db } from "@/lib/db/index";

//import { userTable } from '../../lib/db/index';

const sql = neon(process.env.DATABASE_URL!);

// export const userTable = drizzle(sql, { schema: { users } });

export async function authenticateUserDB(username: string, password: string) {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.username, username));
  console.log("The matched user info is : ", user);
  //For Invalid Credentials
  if (user.length === 0 || user[0].password !== password) {
    return {
      status: "error",
      message: "Invalid username or password",
      username: username
    };
  }
  return { status: "success", username };
}

export async function registerUser(username: string, password: string) {
  console.log("Request for Register User: ");
  const existing = await db
    .select()
    .from(users)
    .where(eq(users.username, username));

  if (existing.length > 0) {
    console.log("User Exists: preExisting Error : ");

    return { status: "preExisting", message: "Username already exists" };
  }
  await db.insert(users).values({
    username,
    password,   // (optionally hash)
  });

  return { status: "success", username, message: "Registered Successfully:" };

}

// export async function registerUser1(username: string, password: string) {
//   const fileContent = await fs.readFile(filePath, 'utf-8');
//   // alert("Reached at registerUser function inside AuthHelper");
//   const data = JSON.parse(fileContent)
//   console.log("at Register User function: and the data is : ", data);
//   data.push({ username, password });
//   await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
//   console.log("Registration Done : ");
// }