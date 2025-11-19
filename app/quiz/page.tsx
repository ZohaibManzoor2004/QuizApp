'use client';
import React, { useState, useEffect } from 'react';
import { useUserStore } from "../login/userStore";
import { useRouter } from "next/navigation";
import { QuestionsData } from './Questions';
import { saveReport } from './Submit';

export default function Quiz() {
  const router = useRouter();
  const username = useUserStore((state) => state.username);

  useEffect(() => {
    if (!username) router.replace('/login');
  }, [username]);

  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQ, setCurrentQ] = useState(0); // show 1 question at a time
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [started, setStarted] = useState(false);

  const handleStart = async () => {
    const data = await QuestionsData();
    setQuestions(data);
    setStarted(true);
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    }
  };

  const handleSubmitQuiz = async () => {
    await saveReport({ username, answers: userAnswers, date: new Date() });
    alert("Quiz submitted!");
    router.replace("/report");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">

        <h1 className="text-2xl font-bold mb-4">Quiz Page</h1>
        <h2 className="text-gray-700 mb-4">Username: {username}</h2>

        {!started && (
          <button onClick={handleStart} className="border-2 px-4 py-2">
            Start Quiz
          </button>
        )}

        {started && questions.length > 0 && (
          <div>
            {/* Show only 1 question */}
            <h2 className="text-xl font-bold">
              Question {currentQ + 1}/{questions.length}
            </h2>
            <p className="mt-2">{questions[currentQ].question}</p>

            {questions[currentQ].options.map((option: string, idx: number) => (
              <label key={idx} className="block mt-2">
                <input
                  type={questions[currentQ].correctAnswers.length > 1 ? "checkbox" : "radio"}
                  name={`q-${currentQ}`}
                  value={option}
                  checked={userAnswers[currentQ] === option}
                  onChange={(e) =>
                    setUserAnswers(prev => ({
                      ...prev,
                      [currentQ]: e.target.value
                    }))
                  }
                />
                <span className="ml-2">{option}</span>
              </label>
            ))}

            <div className="mt-4">
              {currentQ < questions.length - 1 ? (
                <button className="border-2 px-4 py-2" onClick={handleNext}>
                  Next
                </button>
              ) : (
                <button className="border-2 px-4 py-2" onClick={handleSubmitQuiz}>
                  Submit Quiz
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
