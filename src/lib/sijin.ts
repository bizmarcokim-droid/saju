// ─────────────────────────────────────────────────────────────
// 12지 시진 (時辰) 목록
// 사주의 시주는 2시간 단위 12지로 묶입니다. 사용자는 시:분 대신 시진을 고릅니다.
//   - time: 사주 계산 엔진에 보낼 대표 시각(각 시진 표준 범위의 중앙값).
//           이 값으로 계산하면 시주 지지가 정확히 나옵니다. (검증 완료)
//   - range: 화면에 보여줄 시간대 (한국 진태양시 관례라 :30 경계)
// ─────────────────────────────────────────────────────────────
import type { Locale } from "@/types";

export interface Sijin {
  ko: string; // 한글 시진명 (자시)
  en: string; // 영문 표기 (子 Rat)
  range: string; // 표시용 시간대 (23:30~01:30)
  time: string; // 엔진에 보낼 대표 시각 (HH:MM)
}

export const SIJIN: Sijin[] = [
  { ko: "자시", en: "子 Rat", range: "23:30~01:30", time: "00:30" },
  { ko: "축시", en: "丑 Ox", range: "01:30~03:30", time: "02:00" },
  { ko: "인시", en: "寅 Tiger", range: "03:30~05:30", time: "04:00" },
  { ko: "묘시", en: "卯 Rabbit", range: "05:30~07:30", time: "06:00" },
  { ko: "진시", en: "辰 Dragon", range: "07:30~09:30", time: "08:00" },
  { ko: "사시", en: "巳 Snake", range: "09:30~11:30", time: "10:00" },
  { ko: "오시", en: "午 Horse", range: "11:30~13:30", time: "12:00" },
  { ko: "미시", en: "未 Goat", range: "13:30~15:30", time: "14:00" },
  { ko: "신시", en: "申 Monkey", range: "15:30~17:30", time: "16:00" },
  { ko: "유시", en: "酉 Rooster", range: "17:30~19:30", time: "18:00" },
  { ko: "술시", en: "戌 Dog", range: "19:30~21:30", time: "20:00" },
  { ko: "해시", en: "亥 Pig", range: "21:30~23:30", time: "22:00" },
];

// 드롭다운에 보여줄 한 줄 라벨 (예: "자시 (23:30~01:30)")
export function sijinOptionLabel(s: Sijin, locale: Locale): string {
  return `${locale === "ko" ? s.ko : s.en} (${s.range})`;
}

// 저장된 대표 시각(time)을 다시 시진명으로 (결과/보관함 표시용)
export function sijinLabelFromTime(time: string | undefined, locale: Locale): string | null {
  if (!time) return null;
  const s = SIJIN.find((x) => x.time === time);
  return s ? (locale === "ko" ? s.ko : s.en) : time;
}
