import { useAuthStore } from "../../state/auth.store";

export default function Header() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  return (
    <header className="h-16 bg-white dark:bg-gray-900 dark:text-gray-100 shadow flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold">Password Manager</h1>

      <div className="flex items-center gap-4">
        <span className="text-gray-600 dark:text-gray-300">{user?.email}</span>

        <button
          onClick={logout}
          className="px-3 py-1 rounded bg-red-500 text-white"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
