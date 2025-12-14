import { useAuthStore } from "../../state/auth.store";
import { useI18n } from "../../i18n/useI18n";

export default function Header() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const { t } = useI18n();
  return (
    <header className="h-16 bg-white dark:bg-gray-900 dark:text-gray-100 shadow flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold">{t("header.title")}</h1>

      <div className="flex items-center gap-4">
        {user && (
          <div className="text-sm font-medium">
            {user.name}
          </div>
          )}

        <button
          onClick={logout}
          className="px-3 py-1 rounded bg-red-500 text-white"
        >
          {t("auth.logout")}
        </button>
      </div>
    </header>
  );
}
