import { useEffect, useRef } from "react";
import { useAuthStore } from "../state/auth.store";

export function useAutoLock(minutes: number) {
  const logout = useAuthStore((s) => s.logout);
  const timer = useRef<number>();

  useEffect(() => {
    if (!minutes || minutes <= 0) return;

    const resetTimer = () => {
      if (timer.current) window.clearTimeout(timer.current);

      timer.current = window.setTimeout(() => {
        logout();
        alert("Vault locked due to inactivity");
      }, minutes * 60 * 1000);
    };

    const events = ["mousemove", "keydown", "click"];

    events.forEach((e) => window.addEventListener(e, resetTimer));
    resetTimer();

    return () => {
      if (timer.current) window.clearTimeout(timer.current);
      events.forEach((e) => window.removeEventListener(e, resetTimer));
    };
  }, [minutes, logout]);
}
