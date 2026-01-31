import { QUIZ_BANK } from "./quizBank";
import { QuizQuestion, QuizTopic } from "./types";

const DIFFICULTY_ORDER = ["easy", "medium", "hard"] as const;
type Difficulty = (typeof DIFFICULTY_ORDER)[number];

export type QuizEngineState = {
  askedIds: string[];
  currentDifficulty: Difficulty;
  operationCount: number;
};

export function createQuizEngine(): QuizEngineState {
  return {
    askedIds: [],
    currentDifficulty: "easy",
    operationCount: 0,
  };
}

export function registerOperation(state: QuizEngineState) {
  state.operationCount += 1;
}

export function shouldTriggerQuiz(
  state: QuizEngineState,
  interval: number = 3,
) {
  return state.operationCount > 0 && state.operationCount % interval === 0;
}

export function getNextQuiz(
  topic: QuizTopic,
  state: QuizEngineState,
): QuizQuestion | null {
  const candidates = QUIZ_BANK.filter(
    (q) =>
      q.topic === topic &&
      q.difficulty === state.currentDifficulty &&
      !state.askedIds.includes(q.id),
  );

  if (candidates.length === 0) return null;

  const selected = candidates[Math.floor(Math.random() * candidates.length)];

  state.askedIds.push(selected.id);

  return selected;
}

export function increaseDifficulty(state: QuizEngineState) {
  const idx = DIFFICULTY_ORDER.indexOf(state.currentDifficulty);
  if (idx < DIFFICULTY_ORDER.length - 1) {
    state.currentDifficulty = DIFFICULTY_ORDER[idx + 1];
  }
}

export function decreaseDifficulty(state: QuizEngineState) {
  const idx = DIFFICULTY_ORDER.indexOf(state.currentDifficulty);
  if (idx > 0) {
    state.currentDifficulty = DIFFICULTY_ORDER[idx - 1];
  }
}
