export interface AccountRow {
  id: string;
  website: string;
  username: string;
  password: string;
}

export const exportToCSV = () => {
  const stored = localStorage.getItem("accounts");
  if (!stored) {
    alert("Không có dữ liệu để export.");
    return;
  }

  const accounts: AccountRow[] = JSON.parse(stored);
  if (!accounts.length) {
    alert("Danh sách account rỗng.");
    return;
  }

  const header = ["id", "website", "username", "password"];
  const rows = accounts.map((a) => [a.id, a.website, a.username, a.password]);

  const csv =
    "data:text/csv;charset=utf-8," +
    [header, ...rows].map((r) => r.join(",")).join("\n");

  const link = document.createElement("a");
  link.href = encodeURI(csv);
  link.download = "accounts_export.csv";
  link.click();
};

export const importFromCSV = (file: File): Promise<AccountRow[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const text = reader.result as string;
      const lines = text.trim().split("\n");

      const header = lines[0].split(",");
      const expected = ["id", "website", "username", "password"];

      if (header.length !== expected.length ||
          !header.every((h, i) => h.trim() === expected[i])) {
        reject("Sai header CSV. Cần: id, website, username, password");
        return;
      }

      const data: AccountRow[] = [];
      for (let i = 1; i < lines.length; i++) {
        const row = lines[i].split(",");
        if (row.length === 4) {
          data.push({
            id: row[0],
            website: row[1],
            username: row[2],
            password: row[3],
          });
        }
      }

      resolve(data);
    };

    reader.onerror = () => reject("Không đọc được file CSV.");
    reader.readAsText(file, "utf-8");
  });
};
