import { useState } from "react";
import SettingsSidebar from "./SettingsSidebar";
import SettingsGeneral from "./SettingsGeneral";
import SettingsAccount from "./SettingsAccount";
import SettingsTheme from "./SettingsTheme";
import SettingsExport from "./SettingsExport";
import SettingsImport from "./SettingsImport";

export default function Settings() {
  const [tab, setTab] = useState("general");

  return (
    <div className="flex h-[calc(100vh-60px)] bg-gray-100 dark:bg-gray-900">
      <SettingsSidebar active={tab} onChange={setTab} />

      <div className="flex-1 p-8 overflow-auto">
        {tab === "general" && <SettingsGeneral />}
        {tab === "account" && <SettingsAccount />}
        {tab === "theme" && <SettingsTheme />}
        {tab === "export" && <SettingsExport />}
        {tab === "import" && <SettingsImport />}
      </div>
    </div>
  );
}
