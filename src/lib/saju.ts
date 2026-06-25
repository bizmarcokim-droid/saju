// ─────────────────────────────────────────────────────────────
// 사주 계산 엔진 (★ 핵심 로직 — 이제 진짜로 계산합니다)
//
// 사주는 직접 계산하기 까다롭습니다:
//  - 연주는 1월 1일이 아니라 '입춘'을 기준으로 바뀝니다.
//  - 월주는 달력 월이 아니라 '절기'(태양의 위치)로 나뉩니다.
//  - 시주는 태어난 시각이 있어야 계산됩니다.
// 이 천문 계산을 정확히 처리하려고 검증된 만세력 라이브러리(lunar-typescript)를 씁니다.
// → 이 파일은 라이브러리의 한자 결과를 받아 한국어로 바꾸고, 오행 분포를 정리합니다.
//
// ⚠️ 서버 전용입니다. (브라우저용 컴포넌트에서 import 하지 마세요)
// ─────────────────────────────────────────────────────────────
import { Solar } from "lunar-typescript";
import type { SajuResult, FiveElement } from "@/types";

// 한자 → 한국어 변환표
const STEM: Record<string, string> = {
  甲: "갑", 乙: "을", 丙: "병", 丁: "정", 戊: "무",
  己: "기", 庚: "경", 辛: "신", 壬: "임", 癸: "계",
};
const BRANCH: Record<string, string> = {
  子: "자", 丑: "축", 寅: "인", 卯: "묘", 辰: "진", 巳: "사",
  午: "오", 未: "미", 申: "신", 酉: "유", 戌: "술", 亥: "해",
};
const ELEMENT: Record<string, FiveElement> = {
  木: "목", 火: "화", 土: "토", 金: "금", 水: "수",
};
// 천간(한자) → 오행
const STEM_ELEMENT: Record<string, FiveElement> = {
  甲: "목", 乙: "목", 丙: "화", 丁: "화", 戊: "토",
  己: "토", 庚: "금", 辛: "금", 壬: "수", 癸: "수",
};

// "庚午" 같은 간지 한자를 "경오" 한글로 변환
function toKorean(ganZhi: string): string {
  const stem = STEM[ganZhi[0]] ?? ganZhi[0];
  const branch = BRANCH[ganZhi[1]] ?? ganZhi[1];
  return stem + branch;
}

/**
 * 생년월일(+선택적 시각)으로 사주를 계산합니다.
 * @param birthDate "YYYY-MM-DD" (양력)
 * @param birthTime "HH:MM" (선택) — 없으면 시주는 "미상"
 */
export function calculateSaju(birthDate: string, birthTime?: string): SajuResult {
  const [y, m, d] = birthDate.split("-").map(Number);

  const hasHour = Boolean(birthTime);
  let hh = 12; // 시각을 모르면 정오로 두어 일주를 안전하게 계산
  let mm = 0;
  if (birthTime) {
    const [h, min] = birthTime.split(":").map(Number);
    hh = h;
    mm = min || 0;
  }

  const solar = Solar.fromYmdHms(y, m, d, hh, mm, 0);
  const ec = solar.getLunar().getEightChar();

  const pillars = {
    year: toKorean(ec.getYear()),
    month: toKorean(ec.getMonth()),
    day: toKorean(ec.getDay()),
    hour: hasHour ? toKorean(ec.getTime()) : "미상",
  };

  // 일간 = 일주의 첫 글자(천간)
  const dayGanHanja = ec.getDayGan();
  const dayMaster = {
    stem: STEM[dayGanHanja] ?? dayGanHanja,
    element: STEM_ELEMENT[dayGanHanja],
  };

  // 오행 분포: 각 기둥의 오행 문자열(예: "金火")을 모아서 셈
  const elements: Record<FiveElement, number> = { 목: 0, 화: 0, 토: 0, 금: 0, 수: 0 };
  const wuxingStrings = [ec.getYearWuXing(), ec.getMonthWuXing(), ec.getDayWuXing()];
  if (hasHour) wuxingStrings.push(ec.getTimeWuXing());
  for (const ws of wuxingStrings) {
    for (const ch of ws) {
      const el = ELEMENT[ch];
      if (el) elements[el] += 1;
    }
  }

  return { pillars, dayMaster, elements, hasHour };
}
