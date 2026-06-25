// ─────────────────────────────────────────────────────────────
// 오늘의 운세
// 오늘 날짜를 "씨앗(seed)"으로 삼아 점수·행운의 색·숫자·메시지를 정합니다.
// → 같은 날엔 새로고침해도 같은 결과, 날이 바뀌면 바뀜. (모두에게 동일)
// 진짜 서비스라면 여기에 사용자의 사주를 결합해 개인화하면 됩니다.
// ─────────────────────────────────────────────────────────────
"use client";

import { useTranslations } from "next-intl";

export default function TodayFortune() {
  const t = useTranslations("today");

  // 오늘 날짜를 숫자 하나로 (예: 20260625)
  const now = new Date();
  const seed =
    now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();

  // 번역 파일의 배열을 통째로 가져옵니다 (t.raw 는 문자열이 아닌 값도 읽음)
  const colors = t.raw("colors") as string[];
  const messages = t.raw("messages") as string[];

  // seed로 각 항목을 고르면, 오늘 하루는 항상 같은 값이 나옵니다.
  const score = 60 + (seed % 40); // 60~99
  const color = colors[seed % colors.length];
  const luckyNumber = seed % 9 || 9; // 1~9
  const message = messages[seed % messages.length];

  const dateLabel = now.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="py-2">
      <h1 className="mb-1 mt-2 text-lg font-bold text-ink">{t("title")}</h1>
      <p className="mb-4 text-sm text-ink/50">{dateLabel}</p>

      <div className="flex flex-col items-center rounded-2xl bg-gradient-to-br from-night to-night-soft p-6 text-white">
        <span className="text-sm text-white/70">{t("score")}</span>
        <span className="mt-1 text-5xl font-bold text-moongold">{score}</span>
        <p className="mt-3 text-center text-sm leading-relaxed text-white/90">
          {message}
        </p>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
          <p className="text-xs text-ink/50">{t("luckyColor")}</p>
          <p className="mt-1 font-bold text-ink">{color}</p>
        </div>
        <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
          <p className="text-xs text-ink/50">{t("luckyNumber")}</p>
          <p className="mt-1 font-bold text-ink">{luckyNumber}</p>
        </div>
      </div>
    </div>
  );
}
