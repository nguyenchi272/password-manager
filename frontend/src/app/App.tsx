import { AppProviders } from "./providers";
import { AppRoutes } from "./routes";
import { useEffect, useState } from "react";
import { applyTheme, loadStoredTheme } from "../utils/theme";
import { useAutoLock } from "../hooks/useAutoLock";

function App() {
  const [autoLockMinutes, setAutoLockMinutes] = useState<number>(5);

  useEffect(() => {
    const theme = loadStoredTheme();
    applyTheme(theme);

    const raw = localStorage.getItem("app_settings");
    if (raw) {
      try {
        const settings = JSON.parse(raw);
        setAutoLockMinutes(settings.autoLockMinutes ?? 5);
      } catch (e) {
        console.error("Failed to parse app_settings:", e);
      }
    }
  }, []);

  useAutoLock(autoLockMinutes);

  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  );
}

export default App;
