export type Lang = "vi" | "en";

export const messages = {
  en: {
    generalSettings: "General Settings",
    autoLock: "Auto-lock vault (minutes)",
    showPassword: "Show passwords by default",
    save: "Save",
    saved: "Saved",
    language: "Language",
  },
  vi: {
    generalSettings: "Cài đặt chung",
    autoLock: "Tự khoá sau (phút)",
    showPassword: "Hiển thị mật khẩu mặc định",
    save: "Lưu",
    saved: "Đã lưu",
    language: "Ngôn ngữ",
  },
};

export function t(lang: Lang, key: keyof typeof messages.en) {
  return messages[lang][key];
}
