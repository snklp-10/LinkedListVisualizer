"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ArrowRight } from "lucide-react";

const LinkedListCtrls = ({
  onPerform,
  onTraverseStart,
  onTraverseNext,
  isTraversing,
}: {
  onPerform: (
    operation: "insert" | "delete",
    position: "start" | "end" | "index",
    value?: number,
    index?: number,
  ) => void;
  onTraverseStart: () => void;
  onTraverseNext: () => void;
  isTraversing: boolean;
}) => {
  const [operation, setOperation] = useState<"insert" | "delete">("insert");
  const [position, setPosition] = useState<"start" | "end" | "index">("end");

  const [value, setValue] = useState("");
  const [index, setIndex] = useState("");

  const needsValue = operation === "insert";
  const needsIndex = position === "index";

  return (
    <div className="flex w-full gap-2 items-center justify-center flex-wrap">
      {/* ✅ Operation Select */}
      <Select
        value={operation}
        onValueChange={(val) => setOperation(val as any)}
      >
        <SelectTrigger className="w-37.5">
          <SelectValue placeholder="Operation" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="insert">Insert</SelectItem>
          <SelectItem value="delete">Delete</SelectItem>
        </SelectContent>
      </Select>

      {/* ✅ Position Select */}
      <Select value={position} onValueChange={(val) => setPosition(val as any)}>
        <SelectTrigger className="w-42.5">
          <SelectValue placeholder="Position" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="start">At Start</SelectItem>
          <SelectItem value="end">At End</SelectItem>
          <SelectItem value="index">At Index</SelectItem>
        </SelectContent>
      </Select>

      {/* ✅ Value Input (Insert only) */}
      <Input
        placeholder="Value"
        value={value}
        disabled={!needsValue}
        onChange={(e) => setValue(e.target.value)}
        className="w-35 disabled:opacity-40"
      />

      {/* ✅ Index Input (Only Index ops) */}
      <Input
        placeholder="Index"
        value={index}
        disabled={!needsIndex}
        onChange={(e) => setIndex(e.target.value)}
        className="w-35 disabled:opacity-40"
      />

      <Button
        variant="secondary"
        onClick={onTraverseStart}
        disabled={isTraversing}
      >
        Traverse
      </Button>
      <Button
        variant="secondary"
        onClick={onTraverseNext}
        className="flex items-center justify-center"
      >
        Next Step <ArrowRight />
      </Button>

      {/* ✅ Perform Button */}
      <Button
        className="px-6 py-2 rounded-xl font-semibold"
        onClick={() => {
          // Basic validation
          if (needsValue && value.trim() === "") return;
          if (needsIndex && index.trim() === "") return;

          onPerform(
            operation,
            position,
            needsValue ? Number(value) : undefined,
            needsIndex ? Number(index) : undefined,
          );

          // Reset inputs
          setValue("");
          setIndex("");
        }}
      >
        Perform
      </Button>
    </div>
  );
};

export default LinkedListCtrls;
