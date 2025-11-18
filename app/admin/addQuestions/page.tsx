'use client';
import React from 'react'
import { QuestionsData } from '@/app/quiz/Questions';
import { AddQuestion } from './helper';
// import fs from 'fs/promises';
type Props = {}

export default function page({ }: Props) {

    const handleSubmit = async (event: any) => {
        //event.preventDefault();
        const formData = new FormData(event.target);
        const question = formData.get("question");
        var options = formData.get("options");
        alert("New Question Added : ");
        var correctAnswers = formData.get("correctAnswers");
        console.log("Question from form : ", question);
        console.log("Options from form : ", options);
        console.log("correctAnswers from form : ", correctAnswers);

        let optionsArray: string[] = [];
        if (typeof options === 'string' && options.trim() !== '') {
            // Now TypeScript knows 'options' is a string
            optionsArray = options.split(',').map(option => option.trim());
            console.log("Options array form form : ", optionsArray);
        }
        let correctAnswerArray: string[] = [];
        if (typeof correctAnswers === 'string' && correctAnswers.trim() !== '') {
            // Now TypeScript knows 'options' is a string
            correctAnswerArray = correctAnswers.split(',').map(answer => answer.trim());
            console.log("correctAnswer array form form : ", correctAnswerArray);
        }

        var ExistingQuest = await QuestionsData();

        console.log("Questions Data read from addQuestions route : ", ExistingQuest);
        console.log("The length of the existing questions array is :", ExistingQuest.length)

        const id = ExistingQuest.length + 1;
        console.log("Questions Data read from addQuestions route : ", ExistingQuest);
        //console.log("The length of the existing questions array is :",ExistingQuest.length )

        const newQuestion = {
            id: id,
            question: question,
            options: optionsArray,
            correctAnswers: correctAnswerArray,
        }
        console.log("The object data of entire add questions flow : ", newQuestion);
        await AddQuestion(newQuestion);

    }
    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6"> Add Questions </h1>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="question" className="block text-gray-700 mb-2 font-medium">
                        Question:
                    </label>
                    <input
                        type="text"
                        id="question"
                        name="question"
                        placeholder="Enter your question here"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="options" className="block text-gray-700 mb-2 font-medium">
                        Options (comma separated):
                    </label>
                    <input
                        type="text"
                        name="options"
                        placeholder="Enter options separated by commas, e.g., 10,11,12,13,14"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                        Separate each option with a comma. These will be saved as an array.
                    </p>
                </div>
                <div>
                    <label htmlFor="options" className="block text-gray-700 mb-2 font-medium">
                        Correct Answer(s) (comma separated):
                    </label>
                    <input
                        type="text"
                        name="correctAnswers"
                        placeholder="Enter Correct Answers(s) separated by commas, e.g., 10,11,12,13,14"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                        Separate for Multiple answers with a comma. These will be saved as an array.
                    </p>
                </div>

                <button
                    type="submit"
                    className='w-full py-3 px-4 bg-blue-600 text-white font-semibold 
               rounded-lg shadow-md hover:bg-blue-700 focus:outline-none 
               focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out'                >
                    Add Question
                </button>
            </form>
        </div>
    )
}
