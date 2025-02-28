import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPathByStep(step: number) {
  const routes: Record<number, string> = {
    1: "/personal-info",
    2: "/contact-details",
    3: "/loan-request",
    4: "/financial-info",
    5: "/finalization",
    6: "/success",
  };
  return routes[step];
}
