'use client';
import React, { useState, useEffect } from 'react';
import { useUserStore } from "../login/userStore";
import { useRouter } from "next/navigation";
import { QuestionsData } from './Questions';
import { saveReport } from './Submit';

export default function Quiz() {

    const username = useUserStore((state) => state.username);
    const router = useRouter();

    const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
    const [questions, setQuestions] = useState<any[]>([]);
    const [viewQues, setViewQues] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Redirect if not logged in
    useEffect(() => {
        if (!username) {
            router.replace('./login');
        }
    }, [username, router]);

    // Start Quiz
    const handleClick = async () => {
        const QuestionData = await QuestionsData();
        setQuestions(QuestionData);
        setViewQues(true);
        console.log("Loaded question data: ", QuestionData);
    };

    // Submit Quiz
    const handleSubmitQuiz = async () => {
        await saveReport({ username, answers: userAnswers, date: new Date() });
        alert("Quiz submitted!");
        router.replace('./report');
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
                
                <div className="text-2xl font-bold text-gray-800 mb-4">
                    This is Quiz Page
                </div>

                <h1 className="text-lg text-gray-600">
                    The Username is: 
                    <span className="font-semibold text-blue-600">
                        {username || "Not logged in"}
                    </span>
                </h1>

                {!viewQues && (
                    <button 
                        onClick={handleClick}
                        className="border-2 px-4 py-2 mt-4"
                    >
                        Click to start Quiz
                    </button>
                )}

                {/* Show only ONE question at a time */}
                {viewQues && questions.length > 0 && (
                    <div className="mt-6 space-y-4">

                        {/* Current Question */}
                        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-bold">
                                Question {currentIndex + 1} of {questions.length}:
                            </h2>

                            <p className="mt-2">{questions[currentIndex].question}</p>

                            {questions[currentIndex].options.map((option: string, idx: number) => {
                                const opType =
                                    questions[currentIndex].correctAnswers.length > 1
                                        ? "checkbox"
                                        : "radio";

                                return (
                                    <label key={idx} className="block mt-2">
                                        <input
                                            type={opType}
                                            name={`question-${currentIndex}`}
                                            value={option}
                                            checked={userAnswers[currentIndex] === option}
                                            onChange={(e) =>
                                                setUserAnswers(prev => ({
                                                    ...prev,
                                                    [currentIndex]: e.target.value
                                                }))
                                            }
                                            className="mr-2"
                                        />
                                        {option}
                                    </label>
                                );
                            })}
                        </div>

                        {/* NEXT button (not on last question) */}
                        {currentIndex < questions.length - 1 && (
                            <button
                                className="border px-4 py-2"
                                onClick={() => setCurrentIndex(currentIndex + 1)}
                            >
                                Next
                            </button>
                        )}

                        {/* SUBMIT button (only last question) */}
                        {currentIndex === questions.length - 1 && (
                            <button
                                className="border px-4 py-2"
                                onClick={handleSubmitQuiz}
                            >
                                Submit Quiz
                            </button>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
}
