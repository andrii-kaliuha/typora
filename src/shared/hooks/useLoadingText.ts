import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getRandomText } from "../utils/typing/getText";
import { setRandomText } from "../../store/configSlice";
import type { Language } from "../types/types";

export const useLoadingText = (language: Language) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initialRandomText = getRandomText(language);
    dispatch(setRandomText(initialRandomText));
  }, [language]);
};
