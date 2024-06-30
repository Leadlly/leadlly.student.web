export function getTodaysFormattedDate() {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthsOfYear = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const today = new Date();
  const dayOfWeek = daysOfWeek[today.getDay()];
  const dayOfMonth = String(today.getDate()).padStart(2, "0");
  const month = monthsOfYear[today.getMonth()];
  const year = today.getFullYear();

  return `${dayOfWeek} ${dayOfMonth} ${month} ${year}`;
}

export function getFormattedDate(date: Date): string {
  const daysOfWeek: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthsOfYear: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dayOfWeek: string = daysOfWeek[date.getDay()];
  const dayOfMonth: string = String(date.getDate()).padStart(2, "0");
  const month: string = monthsOfYear[date.getMonth()];
  const year: number = date.getFullYear();

  return `${dayOfWeek} ${dayOfMonth} ${month} ${year}`;
}

export function convertDateString(inputDate: string): string {
  // Parse the input date string
  const date = new Date(inputDate);

  // Extract the day, month, and year
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // getUTCMonth() is zero-based
  const year = date.getUTCFullYear();

  // Format the date as DD-MM-YYYY
  return `${day}-${month}-${year}`;
}

export function capitalizeFirstLetter(
  sentence: string | undefined
): string | undefined {
  if (!sentence) {
    return sentence;
  }

  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}

export const formatTime = (seconds: number) => {
  const days = Math.floor(seconds / (24 * 60 * 60))
    .toString()
    .padStart(2, "0");
  const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60))
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((seconds % (60 * 60)) / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");

  return `${days}d : ${hours}h : ${minutes}m : ${secs}s`;
};
