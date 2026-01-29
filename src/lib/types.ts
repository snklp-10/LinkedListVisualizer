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

export type OperationType = "insert" | "delete";
export type OperationPosition = "start" | "end" | "index";
