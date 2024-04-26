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
