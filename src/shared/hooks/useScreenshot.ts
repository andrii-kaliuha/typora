import { useState } from "react";
import { useTranslation } from "react-i18next";
import html2canvas from "html2canvas";

const downloadScreenshot = async (targetElement: HTMLElement, fileName: string) => {
  const screenshotClass = "screenshot-only-styles";
  targetElement.classList.add(screenshotClass);

  try {
    const canvas = await html2canvas(targetElement, { useCORS: true, scale: 3, backgroundColor: null });

    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = `${fileName}.png`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } finally {
    targetElement.classList.remove(screenshotClass);
  }
};

export const useScreenshot = (fileName: string = "screenshot") => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  const clearError = () => setError(null);

  const captureAndDownload = async (targetElement: HTMLElement | null) => {
    if (!targetElement) return;

    setIsLoading(true);
    setError(null);

    try {
      await downloadScreenshot(targetElement, fileName);
    } catch (err) {
      setError(t("result.screenshot-error"));
    } finally {
      setIsLoading(false);
    }
  };

  return { captureAndDownload, isLoading, error, clearError };
};
