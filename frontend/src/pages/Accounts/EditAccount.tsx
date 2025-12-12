import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useItems } from "../../hooks/useItems";

export default function EditAccount() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getItemById, updateItem } = useItems();
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    title: "",
    username: "",
    password: "",
    url: "",
  });

  useEffect(() => {
    if (id) {
      const item = getItemById(Number(id));
      if (item) {
        setForm({
          title: item.title,
          username: item.username,
          password: item.password,
          url: item.url ?? "",
        });
      }
    }
  }, [id, getItemById]);

  const handleSave = async () => {
    await updateItem(Number(id), form);
    navigate("/dashboard");
  };

  return (
    <div className="max-w-lg mx-auto mt-8 bg-white p-6 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Edit Account</h2>

      <div className="space-y-3">
        <input
          className="w-full border p-2"
          placeholder="Account name"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          className="w-full border p-2"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          className="w-full border p-2"
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={() => setShowPassword(!showPassword)}
          type="button"
          className="text-sm text-blue-600"
        >
          {showPassword ? "Hide" : "Show"}
        </button>

        <input
          className="w-full border p-2"
          placeholder="Website URL"
          value={form.url}
          onChange={(e) => setForm({ ...form, url: e.target.value })}
        />

        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
}
