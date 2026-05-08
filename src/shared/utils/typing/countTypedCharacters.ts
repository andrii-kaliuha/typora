import type { Word } from "../../types/types";

export const countTypedCharacters = (text: Word[]): { correctChars: number; incorrectChars: number; untypedChars: number } => {
  let correctChars = 0;
  let incorrectChars = 0;
  let untypedChars = 0;

  text.forEach((word) => {
    word.letters.forEach((letter) => {
      if (letter.status === "correct") correctChars++;
      else if (letter.status === "incorrect") incorrectChars++;
      else if (letter.status === "untyped") untypedChars++;
    });
  });

  return { correctChars, incorrectChars, untypedChars };
};
