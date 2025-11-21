'use client';
import React, { useState } from 'react'
import { useRouter } from "next/navigation";
import { useUserStore } from "../../components/stores/userStore";

import { authenticateUser } from './AuthHelper';
import { registerUser } from './AuthHelper';
type Props = {}

export default function Login({ }: Props) {
    const setUsernameStore = useUserStore((state) => state.setUsername); // ✅ top-level hook
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [pageName, setPageName] = useState("Login Page");
    const [endpoint, setEndPoint] = useState('')
    const [authMessage, setAuthMessage] = useState("Not Logged In");
    const router = useRouter();

    const handleClick = () => {
        router.push("/")
    }

    const handleRegister = () => {
        setPageName("Register Page");
        setEndPoint("Register");
        console.log("Register mode enabled");
    };


    const handleLogin = async (e: React.FormEvent) => {
        console.log("Clicked on Login")
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
            console.log("The necessary user data is : ", response.status, response.message, response.username);
            setUsernameStore(response.username);
            setAuthMessage(response.message);
            if (username === "Admin12") {
                console.log("Admin Logged In!!");
                router.push("/admin");
            }
            else {
                router.push("/quiz");
            }             //console.log("The username from userStore is : ",  await useUserStore((state)=>state.username))
        }
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (endpoint === "Register") {
            await registerUser(username, password);
            router.push("/quiz");
            return ;
        }

        await handleLogin(e);
    };


    return (
        // Outer div: Full screen height, centered content, light background
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">


            {/* Login Card/Container: White background, rounded corners, shadow, max width */}
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm border border-gray-200">

                {/* Header Section */}
                <div className="mb-8">
                    {/* Back button and Title Container */}
                    <div className="flex flex-col items-center space-y-4">
                        <button
                            className="w-full py-2 px-4 bg-gray-200 text-gray-700 font-medium text-sm rounded-lg hover:bg-gray-300 transition duration-150 ease-in-out"
                            onClick={handleClick}
                        >
                            ← Back to Main Page
                        </button>
                        <h1 className="text-3xl font-extrabold text-center text-indigo-600">
                            {pageName}
                        </h1>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className='space-y-4'>
                    {/* Input field - Username */}
                    <input
                        type="text"
                        placeholder="Enter your username" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        // Input styling: Full width, padding, border, focus ring, margin bottom
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out shadow-sm"
                    />

                    {/* Input field - Password */}
                    <input
                        type="password"
                        placeholder="Enter the password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out shadow-sm"
                    />

                    {/* Submit Button Container */}
                    <div className='pt-2'>
                        <button
                            type="submit"
                            // Beautiful Submit Styling: Indigo color, shadow, hover/focus effects, full width
                            className='w-full py-3 bg-indigo-600 text-white font-semibold 
                                       rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none 
                                       focus:ring-4 focus:ring-indigo-300 transition duration-200 ease-in-out transform hover:scale-[1.01]'
                        >
                            {endpoint === "Register" ? "Register" : "Login"}
                        </button>
                    </div>
                </form>
                
                {/* Authentication Message */}
                <h2 className={`text-center mt-4 font-medium ${authMessage === "Logged In" ? 'text-green-600' : 'text-red-500'}`}> 
                    Authentication: {authMessage}
                </h2>

                {/* Register Toggle Button */}
                <div className="mt-6 border-t pt-4 text-center">
                    {endpoint === "Register" ? (
                        <button onClick={() => { setPageName("Login Page"); setEndPoint(""); }} 
                            className="text-sm text-indigo-500 hover:text-indigo-700 transition duration-150 underline" >
                            Already have an account? Go to Login
                        </button>
                    ) : (
                        <button onClick={handleRegister} 
                            className="text-sm text-indigo-500 hover:text-indigo-700 transition duration-150 underline">
                            Don't have an account? Click Here to Register
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}