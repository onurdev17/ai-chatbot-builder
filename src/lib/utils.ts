import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const saveToLocalStorage = (key: string, messages: any) => {
  localStorage.setItem(key, JSON.stringify(messages));
};

export const getFromLocalStorage = (key: string) => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : null;
};

export const clearLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export const capitalizeFirstLetter = (text: string) => {
  return text[0].toUpperCase() + text.slice(1);
};
