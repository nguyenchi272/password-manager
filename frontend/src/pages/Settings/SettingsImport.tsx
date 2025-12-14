import { useState } from "react";
import api from "../../api/client";
import { useI18n } from "../../i18n/useI18n";

export default function SettingsImport() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { t } = useI18n();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const importCsv = async () => {
    if (!file) return alert("Please choose a CSV file first");

    setLoading(true);

    try {
      const text = await file.text();
      const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);

      // Validate header
      const header = lines[0].toLowerCase();
      if (!header.includes("title,username,password,url")) {
        alert("Invalid CSV format. Required: title,username,password,url");
        setLoading(false);
        return;
      }

      const rows = lines.slice(1);

      for (const row of rows) {
        const cols = row.split(",");

        const acc = {
          title: cols[0] || "",
          username: cols[1] || "",
          password: cols[2] || "",
          url: cols[3] || "",
        };

        await api.post("/accounts", acc);
      }

      alert(t("settings.importAlert"));
      setFile(null);

      // 🔥 Gửi event để Dashboard tự reload
      window.dispatchEvent(new Event("account-imported"));
    } catch (err) {
      console.error(err);
      alert(t("settings.importAlertFail"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-gray-900 dark:text-gray-200">
      <h1 className="text-2xl font-bold mb-6">{t("settings.import")}</h1>

      <div className="bg-white dark:bg-gray-800 shadow p-5 rounded border dark:border-gray-700">
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          {t("settings.CSVformat")} (no ID):
          <br />
          <strong>title,username,password,url</strong>
        </p>

        {/* Choose file */}
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="block mb-4"
        />

        {/* Show file name */}
        {file && (
          <p className="mb-4 text-sm text-green-600">
            Selected file: <strong>{file.name}</strong>
          </p>
        )}

        {/* Import button */}
        <button
          disabled={!file || loading}
          onClick={importCsv}
          className={`px-4 py-2 rounded text-white shadow
            ${
              file && !loading
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-400 cursor-not-allowed"
            }
          `}
        >
          {loading ? t("settings.importing") : t("settings.importCSV")}
        </button>
      </div>
    </div>
  );
}
