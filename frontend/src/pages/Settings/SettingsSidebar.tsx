import { 
  Settings, 
  UserCog, 
  Palette, 
  Upload, 
  Download 
} from "lucide-react";
import { useI18n } from "../../i18n/useI18n";

export default function SettingsSidebar({ active, onChange }: any) {
  const { t } = useI18n();
  const items = [
    { id: "general", label: t("settings.general2"), icon: Settings },
    { id: "account", label: t("settings.account"), icon: UserCog },
    { id: "theme", label: t("settings.theme"), icon: Palette },
    { id: "export", label: t("settings.export"), icon: Download },
    { id: "import", label: t("settings.import"), icon: Upload },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-xl border-r border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold px-6 pt-6 pb-4 text-gray-800 dark:text-gray-200">
        {t("settings.settings")}
      </h2>

      <ul className="mt-4">
        {items.map(({ id, label, icon: Icon }) => (
          <li key={id}>
            <button
              onClick={() => onChange(id)}
              className={`w-full flex items-center px-6 py-3 gap-3 text-left 
                hover:bg-gray-100 dark:hover:bg-gray-700
                ${
                  active === id
                    ? "bg-gray-200 dark:bg-gray-700 font-semibold"
                    : "text-gray-700 dark:text-gray-300"
                }
              `}
            >
              <Icon size={18} />
              {label}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
