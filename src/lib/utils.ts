import type { Role } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const getStatusColor = (status: string | undefined) => {
  switch (status) {
    case "NEW":
      return "bg-red-500 text-white";
    case "OPEN":
      return "bg-yellow-500 text-black";
    case "IN_PROGRESS":
      return "bg-blue-500 text-white";
    case "RESOLVED":
      return "bg-green-500 text-white";
    case "ADDITIONAL_INFO_REQUIRED":
      return "bg-purple-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
};

export const getPriorityColor = (priority: string | undefined) => {
  switch (priority) {
    case "HIGH":
      return "bg-red-500 text-white";
    case "LOW":
      return "bg-green-500 text-white";
    case "MEDIUM":
      return "bg-yellow-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
};

export const getFormattedDate = (date: Date | undefined): string => {
  return date ? date.toLocaleString() : "";
};

export const getFormattedRole = (role: Role): string => {
  return role === "ADMIN"
    ? "Admin"
    : role === "TESTER"
    ? "Tester"
    : role === "DEVELOPER"
    ? "Developer"
    : role === "REPORTER"
    ? "Reporter"
    : "";
};
