"use client";
import React, { useEffect, useState } from "react";
import { QuizQuestion } from "@/lib/types";
import { Button } from "../ui/button";

const LinkedListQuiz = ({
  question,
  onCorrect,
}: {
  question: QuizQuestion | null;
  onCorrect: () => void;
}) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [hintStep, setHintStep] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    setSelected(null);
    setHintStep(0);
    setFeedback(null);
    setIsAnswered(false);
  }, [question]);

  if (!question) {
    return (
      <div className="border rounded-2xl p-6 flex items-center justify-center text-gray-500">
        Quiz will appear after a few operations
      </div>
    );
  }
  const activeQuestion = question;
  const hints = activeQuestion.hints ?? [];

  const checkAnswer = () => {
    if (selected === null || isAnswered) return;

    if (selected === activeQuestion.correctIndex) {
      setFeedback("✅ Correct! Well done.");
      setIsAnswered(true);
      onCorrect();
      return;
    }

    if (hintStep < activeQuestion.hints.length) {
      setFeedback("❌ Wrong. 💡 Hint: " + hints[hintStep]);
      setHintStep((prev) => prev + 1);
      return;
    }

    setFeedback("❌ Wrong. Explanation: " + activeQuestion.explanation);
  };

  return (
    <div className="border rounded-2xl p-4 space-y-2">
      <h2 className="font-bold text-lg">Time for a short Quiz 🧠</h2>

      {/* ✅ Question */}
      <p className="font-semibold">{activeQuestion.question}</p>

      {/* ✅ Options */}
      <div className="space-y-2">
        {activeQuestion.options.map((opt, i) => (
          <button
            key={i}
            disabled={isAnswered}
            onClick={() => setSelected(i)}
            className={`w-full text-left px-4 py-2 rounded-xl border transition
              ${
                selected === i
                  ? "bg-blue-100 border-blue-400"
                  : "hover:bg-gray-50"
              }
              disabled:opacity-50`}
          >
            {opt}
          </button>
        ))}
        <Button onClick={checkAnswer} className="w-full" disabled={isAnswered}>
          Submit Answer
        </Button>
      </div>

      {/* ✅ Submit Button */}

      {/* ✅ Feedback */}

      {feedback && (
        <p className="text-sm font-medium mt-4 text-gray-700">{feedback}</p>
      )}
    </div>
  );
};

export default LinkedListQuiz;
