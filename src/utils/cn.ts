import { clsx, ClassValue } from "clsx"; // clsx includes its own ClassValue type
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  // Combine and merge Tailwind classes safely
  return twMerge(clsx(...inputs));
}
