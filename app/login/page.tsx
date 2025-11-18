'use client';
import React, { useState } from 'react'
import { useRouter } from "next/navigation";
import { useUserStore } from "./userStore";

// Correct Import for files in the same directory
// import { readAuthData } from "./AuthHelper";
import { authenticateUser } from './AuthHelper';

type Props = {}

export default function Login({ }: Props) {
    const setUsernameStore = useUserStore((state) => state.setUsername); // ✅ top-level hook
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [authMessage, setAuthMessage] = useState("Not Logged In");
    const router = useRouter();

    const handleClick = () => {
        router.push("/")
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let response = await authenticateUser(username, password);
        console.log("response from handleSubmit is : ", response);
        if (response.status !== "success") {
            response = { status: "error", message: "Fallback", username: username };
        }
        console.log("The response is : ", response);
        if (response.status === "success") {
            response = { status: "success", message: "Logged In", username: username };
            console.log("success");
            console.log("The necessary user data is : ", response.status,response.message,response.username );
            setUsernameStore(response.username);
            setAuthMessage(response.message);
            if (username === "Admin12"){
                console.log("Admin Logged In!!");
                router.push("/admin");
            }
            else{
                router.push("/quiz");
            }             //console.log("The username from userStore is : ",  await useUserStore((state)=>state.username))
        }
    }

    return (
        // Outer div: Full screen height, centered content, dark background
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">


            {/* Login Card/Container: White background, rounded corners, shadow, max width */}
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm">

                {/* Title: Large, bold, centered text, margin bottom */}
                <div className="text-3xl font-bold text-center text-gray-800 mb-6">
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105"
                        onClick={handleClick}
                    >
                        Back to Main Page
                    </button>
                    Login Page
                </div>

                <form onSubmit={handleSubmit}
                >
                    {/* Input field */}
                    <input
                        type="text"
                        placeholder="Enter your username" // Added placeholder for clarity
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        // Input styling: Full width, padding, border, focus ring
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                    />
                    <input
                        type="password"
                        placeholder="Enter the password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                    />
                    <button
                        className='border-1 border-2 border-black text-black px-6 rounded-full hover:bg-indigo-700  justify-center'
                        type="submit"
                    >
                        Submit
                    </button>
                    <h2 className="text-red-500 mt-2"> Authentication :{authMessage}</h2>
                </form>
            </div>
        </div>
    )
}