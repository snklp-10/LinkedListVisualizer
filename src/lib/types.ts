export type ListNode = {
  id: string;
  value: number;
  adddress: string;
  next: string | null;
};

export type ActivityLog = {
  id: string;
  message: string;
  type: "info" | "success" | "error";
};

export type Flashcard = {
  title: string;
  description: string;
  complexity: string;
};

export type QuizTopic =
  | "insert-start"
  | "insert-end"
  | "insert-index"
  | "delete-start"
  | "delete-end"
  | "delete-index"
  | "traverse";

export type QuizQuestion = {
  id: string;
  topic: QuizTopic;
  difficulty: "easy" | "medium" | "hard";

  question: string;
  options: string[];
  correctIndex: number;

  hints: string[];
  explanation: string;
};

export type OperationType = "insert" | "delete" | "traverse";
export type OperationPosition = "start" | "end" | "index";
