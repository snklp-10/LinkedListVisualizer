"use client";
import { LinkedList } from "@/lib/linkedList";
import React, { useRef, useState } from "react";
import LinkedListDisplay from "./linkedlistDisplay";
import LinkedListCtrls from "./linkedListCtrls";
import { ActivityLog, OperationPosition, OperationType } from "@/lib/types";
import LinkedListLog from "./linkedlistLog";
import LinkedListCode from "./linkedlistCode";

const LinkedListVisualizer = () => {
  const listRef = useRef(new LinkedList());

  const [nodes, setNodes] = useState(listRef.current.getNodes());
  const [logs, setLogs] = useState<ActivityLog[]>([]);

  //   const handleInsert = (value: number) => {
  //     listRef.current.insertAtEnd(value);

  //     setNodes([...listRef.current.getNodes()]);

  //     addLog(`Inserted node ${value} at the end`, "success");
  //   };

  //   const handleDelete = () => {
  //     const removed = listRef.current.deleteAtEnd();

  //     if (!removed) {
  //       addLog("Cannot delete: List is empty", "error");
  //       return;
  //     }

  //     setNodes([...listRef.current.getNodes()]);
  //     addLog(`Deleted node ${removed.value} from the end`, "success");
  //   };

  const handlePerform = (
    operation: OperationType,
    position: OperationPosition,
    value?: number,
    index?: number,
  ) => {
    if (operation === "insert") {
      if (value === undefined) {
        addLog("Insert requires a value", "error");
        return;
      }

      if (position === "end") {
        listRef.current.insertAtEnd(value);
        addLog(`Inserted ${value} at end`, "success");
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
    }

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
    <div className="flex flex-col w-full max-w-5xl space-y-6 text-center">
      <h1 className="text-3xl font-bold">Linked List Visualizer</h1>

      <div className="border rounded-3xl p-6 space-y-6 shadow-sm">
        <LinkedListDisplay nodes={nodes} />

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="border rounded-2xl py-2">
              <h2 className="font-bold text-lg">Linked List Activity Log</h2>
              <LinkedListLog logs={logs} />
            </div>

            {/* Flashcards Placeholder */}
            <div className="border rounded-2xl p-4 h-35">
              <h2 className="font-bold text-lg mb-2">Flashcards</h2>
              <p className="text-sm text-gray-500">
                Operation explanation will appear here.
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

        <LinkedListCtrls onPerform={handlePerform} />
      </div>
    </div>
  );
};

export default LinkedListVisualizer;
