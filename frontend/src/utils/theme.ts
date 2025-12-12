export function applyTheme(theme: string) {
  const html = document.getElementById("html-root");
  if (!html) return;

  if (theme === "dark") {
    html.classList.add("dark");
    html.classList.remove("light");
  } else {
    html.classList.remove("dark");
    html.classList.add("light");
  }
}

export function loadStoredTheme() {
  try {
    const saved = localStorage.getItem("app_settings");
    if (!saved) return "light";

    const parsed = JSON.parse(saved);
    return parsed.theme || "light";
  } catch {
    return "light";
  }
}
