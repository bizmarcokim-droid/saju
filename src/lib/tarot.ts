// ─────────────────────────────────────────────────────────────
// 타로 덱 (메이저 아르카나 22장)
// 카드 뽑기는 화면(클라이언트)에서 일어나고, 뽑힌 결과를 서버로 보내 AI가 해석합니다.
// ─────────────────────────────────────────────────────────────
import type { DrawnCard, Locale } from "@/types";

export interface TarotCardDef {
  ko: string;
  en: string;
}

// 0~21번 메이저 아르카나
export const MAJOR_ARCANA: TarotCardDef[] = [
  { ko: "바보", en: "The Fool" },
  { ko: "마법사", en: "The Magician" },
  { ko: "여사제", en: "The High Priestess" },
  { ko: "여황제", en: "The Empress" },
  { ko: "황제", en: "The Emperor" },
  { ko: "교황", en: "The Hierophant" },
  { ko: "연인", en: "The Lovers" },
  { ko: "전차", en: "The Chariot" },
  { ko: "힘", en: "Strength" },
  { ko: "은둔자", en: "The Hermit" },
  { ko: "운명의 수레바퀴", en: "Wheel of Fortune" },
  { ko: "정의", en: "Justice" },
  { ko: "매달린 사람", en: "The Hanged Man" },
  { ko: "죽음", en: "Death" },
  { ko: "절제", en: "Temperance" },
  { ko: "악마", en: "The Devil" },
  { ko: "탑", en: "The Tower" },
  { ko: "별", en: "The Star" },
  { ko: "달", en: "The Moon" },
  { ko: "태양", en: "The Sun" },
  { ko: "심판", en: "Judgement" },
  { ko: "세계", en: "The World" },
];

// 3장 스프레드의 자리 이름
export const SPREAD_POSITIONS: { ko: string; en: string }[] = [
  { ko: "과거", en: "Past" },
  { ko: "현재", en: "Present" },
  { ko: "미래", en: "Future" },
];

// 덱에서 n장을 (중복 없이, 랜덤 정/역방향으로) 뽑습니다.
export function drawCards(n: number): DrawnCard[] {
  const indices = Array.from({ length: MAJOR_ARCANA.length }, (_, i) => i);
  // 셔플 (Fisher–Yates)
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices.slice(0, n).map((idx, i) => {
    const card = MAJOR_ARCANA[idx];
    const pos = SPREAD_POSITIONS[i] ?? { ko: `${i + 1}`, en: `${i + 1}` };
    return {
      cardKo: card.ko,
      cardEn: card.en,
      reversed: Math.random() < 0.5,
      position: `${pos.ko}|${pos.en}`, // 양쪽 라벨을 함께 저장 (표시 때 언어로 분리)
    };
  });
}

// 표시용: 카드 이름 / 자리 / 방향을 언어에 맞게
export function cardName(c: DrawnCard, locale: Locale): string {
  return locale === "ko" ? c.cardKo : c.cardEn;
}
export function positionName(c: DrawnCard, locale: Locale): string {
  const [ko, en] = c.position.split("|");
  return locale === "ko" ? ko : en ?? ko;
}
export function orientationName(c: DrawnCard, locale: Locale): string {
  if (locale === "ko") return c.reversed ? "역방향" : "정방향";
  return c.reversed ? "Reversed" : "Upright";
}
