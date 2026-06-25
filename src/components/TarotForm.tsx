// ─────────────────────────────────────────────────────────────
// 타로 입력 폼
// 질문(선택)을 적고, 펼쳐진 카드 더미에서 3장을 탭해서 뽑습니다.
// 카드 정체는 결과 페이지에서 공개됩니다. (여기선 뒷면만 보임)
// ─────────────────────────────────────────────────────────────
"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { saveRecord, setCurrentId } from "@/lib/storage";
import { drawCards } from "@/lib/tarot";
import type { DrawnCard, Locale, ReadingRecord } from "@/types";

const SPREAD = 3; // 뽑을 장수
const FACE_DOWN = 12; // 펼쳐 보일 카드 더미 수

export default function TarotForm({ productSlug }: { productSlug: string }) {
  const t = useTranslations("tarot");
  const locale = useLocale() as Locale;
  const router = useRouter();

  const [question, setQuestion] = useState("");
  // 미리 3장을 뽑아두고(순서=과거/현재/미래), 사용자가 탭한 순서대로 한 장씩 배정
  const [pending] = useState<DrawnCard[]>(() => drawCards(SPREAD));
  const [picked, setPicked] = useState<number[]>([]); // 탭한 더미 인덱스들
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 탭한 더미 인덱스 → 뽑힌 카드 (탭 순서대로 pending 배정)
  const slotCard = useMemo(() => {
    const map = new Map<number, DrawnCard>();
    picked.forEach((slotIdx, order) => map.set(slotIdx, pending[order]));
    return map;
  }, [picked, pending]);

  function tapCard(idx: number) {
    if (picked.includes(idx) || picked.length >= SPREAD) return;
    setPicked((prev) => [...prev, idx]);
  }

  function reset() {
    setPicked([]);
  }

  async function handleSubmit() {
    if (picked.length < SPREAD) {
      setError(t("needCards"));
      return;
    }
    setError("");
    setLoading(true);
    const cards = picked.map((slotIdx, order) => pending[order]); // 탭 순서 = 과거/현재/미래
    try {
      const res = await fetch("/api/fortune", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productSlug, locale, question, cards }),
      });
      const data = await res.json();
      if (data.error) {
        setError(String(data.error));
        return;
      }
      const id = [productSlug, Date.now()].join("__");
      const record: ReadingRecord = {
        id,
        slug: productSlug,
        locale,
        inputType: "tarot",
        cards,
        question,
        reading: data.reading,
        aiGenerated: data.aiGenerated,
        createdAt: new Date().toISOString(),
      };
      saveRecord(record);
      setCurrentId(id);
      router.push(`/fortune/${productSlug}/result`);
    } catch {
      setError(locale === "ko" ? "네트워크 오류가 발생했어요." : "Network error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-5 flex flex-col gap-4">
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <label className="text-sm font-semibold text-ink">{t("questionLabel")}</label>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder={t("questionPlaceholder")}
          rows={2}
          className="mt-1 w-full resize-none rounded-xl border border-black/10 px-3 py-2 text-ink"
        />
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-semibold text-ink">
            {t("pickPrompt")} ({picked.length}/{SPREAD})
          </span>
          {picked.length > 0 && (
            <button onClick={reset} className="text-xs text-ink/40 hover:text-ink/70">
              {t("reshuffle")}
            </button>
          )}
        </div>

        <div className="grid grid-cols-6 gap-2">
          {Array.from({ length: FACE_DOWN }).map((_, idx) => {
            const isPicked = picked.includes(idx);
            const order = picked.indexOf(idx);
            return (
              <button
                key={idx}
                onClick={() => tapCard(idx)}
                disabled={isPicked || picked.length >= SPREAD}
                className={
                  "flex aspect-[2/3] items-center justify-center rounded-lg text-lg transition " +
                  (isPicked
                    ? "bg-moongold text-night font-bold"
                    : "bg-gradient-to-br from-night to-night-soft text-moongold/70 hover:scale-105 disabled:opacity-40")
                }
              >
                {isPicked ? order + 1 : "🌙"}
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-xs text-ink/40">{t("pickHint")}</p>
      </div>

      {error && <p className="text-center text-sm text-red-500">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={loading || picked.length < SPREAD}
        className="w-full rounded-xl bg-night py-3 font-bold text-moongold transition active:scale-95 disabled:opacity-50"
      >
        {loading ? t("loading") : t("submit")}
      </button>
    </div>
  );
}
