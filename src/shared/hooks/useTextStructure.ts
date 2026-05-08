import { useMemo } from "react";
import type { Letter, Word, TypedHistoryEntry } from "../types/types";
import { getCharStatus, getWordStatus } from "../utils/typing/getStatus";

type useTextStructureProps = { targetText: string; typedText: string; typedHistory: TypedHistoryEntry[] };

export const useTextStructure = ({ targetText, typedText, typedHistory }: useTextStructureProps): Word[] => {
  const textData: Word[] = useMemo(() => {
    const words = targetText.match(/\S+/g) || [];
    const charHistory = typedHistory.filter((e) => e.type === "char");

    return words.map((word, wordIndex) => {
      const startIndex = words.slice(0, wordIndex).reduce((sum, w) => sum + w.length + 1, 0);

      const lettersData: Letter[] = word.split("").map((char, charIndex) => {
        const globalIndex = startIndex + charIndex;
        const status = getCharStatus(char, globalIndex, typedText);
        const typedAt = charHistory[globalIndex]?.timestamp ?? null;
        return {
          letter: char,
          status: status as Letter["status"],
          typedAt: typedAt,
        };
      });

      const isLastWord = wordIndex === words.length - 1;

      if (!isLastWord) {
        const spaceIndex = startIndex + word.length;
        lettersData.push({
          letter: " ",
          status: getCharStatus(" ", spaceIndex, typedText) as Letter["status"],
          typedAt: charHistory[spaceIndex]?.timestamp ?? null,
        });
      }

      const wordStatus = getWordStatus(lettersData) as Word["status"];

      return {
        letters: lettersData,
        status: wordStatus,
      };
    });
  }, [targetText, typedText, typedHistory]);

  return textData;
};
