
'use server';
import * as fs from 'fs/promises';
import path from "path";
//file path defining:
const filePath = path.join(process.cwd(), "data.json");
export async function authenticateUser(username: string, password: string) {
  const fileContent = await fs.readFile(filePath, 'utf-8');
  const data = JSON.parse(fileContent)
  console.log("at readAuthData function: and the data is : ", data);
  const userdata = data.find((u: { username: string; password: string }) =>
      u.username === username && u.password === password
  );

// if (username === "Admin12" && password ==="Admin12"){
//   console.log("Admin Logged in");
//    return {
//     status: "success",
//     username: username
//   };
// }
  
  // If no matching user is found
  if (!userdata) {
    console.log("User not found :");
    return {
      status: "error",
      message: "Invalid username or password",
      username : username
    };
  }

  // If user is found
  return {
    status: "success",
    username: username
  };
}



// export async function authenticateUser(username: String, password: String){
//   const authData = await readAuthData();
//   console.log("The authdata from file is : ",authData);
//   //const user = authData.username.find((u)=> u.username === username)

// }