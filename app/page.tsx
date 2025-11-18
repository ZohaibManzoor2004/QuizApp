'use client';

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();  
  const handleClick = () => {
    router.push("/login")
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Welcome to the Quiz App
        </h1>

        <div> 
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105"
            onClick={handleClick}
          >
            Login to Start Quiz
          </button>
        </div>
      </div>
    </div>
  )
}