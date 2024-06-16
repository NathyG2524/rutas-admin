import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: (string | number | null | undefined | boolean | { [key: string]: boolean } | Array<string | number | null | undefined | boolean | { [key: string]: boolean }>)[]) {
  return twMerge(clsx(inputs));
}
