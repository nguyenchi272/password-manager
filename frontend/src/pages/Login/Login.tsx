import { useState } from "react";
import { useAuthStore } from "../../state/auth.store";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { useI18n } from "../../i18n/useI18n";

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const error = useAuthStore((s) => s.error);
  const { t } = useI18n();
  const loading = useAuthStore((s) => s.loading);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await login(email, password);
    if (ok) navigate("/dashboard");
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-lg rounded-xl w-[400px]"
      >
        <h1 className="text-2xl mb-6 text-center font-bold">{t("auth.login")}</h1>

        {error && (
          <p className="text-red-600 text-sm mb-3 text-center">{error}</p>
        )}

        <label className="block mb-2">{t("auth.email")}</label>
        <input
          className="w-full p-2 border rounded mb-4"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block mb-2">{t("auth.password")}</label>
        <input
          className="w-full p-2 border rounded mb-4"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded mt-3"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-4 text-center">
          {t("auth.message")}{" "}
          <a href="/register" className="text-blue-600">
            {t("auth.register")}
          </a>
        </p>
      </form>
    </div>
  );
}
