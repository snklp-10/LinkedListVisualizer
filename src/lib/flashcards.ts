import { Flashcard, OperationType, OperationPosition } from "./types";

export const FLASHCARD_MAP: Record<
  `${OperationType}-${OperationPosition}`,
  Flashcard
> = {
  // INSERT
  "insert-start": {
    title: "Insert at Start",
    description:
      "A new node becomes the head. Its next pointer is set to the old head node.",
    complexity: "Time: O(1)",
  },

  "insert-end": {
    title: "Insert at End",
    description:
      "A new node is added after the last node. The previous tail’s next pointer is updated.",
    complexity: "Time: O(1)* (O(n) without tail)",
  },

  "insert-index": {
    title: "Insert at Index",
    description:
      "Traversal happens until index-1. Links are rewired to insert the new node in between.",
    complexity: "Time: O(n)",
  },

  // DELETE
  "delete-start": {
    title: "Delete at Start",
    description: "The head node is removed. Head shifts to the next node.",
    complexity: "Time: O(1)",
  },

  "delete-end": {
    title: "Delete at End",
    description:
      "Traversal reaches the second-last node. Its next pointer becomes NULL.",
    complexity: "Time: O(n)",
  },

  "delete-index": {
    title: "Delete at Index",
    description:
      "Traversal reaches index-1. The node is skipped by updating next pointer.",
    complexity: "Time: O(n)",
  },

  "traverse-start": {
    title: "Traverse Linked List",
    description:
      "Traversal visits nodes one-by-one starting from Head until NULL is reached. A temporary pointer moves through the list.",
    complexity: "Time: O(n)",
  },
  "traverse-end": {
    title: "",
    description: "",
    complexity: "",
  },
  "traverse-index": {
    title: "",
    description: "",
    complexity: "",
  },
};

export function getFlashcard(
  operation: OperationType,
  position: OperationPosition,
): Flashcard {
  return (
    FLASHCARD_MAP[`${operation}-${position}`] || {
      title: "Linked List Operation",
      description: "Select an operation to begin.",
      complexity: "-",
    }
  );
}
