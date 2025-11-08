import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import html2canvas from "html2canvas";

export const useScreenshot = (fileName: string = "screenshot") => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  const captureAndDownload = useCallback(
    async (targetElement: HTMLElement | null) => {
      if (!targetElement) return;

      setIsLoading(true);
      setError(null);

      const screenshotClass = "screenshot-only-styles";
      targetElement.classList.add(screenshotClass);

      try {
        const scaleFactor = 3;

        const canvas = await html2canvas(targetElement, {
          useCORS: true,
          scale: scaleFactor,
          backgroundColor: null,
        });

        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = `${fileName}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        setError(t("result.screenshot-error"));
      } finally {
        targetElement.classList.remove(screenshotClass);
        setIsLoading(false);
      }
    },
    [fileName]
  );

  return { captureAndDownload, isLoading, error };
};
