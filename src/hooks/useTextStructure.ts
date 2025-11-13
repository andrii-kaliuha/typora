import { useMemo } from "react";
import type { LetterData, WordData, TypedHistoryEntry } from "../types/types";
import { getCharStatus, getWordStatus } from "../utils/utils";

type useTextStructureProps = { targetText: string; typedText: string; typedHistory: TypedHistoryEntry[] };

export const useTextStructure = ({ targetText, typedText, typedHistory }: useTextStructureProps): WordData[] => {
  const textData: WordData[] = useMemo(() => {
    const words = targetText.match(/\S+/g) || [];

    return words.map((word, wordIndex) => {
      const startIndex = words.slice(0, wordIndex).reduce((sum, w) => sum + w.length + 1, 0);

      const lettersData: LetterData[] = word.split("").map((char, charIndex) => {
        const globalIndex = startIndex + charIndex;
        const status = getCharStatus(char, globalIndex, typedText);
        const typedAt = typedHistory[globalIndex] ? typedHistory[globalIndex][1] : null;

        return {
          letter: char,
          status: status as LetterData["status"],
          typedAt: typedAt,
        };
      });

      const isLastWord = wordIndex === words.length - 1;

      if (!isLastWord) {
        const spaceIndex = startIndex + word.length;
        lettersData.push({
          letter: " ",
          status: getCharStatus(" ", spaceIndex, typedText) as LetterData["status"],
          typedAt: typedHistory[spaceIndex] ? typedHistory[spaceIndex][1] : null,
        });
      }

      const wordStatus = getWordStatus(lettersData) as WordData["status"];

      return {
        letters: lettersData,
        status: wordStatus,
      };
    });
  }, [targetText, typedText, typedHistory]);

  return textData;
};
