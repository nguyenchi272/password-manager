import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const { pathname } = useLocation();

  const isActive = (path: string) =>
    pathname.startsWith(path) ? "bg-gray-700 text-white" : "text-gray-300";

  return (
    <div className="w-64 bg-gray-900 text-white p-4 space-y-2">

      <h2 className="text-xl font-bold mb-6">Password Manager</h2>

      <Link
        to="/dashboard"
        className={`block p-2 rounded ${isActive("/dashboard")}`}
      >
        Dashboard
      </Link>

      <Link
        to="/accounts/add"
        className={`block p-2 rounded ${isActive("/accounts/add")}`}
      >
        ➕ Add Account
      </Link>

      <Link
        to="/settings"
        className={`block p-2 rounded ${isActive("/settings")}`}
      >
        ⚙️ Settings
      </Link>

      <Link
        to="/profile"
        className={`block p-2 rounded ${isActive("/profile")}`}
      >
        👤 Profile
      </Link>

    </div>
  );
}
