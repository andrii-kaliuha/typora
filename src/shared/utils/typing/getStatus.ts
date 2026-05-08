export const getCharStatus = (char: string, index: number, typedText: string): string => {
  if (index === typedText.length) return "cursor";
  const typedChar = typedText[index];
  if (typedChar === undefined) return "untyped";
  return typedChar === char ? "correct" : "incorrect";
};

export const getWordStatus = (letters: { status: string }[]): string => {
  if (letters.some((letter) => letter.status === "incorrect")) return "incorrect";
  if (letters.some((letter) => letter.status === "cursor" || letter.status === "untyped")) return "untyped";
  return "correct";
};
