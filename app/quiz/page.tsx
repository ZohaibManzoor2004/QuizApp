'use client';
import React, { useState, useEffect } from 'react';
import { useUserStore } from "../login/userStore";
import { useRouter } from "next/navigation";
import { QuestionsData } from './Questions';
import { saveReport } from './Submit';

type Props = {}
export default function Quiz({ }: Props) {
let username = useUserStore((state) => state.username);

    useEffect(() => {
        if (!username) {
            router.replace('./login');
        }
    })
    let toggle = false;
    const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
    let [questions, setQuestions] = useState<any[]>([]);
    let [viewQues, setViewQues] = useState(toggle);
   // let [inputType, setInputType] = useState("");
    const router = useRouter();
    const handleClick = async () => {
        setViewQues(!toggle);
        let QuestionData = await QuestionsData();
        setQuestions(QuestionData)
        console.log("The questions' data consoled from HandleClick : ", QuestionData);
        console.log("QuestionData.options : ", QuestionData[1].correctAnswers);
    }
    const handleSubmitQuiz = async () => {
        console.log("Quiz is Submitted: ");
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
                    The Username is: <span className="font-semibold text-blue-600">
                        {username || "Not logged in"}
                    </span>
                </h1>
                <button onClick={handleClick}
                    className="flex center border-2">
                    Click to start Quiz
                </button>
                {viewQues && questions.length > 0 && (
                    <div className="mt-6 space-y-4">
                        {questions.map((q, index) => (
                            <div key={index} className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-bold">Question {index + 1}:</h2>
                                <p>{q.question}</p>
                                {q.options.map((option: string, idx: number) => {
                                    const opType = q.correctAnswers.length > 1 ? "checkbox" : "radio";
                                    return (
                                        <label key={idx} className="block">
                                                <input
                                                    type={opType}
                                                    name={`question-${index}`}
                                                    value={option}
                                                    checked={userAnswers[index] === option}
                                                    onChange={(e) =>
                                                        setUserAnswers(prev => ({ ...prev, [index]: e.target.value }))
                                                    }
                                                    className="mr-2"
                                                />
                                            {option}
                                        </label>
                                    );
                                })}

                            </div>
                        ))}
                        <button className='flex center border-2' onClick={handleSubmitQuiz}>
                            Submit Quiz
                        </button>
                    </div>
                )}

            </div>
        </div>
    )
}