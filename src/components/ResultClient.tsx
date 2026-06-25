// ─────────────────────────────────────────────────────────────
// 운세 결과 화면
// 입력 타입에 따라: 타로는 뽑힌 카드 공개, 그 외는 사주를 표시. + 다운로드.
// ─────────────────────────────────────────────────────────────
"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { getCurrentId, getRecord } from "@/lib/storage";
import { getProduct, t as localize } from "@/lib/data";
import { sijinLabelFromTime } from "@/lib/sijin";
import { cardName, positionName, orientationName } from "@/lib/tarot";
import type { Locale, ReadingRecord, SajuResult } from "@/types";

function pillars(s: SajuResult): string {
  const p = s.pillars;
  return `${p.year} ${p.month} ${p.day} ${p.hour}`;
}

export default function ResultClient() {
  const t = useTranslations("result");
  const locale = useLocale() as Locale;
  const [record, setRecord] = useState<ReadingRecord | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = getCurrentId();
    setRecord(id ? getRecord(id) ?? null : null);
    setReady(true);
  }, []);

  function handleDownload() {
    if (!record) return;
    const product = getProduct(record.slug);
    const title = product ? localize(product.title, locale) : record.slug;
    const lines: string[] = [title, "=".repeat(Math.max(8, title.length * 2)), ""];

    if (record.inputType === "tarot") {
      if (record.question) lines.push(`Q. ${record.question}`, "");
      (record.cards ?? []).forEach((c) => {
        lines.push(`${positionName(c, locale)}: ${cardName(c, locale)} (${orientationName(c, locale)})`);
      });
    } else if (record.person && record.saju) {
      const sj = sijinLabelFromTime(record.person.birthTime, locale);
      lines.push(`${record.person.name} (${record.person.birthDate}${sj ? " " + sj : ""})`);
      lines.push(`${locale === "ko" ? "사주" : "Pillars"}: ${pillars(record.saju)}`);
      if (record.partner && record.partnerSaju) {
        const psj = sijinLabelFromTime(record.partner.birthTime, locale);
        lines.push("", `${record.partner.name} (${record.partner.birthDate}${psj ? " " + psj : ""})`);
        lines.push(`${locale === "ko" ? "사주" : "Pillars"}: ${pillars(record.partnerSaju)}`);
      }
    }
    lines.push("", "-".repeat(20), "", record.reading);

    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (!ready) return null;

  if (!record) {
    return (
      <div className="py-10 text-center">
        <p className="text-sm text-ink/50">{t("empty")}</p>
        <Link href="/" className="mt-4 inline-block text-sm font-semibold text-night underline">
          {t("back")}
        </Link>
      </div>
    );
  }

  const product = getProduct(record.slug);
  const title = product ? localize(product.title, locale) : record.slug;

  return (
    <div className="py-2">
      <h1 className="mb-1 mt-2 text-lg font-bold text-ink">{title}</h1>

      {/* 부제: 타입별 */}
      {record.inputType === "tarot" ? (
        record.question && <p className="mb-4 text-sm text-ink/50">Q. {record.question}</p>
      ) : (
        record.person && record.saju && (
          <p className="mb-4 text-sm text-ink/50">
            {record.person.name} · {pillars(record.saju)}
            {record.partnerSaju ? `  /  ${record.partner?.name} · ${pillars(record.partnerSaju)}` : ""}
          </p>
        )
      )}

      {/* 타로: 뽑힌 카드 공개 */}
      {record.inputType === "tarot" && record.cards && (
        <div className="mb-4 grid grid-cols-3 gap-2">
          {record.cards.map((c, i) => (
            <div
              key={i}
              className="flex flex-col items-center rounded-xl bg-gradient-to-br from-night to-night-soft p-3 text-center text-white"
            >
              <span className="text-[11px] text-moongold">{positionName(c, locale)}</span>
              <span className="my-1 text-2xl">🔮</span>
              <span className="text-xs font-semibold leading-tight">{cardName(c, locale)}</span>
              <span className="mt-0.5 text-[10px] text-white/60">{orientationName(c, locale)}</span>
            </div>
          ))}
        </div>
      )}

      {/* 풀이 본문 */}
      <div className="whitespace-pre-line rounded-2xl bg-white p-5 text-sm leading-relaxed text-ink/90 shadow-sm">
        {record.reading}
      </div>

      {!record.aiGenerated && (
        <p className="mt-2 text-center text-xs text-ink/40">{t("summaryOnly")}</p>
      )}

      <div className="mt-5 flex gap-2">
        <button
          onClick={handleDownload}
          className="flex-1 rounded-xl bg-night py-3 font-bold text-moongold transition active:scale-95"
        >
          {t("download")}
        </button>
        <Link
          href="/"
          className="flex flex-1 items-center justify-center rounded-xl border border-night/20 py-3 font-semibold text-night"
        >
          {t("back")}
        </Link>
      </div>

      <p className="mt-4 text-center text-xs text-ink/30">{t("disclaimer")}</p>
    </div>
  );
}
