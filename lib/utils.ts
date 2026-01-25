import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateMatchScore(
  userLanguagesLearn: string[],
  candidateLanguagesSpeak: string[],
  userLanguagesSpeak: string[],
  candidateLanguagesLearn: string[],
  userRole: string,
  candidateRole: string,
  userState: string,
  candidateState: string,
  userInterests: string[],
  candidateInterests: string[]
): number {
  let score = 0;

  // Language compatibility (50 points)
  const hasLanguageMatch = userLanguagesLearn.some(lang =>
    candidateLanguagesSpeak.includes(lang)
  );
  if (hasLanguageMatch) score += 50;

  // Mutual exchange (30 points)
  const hasMutualExchange = candidateLanguagesLearn.some(lang =>
    userLanguagesSpeak.includes(lang)
  );
  if (hasMutualExchange) score += 30;

  // Role compatibility (20 points)
  if (
    (userRole === "learner" && candidateRole === "teacher") ||
    (userRole === "teacher" && candidateRole === "learner")
  ) {
    score += 20;
  }

  // Same state (10 points)
  if (userState === candidateState) score += 10;

  // Shared interests (5 pts each, max 20)
  const sharedInterests = userInterests.filter(interest =>
    candidateInterests.includes(interest)
  );
  score += Math.min(sharedInterests.length * 5, 20);

  return score;
}