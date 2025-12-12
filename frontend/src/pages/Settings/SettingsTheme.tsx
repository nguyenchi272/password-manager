import { useState, useEffect } from "react";
import { applyTheme } from "../../utils/theme";

export default function SettingsTheme() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("app_settings") || "{}");
    setTheme(stored.theme || "light");
  }, []);

  const save = (value: string) => {
    setTheme(value);
    applyTheme(value);

    const stored = JSON.parse(localStorage.getItem("app_settings") || "{}");
    stored.theme = value;

    localStorage.setItem("app_settings", JSON.stringify(stored));
  };

  return (
    <div className="text-gray-800 dark:text-gray-200">
      <h1 className="text-2xl font-bold mb-6">Theme</h1>

      <div className="flex gap-4">
        <button
          className={`px-4 py-2 rounded shadow 
            ${theme === "light" ? "bg-blue-600 text-white" : "bg-gray-300 dark:bg-gray-700"}
          `}
          onClick={() => save("light")}
        >
          Light
        </button>

        <button
          className={`px-4 py-2 rounded shadow 
            ${theme === "dark" ? "bg-blue-600 text-white" : "bg-gray-300 dark:bg-gray-700"}
          `}
          onClick={() => save("dark")}
        >
          Dark
        </button>
      </div>
    </div>
  );
}
