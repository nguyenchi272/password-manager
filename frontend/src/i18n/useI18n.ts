import { getLang, messages, Lang } from "./index";

export function useI18n() {
  const lang: Lang = getLang();

  const t = (path: string) => {
    const keys = path.split(".");
    let value: any = messages[lang];

    for (const k of keys) {
      value = value?.[k];
      if (!value) return path;
    }

    return value;
  };

  return { t, lang };
}
