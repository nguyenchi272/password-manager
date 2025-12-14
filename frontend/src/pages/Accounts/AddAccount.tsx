import { useState } from "react";
import { useItemsStore } from "../../state/items.store";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../../i18n/useI18n";

export default function AddAccount() {
  const [form, setForm] = useState({
    title: "",
    url: "",
    username: "",
    password: "",
    note: ""
  });

  const addItem = useItemsStore((s) => s.addItem);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useI18n();

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await addItem(form);
    navigate("/dashboard");
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 dark:text-gray-100 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">{t("dashboard.addAccount")}</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        />

        <input
          name="url"
          placeholder="https://example.com"
          onChange={handleChange}
          className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        />

        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        />

        <input
          className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={() => setShowPassword(!showPassword)}
          type="button"
          className="text-sm text-blue-600 dark:text-blue-400"
        >
          {showPassword ? "Hide" : "Show"}
        </button>

        <textarea
          name="note"
          placeholder="Note"
          onChange={handleChange}
          className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-500">
          {t("settings.save")}
        </button>
      </form>
    </div>
  );

}
