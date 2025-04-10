import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Parse date string in the format "dd MMM yyyy" to Date object
export function parseDate(dateString) {
  if (!dateString) return null;
  
  const parts = dateString.split(" ");
  if (parts.length !== 3) return new Date(dateString); // fallback to native parsing
  
  const day = parseInt(parts[0], 10);
  
  const months = {
    "Jan": 0, "Feb": 1, "Mar": 2, "Apr": 3, "May": 4, "Jun": 5,
    "Jul": 6, "Aug": 7, "Sep": 8, "Oct": 9, "Nov": 10, "Dec": 11
  };
  
  const month = months[parts[1]];
  const year = parseInt(parts[2], 10);
  
  if (isNaN(day) || month === undefined || isNaN(year)) return null;
  
  return new Date(year, month, day);
}