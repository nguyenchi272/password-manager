import { useEffect, useState } from "react";
import ItemCard from "../../components/ItemCard";
import api from "../../api/client";
import { Input } from "../../components/ui/Input";
import { useI18n } from "../../i18n/useI18n";

export default function Dashboard() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const { t } = useI18n();

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

  //Filter items by search
  const filteredItems = items.filter((item) => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return true;

    const title = (item.name || "").toLowerCase();
    const username = (item.username || "").toLowerCase();

    return title.includes(keyword) || username.includes(keyword);
  });


  return (
    <div className="text-gray-900">
      <h1 className="text-2xl font-bold mb-4"> {t("dashboard.yourAccounts")} </h1>

      {/* 🔍 Search bar */}
      <Input
        placeholder={t("dashboard.searchPlaceholder")}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 max-w-md"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredItems.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400 col-span-3">
            {t("dashboard.NoAccounts")}
          </p>
        )}

        {filteredItems.map((i) => (
          <ItemCard key={i.id} item={i} />
        ))}
      </div>
    </div>
  );
}