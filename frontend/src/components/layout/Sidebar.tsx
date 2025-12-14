import { Link, useLocation } from "react-router-dom";
import { useI18n } from "../../i18n/useI18n";

export default function Sidebar() {
  const { pathname } = useLocation();
  const { t } = useI18n();

  const isActive = (path: string) =>
    pathname.startsWith(path) ? "bg-gray-700 text-white" : "text-gray-300";

  return (
    <div className="w-64 bg-gray-900 text-white p-4 space-y-2">

      <h2 className="text-xl font-bold mb-6">{t("header.title")}</h2>

      <Link
        to="/dashboard"
        className={`block p-2 rounded ${isActive("/dashboard")}`}
      >
        {t("dashboard.title")}
      </Link>

      <Link
        to="/accounts/add"
        className={`block p-2 rounded ${isActive("/accounts/add")}`}
      >
        ➕ {t("dashboard.addAccount")}
      </Link>

      <Link
        to="/settings"
        className={`block p-2 rounded ${isActive("/settings")}`}
      >
        ⚙️ {t("settings.general")}
      </Link>

      <Link
        to="/profile"
        className={`block p-2 rounded ${isActive("/profile")}`}
      >
        👤 {t("profile.title")}
      </Link>

    </div>
  );
}
