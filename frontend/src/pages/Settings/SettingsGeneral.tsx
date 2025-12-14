import { useEffect, useState } from "react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { useI18n } from "../../i18n/useI18n";
import type { Lang } from "../../i18n";

interface GeneralSettings {
  autoLockMinutes: number;
  revealPasswords: boolean;
  language: Lang;
}

const DEFAULT_SETTINGS: GeneralSettings = {
  autoLockMinutes: 5,
  revealPasswords: false,
  language: "vi",
};

export default function SettingsGeneral() {
  const { t } = useI18n();
  const [settings, setSettings] = useState<GeneralSettings>(DEFAULT_SETTINGS);
  const [saved, setSaved] = useState(false);

  // Load settings from localStorage
  useEffect(() => {
    const raw = localStorage.getItem("app_settings");
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw);
      setSettings({ ...DEFAULT_SETTINGS, ...parsed });
    } catch {
      // ignore invalid storage
    }
  }, []);

  const saveSettings = () => {
    localStorage.setItem("app_settings", JSON.stringify(settings));
    setSaved(true);

    // reload để apply language toàn app
    setTimeout(() => {
      setSaved(false);
      window.location.reload();
    }, 800);
  };

  return (
    <div className="max-w-2xl text-gray-800 dark:text-gray-200">
      <h1 className="text-2xl font-bold mb-6">
        {t("settings.general")}
      </h1>

      {/* LANGUAGE */}
      <div className="mb-6">
        <label className="block font-medium mb-2">
          {t("settings.language")}
        </label>
        <select
          value={settings.language}
          onChange={(e) =>
            setSettings({
              ...settings,
              language: e.target.value as Lang,
            })
          }
          className="w-full rounded-lg border px-3 py-2
                     dark:bg-slate-800 dark:border-slate-700"
        >
          <option value="vi">Tiếng Việt</option>
          <option value="en">English</option>
        </select>
      </div>

      {/* AUTO LOCK */}
      <div className="mb-6">
        <label className="block font-medium mb-2">
          {t("settings.autoLock")}
        </label>
        <Input
          type="number"
          min={1}
          value={settings.autoLockMinutes}
          onChange={(e) =>
            setSettings({
              ...settings,
              autoLockMinutes: Number(e.target.value),
            })
          }
        />
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {t("settings.autoLock")} ({settings.autoLockMinutes} phút)
        </p>
      </div>

      {/* SHOW PASSWORD */}
      <div className="mb-6 flex items-center gap-3">
        <input
          type="checkbox"
          className="w-4 h-4"
          checked={settings.revealPasswords}
          onChange={(e) =>
            setSettings({
              ...settings,
              revealPasswords: e.target.checked,
            })
          }
        />
        <span>{t("settings.showPassword")}</span>
      </div>

      {/* SAVE */}
      <div className="flex items-center gap-4">
        <Button onClick={saveSettings}>
          {t("common.save")}
        </Button>

        {saved && (
          <span className="text-green-600 dark:text-green-400">
            ✓ {t("settings.saved")}
          </span>
        )}
      </div>
    </div>
  );
}
