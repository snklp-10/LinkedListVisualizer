"use client";

import React, { useRef, useState } from "react";
import { LinkedList } from "@/lib/linkedList";

import LinkedListDisplay from "./linkedlistDisplay";
import LinkedListCtrls from "./linkedListCtrls";
import LinkedListLog from "./linkedlistLog";
import logo from "../../../public/graphic 1.png";
import {
  ActivityLog,
  Flashcard,
  OperationPosition,
  OperationType,
  QuizQuestion,
  QuizTopic,
} from "@/lib/types";

import { getFlashcard } from "@/lib/flashcards";

import {
  createQuizEngine,
  registerOperation,
  shouldTriggerQuiz,
  getNextQuiz,
  increaseDifficulty,
} from "@/lib/quizEngine";
import LinkedListQuiz from "./linkedlistQuiz";
import { Progress } from "../ui/progress";
import Image from "next/image";

const LinkedListVisualizer = () => {
  const listRef = useRef(new LinkedList());

  // ✅ Linked List State
  const [nodes, setNodes] = useState(listRef.current.getNodes());

  // ✅ Logs
  const [logs, setLogs] = useState<ActivityLog[]>([]);

  // ✅ Traversal State
  const [isTraversing, setIsTraversing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  // ✅ Flashcard State
  const [flashcard, setFlashcard] = useState<Flashcard>({
    title: "Linked List Ready",
    description: "Select an operation to begin",
    complexity: "None",
  });

  // ✅ Quiz System State
  const quizEngine = useRef(createQuizEngine());
  const [quiz, setQuiz] = useState<QuizQuestion | null>(null);
  const [progress, setProgress] = useState(0);

  /* ==============================
     Activity Log Helper
  ============================== */

  const addLog = (message: string, type: ActivityLog["type"] = "info") => {
    const newLog: ActivityLog = {
      id: crypto.randomUUID(),
      message,
      type,
    };

    setLogs((prev) => [newLog, ...prev].slice(0, 5));
  };

  const startTraversal = () => {
    if (nodes.length === 0) {
      addLog("Cannot traverse: List is empty", "error");
      return;
    }

    const nextQ = getNextQuiz("traverse", quizEngine.current);

    setFlashcard(getFlashcard("traverse", "start"));

    setIsTraversing(true);
    setCurrentIndex(0);

    if (nextQ) {
      setQuiz(nextQ);
      addLog("Traversal quiz unlocked ✅", "info");
    }

    addLog("Traversal started at Head", "info");
  };

  const nextTraversalStep = () => {
    if (currentIndex === null) return;

    if (currentIndex === nodes.length - 1) {
      addLog("Traversal complete: Reached NULL", "success");

      setFlashcard({
        title: "Traversal Complete",
        description:
          "The pointer has reached NULL. All nodes have been visited.",
        complexity: "Visited all nodes: O(n)",
      });

      setIsTraversing(false);
      setCurrentIndex(null);
      return;
    }

    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);

    addLog(`Pointer moved to node ${nodes[nextIndex].value}`, "info");
  };

  const handleCorrectQuiz = () => {
    increaseDifficulty(quizEngine.current);

    setProgress((prev) => Math.min(prev + 20, 100));

    addLog("✅ Quiz answered correctly! Progress increased.", "success");

    setQuiz(null);
  };

  const handlePerform = (
    operation: OperationType,
    position: OperationPosition,
    value?: number,
    index?: number,
  ) => {
    // ✅ Update Flashcard Immediately
    setFlashcard(getFlashcard(operation, position));

    // ✅ Reset Traversal
    setIsTraversing(false);
    setCurrentIndex(null);

    if (operation === "insert") {
      if (value === undefined || isNaN(value)) {
        addLog("Insert requires a valid value", "error");
        return;
      }

      if (position === "start") {
        listRef.current.insertAtStart(value);
        addLog(`Inserted ${value} at start`, "success");
      }

      if (position === "end") {
        listRef.current.insertAtEnd(value);
        addLog(`Inserted ${value} at end`, "success");
      }

      if (position === "index") {
        if (index === undefined || isNaN(index)) {
          addLog("Insert at index requires valid index", "error");
          return;
        }

        try {
          listRef.current.insertAtIndex(value, index);
          addLog(`Inserted ${value} at index ${index}`, "success");
        } catch {
          addLog("Index out of bounds", "error");
          return;
        }
      }
    }

    if (operation === "delete") {
      if (position === "start") {
        const removed = listRef.current.deleteAtStart();

        if (!removed) {
          addLog("Cannot delete: List empty", "error");
          return;
        }

        addLog(`Deleted ${removed.value} from start`, "success");
      }

      if (position === "end") {
        const removed = listRef.current.deleteAtEnd();

        if (!removed) {
          addLog("Cannot delete: List empty", "error");
          return;
        }

        addLog(`Deleted ${removed.value} from end`, "success");
      }

      if (position === "index") {
        if (index === undefined || isNaN(index)) {
          addLog("Delete at index requires valid index", "error");
          return;
        }

        try {
          const removed = listRef.current.deleteAtIndex(index);

          if (!removed) {
            addLog("Cannot delete: List empty", "error");
            return;
          }

          addLog(`Deleted ${removed.value} at index ${index}`, "success");
        } catch {
          addLog("Index out of bounds", "error");
          return;
        }
      }
    }

    // ✅ Refresh Nodes
    setNodes([...listRef.current.getNodes()]);

    // ✅ Register Operation for Quiz Engine
    registerOperation(quizEngine.current);

    // ✅ Trigger Quiz Every 3 Operations
    if (shouldTriggerQuiz(quizEngine.current, 3)) {
      const topic = `${operation}-${position}` as QuizTopic;

      const nextQ = getNextQuiz(topic, quizEngine.current);

      if (nextQ) {
        setQuiz(nextQ);
        addLog("Quiz unlocked! Answer to gain progress ✅", "info");
      }
    }
  };

  return (
    <div className="flex flex-col w-full max-w-6xl space-y-6 text-center items-center">
      <h1 className="text-3xl font-bold flex justify-center items-center">
        Linked List Visualizer
      </h1>

      <div className="border rounded-3xl p-6 space-y-6 shadow-sm">
        {/* ✅ Display */}
        <LinkedListDisplay nodes={nodes} currentIndex={currentIndex} />

        {/* ✅ Middle Layout */}
        <div className="grid grid-cols-2 gap-6">
          {/* LEFT */}
          <div className="space-y-4">
            {/* Logs */}
            <div className="border rounded-2xl py-3">
              <h2 className="font-bold text-lg">Activity Log</h2>
              <LinkedListLog logs={logs} />
            </div>

            {/* Flashcard */}
            <div className="border rounded-2xl p-4">
              <p className="font-semibold text-blue-600">{flashcard.title}</p>

              <p className="text-sm text-gray-600 mt-1">
                {flashcard.description}
              </p>

              <p className="text-sm font-medium text-green-700 mt-2">
                {flashcard.complexity}
              </p>
            </div>
          </div>

          {/* RIGHT: Quiz Box */}
          <LinkedListQuiz question={quiz} onCorrect={handleCorrectQuiz} />
        </div>

        {/* ✅ Real Progress Bar */}
        <div className="space-y-2">
          <Progress value={progress} className="h-10 rounded-xl" />
        </div>

        {/* ✅ Controls */}
        <LinkedListCtrls
          onPerform={handlePerform}
          onTraverseNext={nextTraversalStep}
          onTraverseStart={startTraversal}
          isTraversing={isTraversing}
        />
      </div>
    </div>
  );
};

export default LinkedListVisualizer;
