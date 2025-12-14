import { en } from "./en";
import { vi } from "./vi";

export type Lang = "vi" | "en";

export const messages = { vi, en };

export function getLang(): Lang {
  const raw = localStorage.getItem("app_settings");
  if (!raw) return "vi";
  try {
    return JSON.parse(raw).language ?? "vi";
  } catch {
    return "vi";
  }
}
