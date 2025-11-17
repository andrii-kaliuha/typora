export const formatDate = (timestamp: number, language: string) => {
  const locale = language === "english" ? "en" : "uk";

  const date = new Date(timestamp);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const isSameYear = date.getFullYear() === now.getFullYear();

  let options: Intl.DateTimeFormatOptions;

  if (isToday) options = { hour: "2-digit", minute: "2-digit" };
  else if (isSameYear) options = { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "long" };
  else options = { day: "2-digit", month: "long", year: "numeric" };

  let formatted = new Intl.DateTimeFormat(locale, options).format(date);

  if (locale === "uk") formatted = formatted.replace(/\s?р\.$/, "");

  return formatted;
};
