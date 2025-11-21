"use client";

import { create } from "zustand";
// Define the shape of a single object (a single question)
type QuestionObject = {
  id: number;
  question: string; // The question text itself
  options: string[]; // An array of strings for all choices
  correctAnswers: string[]; // An array of strings for the correct answer(s)
}

type QuizState = {
  // The state variable is an array of QuestionObject
  questions: QuestionObject[]; 
  
  // The action takes the new array of questions and returns nothing (void)
  setQuestions: (que: QuestionObject[]) => void; 
};

export const useQuestionStore = create<QuizState>((set) => ({
  // Initial state is an empty array that matches the QuestionObject[] type
  questions: [],
  
  // Action to replace the entire questions array
  setQuestions: (que) => set({ questions: que }),
}));
