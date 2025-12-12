import { useEffect, useState } from "react";
import ItemCard from "../../components/ItemCard";
import api from "../../api/client";

export default function Dashboard() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get("/accounts");

      const mapped = res.data.map((acc: any) => ({
        id: acc.id,
        name: acc.title,
        username: acc.username,
        password: acc.password,
        url: acc.url ?? "",
      }));

      setItems(mapped);
    } catch (e) {
      console.error("Failed to load accounts", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(); // load lúc mở dashboard

    // 🔥 Lắng nghe event khi account bị xoá
    const handler = () => load();

    window.addEventListener("account-deleted", handler);

    return () => {
      window.removeEventListener("account-deleted", handler);
    };
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-4">Your saved accounts</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400 col-span-3">No accounts yet.</p>
        )}

        {items.map((i) => (
          <ItemCard key={i.id} item={i} />
        ))}
      </div>
    </div>
  );
}
