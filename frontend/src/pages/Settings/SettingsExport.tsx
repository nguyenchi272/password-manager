import api from "../../api/client";

export default function SettingsExport() {
  const exportCsv = async () => {
    const res = await api.get("/accounts");
    const accounts = res.data;

    const csv = [
      "id,title,username,password,url",
      ...accounts.map((a: any) =>
        `${a.id},${a.title},${a.username},${a.password},${a.url || ""}`
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "accounts-export.csv";
    link.click();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
        Export Accounts
      </h1>

      <button
        onClick={exportCsv}
        className="bg-blue-600 text-white px-4 py-2 rounded shadow"
      >
        Export CSV
      </button>
    </div>
  );
}
