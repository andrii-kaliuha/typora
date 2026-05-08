export const getFileName = (unixTimestamp: number | undefined): string => {
  if (unixTimestamp === undefined) return "test-result";

  const date = new Date(unixTimestamp);

  const pad = (num: number) => String(num).padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());

  const datePart = `${year}-${month}-${day}`;

  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  const timePart = `${hours}-${minutes}-${seconds}`;

  return `test-result ${datePart} ${timePart}`;
};
