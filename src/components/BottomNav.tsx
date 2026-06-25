// ─────────────────────────────────────────────────────────────
// 하단 탭바 (홈 / 오늘의 운세 / 검색 / 보관함)
// ─────────────────────────────────────────────────────────────
"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function BottomNav() {
  const t = useTranslations("bottomNav");

  const tabs = [
    { href: "/", icon: "🏠", key: "home" },
    { href: "/today", icon: "🔆", key: "today" },
    { href: "/search", icon: "🔍", key: "search" },
    { href: "/library", icon: "📁", key: "library" },
  ] as const;

  return (
    <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-app -translate-x-1/2 border-t border-black/5 bg-white">
      <ul className="flex">
        {tabs.map((tab) => (
          <li key={tab.key} className="flex-1">
            <Link
              href={tab.href}
              className="flex flex-col items-center gap-0.5 py-2 text-[11px] text-night/70 hover:text-night"
            >
              <span className="text-lg">{tab.icon}</span>
              {t(tab.key)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
