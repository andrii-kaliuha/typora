export const formatDate = (timestamp: number | string, language: string) => {
  if (typeof timestamp === "string") return;
  const locale = language === "english" ? "en" : "uk";

  const date = new Date(timestamp);
  const now = new Date();

  const isToday = date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();

  if (isToday) {
    return new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  }

  const isSameYear = date.getFullYear() === now.getFullYear();

  const formatted = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    ...(isSameYear ? {} : { year: "numeric" }),
  }).format(date);

  return formatted.replace(/ р\.?$/, "");
};
