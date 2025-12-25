'use client';
import React, { useState } from 'react';
import { FetchQuestions, UpdateQuestions, DeleteQue } from './EditHelper';

type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswers: string[];
};

export default function Page() {
  const [questions, setQuestions] = useState<Question[]>([]);

  // Load questions from server or file
  const handleLoad = async () => {
    const data = await FetchQuestions();
    setQuestions(data);
  };

  // Delete a question
  const handleDelete = async (id: number) => {
    try {
      const deleted = await DeleteQue(id);
      console.log("Deleted question response:", deleted);
      console.log("ID of question to be deleted:", id);
      setQuestions(prev => prev.filter(q => q.id !== id)); 
      if (deleted.length > 0) {
        alert(`Question deleted successfully with id ${id}`);
      } else {
        alert(`No question found with id ${id}`);
      }
    } catch (err) {
      console.error("Error deleting question:", err);
      alert("Failed to delete the question.");
    }
  };
  // // Delete a question
  // const handleDelete = (id: number) => {
  //   setQuestions(prev => prev.filter(q => q.id !== id));
  // };
  
  // Update all questions
  const handleUpdateAll = async () => {
    await UpdateQuestions(questions);
    // await UpdateQuestions(questions);
    console.log('Updated questions:', questions);
    alert('All questions updated successfully!');
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Edit Questions</h1>

      {/* Load Questions */}
      
      <button
        type="submit"
        className='w-full py-3 px-4 bg-purple-600 text-white font-semibold 
               rounded-lg shadow-md hover:bg-red-700 focus:outline-none 
               focus:ring-4 focus:ring-blue-300 transition duration-600 ease-in-out mt-4'
        onClick={() => window.location.href = '/admin'}
      >
        {'<= .. Back To Admin Panel'}
      </button>

      <button
        onClick={handleLoad}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Load Questions
      </button>

      {/* Questions List */}
      <div className="space-y-6 mt-4">
        {questions.map((q, idx) => (
          <div key={q.id} className="border p-4 rounded-lg">

            <p className="font-semibold mb-2">ID: {q.id}</p>

            <p>Question</p>
            <input
              type="text"
              className="border p-2 w-full mb-2"
              value={q.question}
              onChange={(e) => {
                const newQuestions = [...questions];
                newQuestions[idx].question = e.target.value;
                setQuestions(newQuestions);
              }}
            />

            <p>Options (comma separated)</p>
            <input
              type="text"
              className="border p-2 w-full mb-2"
              value={q.options.join(",")}
              onChange={(e) => {
                const newQuestions = [...questions];
                newQuestions[idx].options = e.target.value.split(",");
                setQuestions(newQuestions);
              }}
            />

            <p>Correct Answers (comma separated)</p>
            <input
              type="text"
              className="border p-2 w-full mb-3"
              value={q.correctAnswers.join(",")}
              onChange={(e) => {
                const newQuestions = [...questions];
                newQuestions[idx].correctAnswers = e.target.value.split(",");
                setQuestions(newQuestions);
              }}
            />

            <button
              onClick={() => handleDelete(q.id)}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        ))}

        {/* Update All Button */}
        {questions.length > 0 && (
          <button
            onClick={handleUpdateAll}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Update All
          </button>
        )}
      </div>
    </div>
  );
}
