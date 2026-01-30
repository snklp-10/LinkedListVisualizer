"use client";
import { LinkedList } from "@/lib/linkedList";
import React, { useRef, useState } from "react";
import LinkedListDisplay from "./linkedlistDisplay";
import LinkedListCtrls from "./linkedListCtrls";
import {
  ActivityLog,
  Flashcard,
  OperationPosition,
  OperationType,
} from "@/lib/types";
import LinkedListLog from "./linkedlistLog";
import LinkedListCode from "./linkedlistCode";
import { getFlashcard } from "@/lib/flashcards";

const LinkedListVisualizer = () => {
  const listRef = useRef(new LinkedList());

  const [nodes, setNodes] = useState(listRef.current.getNodes());
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [isTraversing, setIsTraversing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const [flashcard, setFlashcard] = useState<Flashcard>({
    title: "Linked List ready",
    description: "Select an operation to begin",
    complexity: "None",
  });

  const startTraversal = () => {
    if (nodes.length === 0) {
      addLog("Cannot traverse: List is empty", "error");
      return;
    }
    setFlashcard(getFlashcard("traverse", "start"));
    setIsTraversing(true);
    setCurrentIndex(0);

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

    addLog(
      `Pointer moved to node with value ${nodes[nextIndex].value}`,
      "info",
    );
  };

  const resetTraversal = () => {
    setIsTraversing(false);
    setCurrentIndex(null);
    addLog("Traversal reset", "info");
  };

  const handlePerform = (
    operation: OperationType,
    position: OperationPosition,
    value?: number,
    index?: number,
  ) => {
    // ✅ Flashcard updates immediately
    setFlashcard(getFlashcard(operation, position));

    setIsTraversing(false);
    setCurrentIndex(null);

    if (operation === "insert") {
      if (value === undefined || isNaN(value)) {
        addLog("Insert requires a valid value", "error");
        return;
      }

      if (position === "end") {
        listRef.current.insertAtEnd(value);
        addLog(`Inserted ${value} at end`, "success");
      }

      if (position === "start") {
        listRef.current.insertAtStart(value);
        addLog(`Inserted ${value} at start`, "success");
      }

      if (position === "index") {
        if (index === undefined || isNaN(index)) {
          addLog("Insert at index requires a valid index", "error");
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
      if (position === "end") {
        const removed = listRef.current.deleteAtEnd();

        if (!removed) {
          addLog("Cannot delete: List empty", "error");
          return;
        }

        addLog(`Deleted ${removed.value} from end`, "success");
      }

      if (position === "start") {
        const removed = listRef.current.deleteAtStart();

        if (!removed) {
          addLog("Cannot delete: List empty", "error");
          return;
        }

        addLog(`Deleted ${removed.value} from start`, "success");
      }

      if (position === "index") {
        if (index === undefined || isNaN(index)) {
          addLog("Delete at index requires a valid index", "error");
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

    // ✅ Update UI snapshot
    setNodes([...listRef.current.getNodes()]);
  };

  const addLog = (message: string, type: ActivityLog["type"] = "info") => {
    const newLog: ActivityLog = {
      id: crypto.randomUUID(),
      message,
      type,
    };

    setLogs((prev) => {
      const updated = [newLog, ...prev];

      return updated.slice(0, 5);
    });
  };

  return (
    <div className="flex flex-col w-full max-w-9xl space-y-6 text-center">
      <h1 className="text-3xl font-bold">Linked List Visualizer</h1>

      <div className="border rounded-3xl p-6 space-y-6 shadow-sm">
        <LinkedListDisplay nodes={nodes} currentIndex={currentIndex} />

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="border rounded-2xl py-2">
              <h2 className="font-bold text-lg">Linked List Activity Log</h2>
              <LinkedListLog logs={logs} />
            </div>

            {/* Flashcards Placeholder */}
            <div className="border rounded-2xl p-4 h-35">
              <p className="font-semibold text-blue-600">{flashcard.title}</p>

              <p className="text-sm text-gray-600 mt-1">
                {flashcard.description}
              </p>

              <p className="text-sm font-medium text-green-700 mt-2">
                {flashcard.complexity}
              </p>
            </div>
          </div>

          {/* Right Panel: Code Snippet */}
          <div className="border rounded-xl">
            <LinkedListCode />
          </div>
        </div>

        {/* ✅ Progress Bar Placeholder */}
        <div className="border rounded-xl h-11.25 flex overflow-hidden">
          <div className="w-[70%] bg-green-200 flex items-center justify-center font-semibold">
            Progress Bar
          </div>
          <div className="w-[30%] flex items-center justify-center font-semibold">
            Progress
          </div>
        </div>

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
