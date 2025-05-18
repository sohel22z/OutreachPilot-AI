import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// A utility for merging Tailwind CSS classes conditionally
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}