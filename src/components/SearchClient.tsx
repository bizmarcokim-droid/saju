// ─────────────────────────────────────────────────────────────
// 검색 화면
// 입력창에 타이핑하면 상품 제목/설명에서 실시간으로 걸러 보여줍니다.
// ─────────────────────────────────────────────────────────────
"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import ProductCard from "@/components/ProductCard";
import { getProducts, t as localize } from "@/lib/data";
import type { Locale } from "@/types";

export default function SearchClient() {
  const t = useTranslations("search");
  const locale = useLocale() as Locale;
  const [query, setQuery] = useState("");

  const all = getProducts();

  // query가 바뀔 때만 다시 거릅니다 (useMemo: 불필요한 재계산 방지)
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return all.filter((p) => {
      const title = localize(p.title, locale).toLowerCase();
      const subtitle = localize(p.subtitle, locale).toLowerCase();
      return title.includes(q) || subtitle.includes(q);
    });
  }, [query, locale, all]);

  return (
    <div className="py-2">
      <h1 className="mb-3 mt-2 text-lg font-bold text-ink">{t("title")}</h1>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t("placeholder")}
        className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-ink outline-none focus:border-night"
      />

      <div className="mt-4 flex flex-col gap-2">
        {query.trim() === "" ? (
          <p className="mt-8 text-center text-sm text-ink/50">{t("prompt")}</p>
        ) : results.length === 0 ? (
          <p className="mt-8 text-center text-sm text-ink/50">{t("noResults")}</p>
        ) : (
          results.map((p) => (
            <ProductCard key={p.slug} product={p} locale={locale} />
          ))
        )}
      </div>
    </div>
  );
}
