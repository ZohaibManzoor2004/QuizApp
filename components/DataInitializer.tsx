'use client';

import { useEffect } from "react";
import { useQuestionStore } from "../components/stores/QuestionsStore";

export function DataInitializer() {
  const { setQuestions, questions } = useQuestionStore((state) => ({
    setQuestions: state.setQuestions,
    questions: state.questions,
  }));

  // Only load if not already loaded (prevents double fetching)
  useEffect(() => {
    if (questions.length === 0) {
      async function loadQuestions() {
        console.log("Fetching questions from JSON...");
        const res = await fetch("/questions.json");
        const data = await res.json();
        console.log("Data loaded:", data.length);
        setQuestions(data);
      }
      loadQuestions();
    }
  }, [questions, setQuestions]);

  // Component returns nothing (invisible initializer)
  return null;
}
