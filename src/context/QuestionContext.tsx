"use client";

import React, { createContext, useState, useContext } from "react";

const questions = [
  { id: 1, question: "Let’s name your chatbot. What should it be?", sum: "name" },
  {
    id: 2,
    question: "What is the primary purpose of your chatbot?",
    sum: "purpose",
  },
  {
    id: 3,
    question: "What is the intended scope of your chatbot?",
    sum: "scope",
  },
  {
    id: 4,
    question:
      "What kind of conversational style should your chatbot have: friendly, professional, empathetic, or playful?",
    sum: "style",
  },
  { id: 5, question: "What language(s) should your chatbot support?", sum: "languages" },
];

type QuestionContextType = {
  currentQuestion: { id: number; question: string; sum: string } | null;
  setCurrentQId: (value: number | null) => void;
  firstQ: string;
};

const QuestionContext = createContext<QuestionContextType | null>(null);

const QuestionProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentQId, setCurrentQId] = useState<number | null>(1);

  const currentQuestion = questions.find((q) => q.id === currentQId) || null;

  const firstQ = questions[0].question;

  return (
    <QuestionContext.Provider value={{ setCurrentQId, currentQuestion, firstQ }}>
      {children}
    </QuestionContext.Provider>
  );
};

const useQuestion = () => {
  const context = useContext(QuestionContext);

  if (!context) {
    throw new Error("useQuestion must be used within a QuestionProvider");
  }

  return context;
};

export { QuestionProvider, useQuestion };
