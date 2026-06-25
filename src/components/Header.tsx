// ─────────────────────────────────────────────────────────────
// 상단 헤더: 로고 + 카테고리 탭 + 언어 전환 버튼
// useTranslations 로 현재 언어에 맞는 글자를 불러옵니다.
// ─────────────────────────────────────────────────────────────
"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { categories } from "@/lib/data";

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname(); // 언어 접두사(/ko)가 빠진 현재 경로

  return (
    <header className="fixed left-1/2 top-0 z-50 w-full max-w-app -translate-x-1/2 bg-night text-white">
      <div className="flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-bold text-moongold">
          {t("brand")}
        </Link>
        <div className="flex items-center gap-3 text-sm">
          {/* 언어 전환: 같은 경로를 다른 언어로 다시 엽니다 */}
          <Link
            href={pathname}
            locale={locale === "ko" ? "en" : "ko"}
            className="text-white/70 hover:text-moongold"
          >
            {locale === "ko" ? "EN" : "KO"}
          </Link>
          <button className="text-white/70">{t("login")}</button>
        </div>
      </div>

      <nav className="no-scrollbar flex gap-4 overflow-x-auto px-4 pb-2 text-sm">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={c.slug === "all" ? "/" : `/category/${c.slug}`}
            className="whitespace-nowrap text-white/80 hover:text-moongold"
          >
            {t(`categories.${c.slug}`)}
          </Link>
        ))}
      </nav>
    </header>
  );
}
