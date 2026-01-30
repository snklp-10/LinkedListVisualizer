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

export type OperationType = "insert" | "delete" | "traverse";
export type OperationPosition = "start" | "end" | "index";
