import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhoneNumber(value: string) {
  const cleanedValue = value.replace(/\D/g, '');
  if (cleanedValue.length === 10) {
    return `(${cleanedValue.slice(0, 3)}) ${cleanedValue.slice(
      3,
      6,
    )}-${cleanedValue.slice(6, 10)}`;
  }
  if (cleanedValue.length <= 3) {
    return `(${cleanedValue}`;
  }
  if (cleanedValue.length <= 6) {
    return `(${cleanedValue.slice(0, 3)}) ${cleanedValue.slice(3)}`;
  }
  if (cleanedValue.length <= 10) {
    return `(${cleanedValue.slice(0, 3)}) ${cleanedValue.slice(
      3,
      6,
    )}-${cleanedValue.slice(6, 10)}`;
  }
  return value;
}

export function stripCharacters(value: string) {
  return value.replace(/\D/g, '');
}
