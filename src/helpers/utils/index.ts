import DOMPurify from "dompurify";
import { SUBJECT_COLORS } from "../constants";
import { Subject } from "../types";

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

export function getTodaysDay() {
  const today = new Date();
  const dayOfWeek = daysOfWeek[today.getDay()];

  return `${dayOfWeek}`;
}

export function getMonthDate(date: Date): string {
  const dayOfMonth: string = String(date.getDate()).padStart(2, "0");
  const month: string = monthsOfYear[date.getMonth()];

  return `${month} ${dayOfMonth}`;
}

export function getMonthDateForProd(date: Date): string {
  // Get the time in milliseconds since the epoch (UTC)
  const utcTime = date.getTime();

  // Define the IST offset in milliseconds (5 hours and 30 minutes)
  const istOffset = 5.5 * 60 * 60 * 1000;

  // Calculate the IST time in milliseconds
  const istTime = utcTime + istOffset;

  // Create a new Date object for IST time
  const istDate = new Date(istTime);

  // Extract the day of the month and the month name in IST
  const dayOfMonth: string = String(istDate.getUTCDate()).padStart(2, "0");
  const month: string = monthsOfYear[istDate.getUTCMonth()];

  return `${month} ${dayOfMonth}`;
}

export function getTodaysFormattedDate() {
  const today = new Date();
  const dayOfMonth = String(today.getDate()).padStart(2, "0");
  const month = monthsOfYear[today.getMonth()];
  const year = today.getFullYear();

  return `${dayOfMonth} ${month} ${year}`;
}

export function getFormattedDate(date: Date): string {
  const dayOfMonth: string = String(date.getDate()).padStart(2, "0");
  const month: string = monthsOfYear[date.getMonth()];
  const year: number = date.getFullYear();

  return `${dayOfMonth} ${month} ${year}`;
}

export function getFormattedDateForProd(date: Date): string {
  const istOffset = 5 * 60 * 60 * 1000 + 30 * 60 * 1000; // IST is UTC +5:30
  const istDate = new Date(date.getTime() + istOffset);

  const dayOfMonth: string = String(istDate.getDate()).padStart(2, "0");
  const month: string = monthsOfYear[istDate.getMonth()];
  const year: number = istDate.getFullYear();

  return `${dayOfMonth} ${month} ${year}`;
}

export function convertDateString(inputDate: Date): string {
  const utcDate = new Date(inputDate);

  // Convert to IST by adding 5 hours and 30 minutes
  const istDate = new Date(utcDate.getTime() + 5.5 * 60 * 60 * 1000);

  // Format the date
  const day = istDate.getDate().toString().padStart(2, "0");
  const month = (istDate.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
  const year = istDate.getFullYear();

  // Format the date as DD-MM-YYYY
  return `${day}-${month}-${year}`;
}

export function formatDate(dateString: Date): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  return `${day} ${month}`;
}

export function calculateDaysLeft(meetingDate: Date): number {
  // Get the current date
  const currentDate = new Date();

  // Calculate the difference in milliseconds
  const differenceInMs = meetingDate.getTime() - currentDate.getTime();

  // Convert milliseconds to days
  const daysLeft = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));

  return daysLeft - 1;
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

export const sanitizedHtml = (htmlString: string) => {
  DOMPurify.sanitize(htmlString);
  return htmlString;
};

export const getColorBySubject = (subject: Subject): string => {
  return SUBJECT_COLORS[subject] || "bg-[#B0BEC5]";
};

export function isMoodButtonDisabled(lastMoodDate: String) {
  if (!lastMoodDate) return false;

  const today = new Date();
  const formattedToday = today.toISOString().split("T")[0];

  return lastMoodDate === formattedToday;
}
