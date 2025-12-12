import { AppProviders } from "./providers";
import { AppRoutes } from "./routes";
import { useEffect } from "react";
import { applyTheme, loadStoredTheme } from "../utils/theme";

function App() {
  useEffect(() => {
    const theme = loadStoredTheme();
    applyTheme(theme);
  }, []);

  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  );
}

export default App;
