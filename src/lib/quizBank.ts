import { QuizQuestion } from "./types";

export const QUIZ_BANK: QuizQuestion[] = [
  // ============================
  // INSERT AT END
  // ============================

  {
    id: "ins-end-1",
    topic: "insert-end",
    difficulty: "easy",
    question: "What happens when inserting a node at the end?",
    options: [
      "New node becomes the head",
      "Tail node points to the new node",
      "Head becomes NULL",
      "All nodes shift left",
    ],
    correctIndex: 1,
    hints: [
      "Insertion at end updates the last node.",
      "Which pointer changes at the tail?",
    ],
    explanation:
      "Insert at end means the current last node’s next pointer is updated to point to the new node.",
  },

  {
    id: "ins-end-2",
    topic: "insert-end",
    difficulty: "hard",
    question:
      "If you insert at end without a tail pointer, what is the time complexity?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correctIndex: 2,
    hints: [
      "You must first reach the last node.",
      "Traversal to the tail takes linear time.",
    ],
    explanation:
      "Without a tail pointer, insertion at end requires traversal, so complexity becomes O(n).",
  },

  // ============================
  // INSERT AT START
  // ============================

  {
    id: "ins-start-1",
    topic: "insert-start",
    difficulty: "easy",
    question: "What is the key pointer update in Insert at Start?",
    options: [
      "Old head points to NULL",
      "New node points to old head",
      "Tail points to head",
      "Index becomes -1",
    ],
    correctIndex: 1,
    hints: [
      "New node becomes the new head.",
      "It must connect to the previous first node.",
    ],
    explanation: "New node’s next pointer is set to the old head node.",
  },

  // ============================
  // INSERT AT INDEX
  // ============================

  {
    id: "ins-index-1",
    topic: "insert-index",
    difficulty: "medium",
    question: "To insert at index i, which node must be traversed first?",
    options: [
      "Node at index i",
      "Node at index i-1",
      "Always the head only",
      "NULL node",
    ],
    correctIndex: 1,
    hints: [
      "Insertion needs a previous pointer connection.",
      "The node before i rewires its next pointer.",
    ],
    explanation:
      "Insertion at index requires reaching node (i−1), then updating its next pointer.",
  },

  // ============================
  // DELETE AT END
  // ============================

  {
    id: "del-end-1",
    topic: "delete-end",
    difficulty: "easy",
    question: "Deleting at end requires updating which pointer?",
    options: [
      "Head pointer",
      "Second-last node’s next pointer",
      "Deleted node’s address",
      "NULL pointer becomes head",
    ],
    correctIndex: 1,
    hints: [
      "You must reconnect the new tail.",
      "The node before last must point to NULL.",
    ],
    explanation:
      "The second-last node’s next pointer becomes NULL after deletion.",
  },

  // ============================
  // DELETE AT START
  // ============================

  {
    id: "del-start-1",
    topic: "delete-start",
    difficulty: "easy",
    question: "Which node is removed in Delete at Start?",
    options: ["Tail", "Head", "Middle", "NULL"],
    correctIndex: 1,
    hints: ["Start always refers to the head node."],
    explanation:
      "Delete at start removes the head and shifts head to the next node.",
  },

  // ============================
  // DELETE AT INDEX
  // ============================

  {
    id: "del-index-1",
    topic: "delete-index",
    difficulty: "hard",
    question:
      "When deleting at index i, what must prev.next point to afterward?",
    options: [
      "The deleted node",
      "NULL always",
      "Node at index i+1",
      "Head node",
    ],
    correctIndex: 2,
    hints: [
      "Deletion skips a node in the chain.",
      "The list must reconnect around the removed node.",
    ],
    explanation:
      "Prev.next must point directly to the node after the removed one.",
  },

  // ============================
  // TRAVERSAL
  // ============================

  {
    id: "trav-1",
    topic: "traverse",
    difficulty: "medium",
    question: "Traversal stops when the pointer reaches?",
    options: ["Head", "Tail", "NULL", "Index 0"],
    correctIndex: 2,
    hints: ["NULL means there is no next node."],
    explanation: "Traversal continues node-by-node until next becomes NULL.",
  },
];
