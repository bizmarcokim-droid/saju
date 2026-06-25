// ─────────────────────────────────────────────────────────────
// 보관함 화면
// 저장된 운세 결과들을 보여주고, 클릭하면 결과 페이지로 다시 들어갑니다.
// ─────────────────────────────────────────────────────────────
"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { getProduct, t as localize } from "@/lib/data";
import { getRecords, removeRecord, clearRecords, setCurrentId } from "@/lib/storage";
import type { Locale, ReadingRecord } from "@/types";

export default function LibraryClient() {
  const t = useTranslations("library");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const [items, setItems] = useState<ReadingRecord[]>([]);

  useEffect(() => {
    setItems(getRecords());
  }, []);

  function openRecord(r: ReadingRecord) {
    setCurrentId(r.id);
    router.push(`/fortune/${r.slug}/result`);
  }

  function handleRemove(id: string) {
    removeRecord(id);
    setItems((prev) => prev.filter((r) => r.id !== id));
  }

  function handleClear() {
    clearRecords();
    setItems([]);
  }

  if (items.length === 0) {
    return (
      <div className="py-2">
        <h1 className="mb-3 mt-2 text-lg font-bold text-ink">{t("title")}</h1>
        <p className="mt-10 text-center text-sm text-ink/50">{t("empty")}</p>
      </div>
    );
  }

  return (
    <div className="py-2">
      <div className="mb-3 mt-2 flex items-center justify-between">
        <h1 className="text-lg font-bold text-ink">{t("title")}</h1>
        <button onClick={handleClear} className="text-xs text-ink/40 hover:text-ink/70">
          {t("clear")}
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {items.map((r) => {
          const product = getProduct(r.slug);
          if (!product) return null;
          return (
            <div key={r.id} className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm">
              <button
                onClick={() => openRecord(r)}
                className="flex min-w-0 flex-1 items-center gap-3 text-left"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-night text-2xl">
                  {product.thumb}
                </div>
                <div className="min-w-0">
                  <h3 className="truncate font-semibold text-ink">
                    {localize(product.title, locale)}
                  </h3>
                  <p className="truncate text-xs text-ink/50">
                    {r.inputType === "tarot"
                      ? r.question || (locale === "ko" ? "타로 리딩" : "Tarot reading")
                      : `${r.person?.name ?? ""}${r.partner ? ` ❤ ${r.partner.name}` : ""} · ${r.person?.birthDate ?? ""}`}
                  </p>
                </div>
              </button>
              <button
                onClick={() => handleRemove(r.id)}
                aria-label="remove"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black/5 text-ink/50 hover:bg-black/10"
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
