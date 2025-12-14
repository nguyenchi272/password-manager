import { useState } from "react";
import { useAuthStore } from "../../state/auth.store";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { useI18n } from "../../i18n/useI18n";

export default function Register() {
  const navigate = useNavigate();
  const register = useAuthStore((s) => s.register);
  const loading = useAuthStore((s) => s.loading);
  const { t } = useI18n();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) return alert("Passwords not match!");

    const ok = await register(email, password);
    if (ok) {
      alert("Register success! Please check your email to verify.");
      navigate("/login");
    }
    else alert("Register failed");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md bg-white p-8 shadow rounded-xl">
        <h1 className="text-2xl font-bold mb-6 text-center">{t("auth.register")}</h1>

        <form className="space-y-4" onSubmit={submit}>
          <Input
            label={t("auth.email")}
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />

          <Input
            label={t("auth.password")}
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />

          <Input
            label={t("auth.confirmPassword")}
            type="password"
            value={confirm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirm(e.target.value)}
          />

          <Button disabled={loading} className="w-full">
            {loading ? t("common.loading") : t("auth.register")}
          </Button>

          <p className="text-center text-sm mt-4">
            {t("auth.message2")}{" "}
            <Link to="/login" className="text-blue-600">
              {t("auth.login")}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
