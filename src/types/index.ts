// ─────────────────────────────────────────────────────────────
// 공용 타입 정의
// 데이터의 "모양"을 한 곳에 정해두면, 오타나 빠진 값이 있을 때
// 에디터가 빨간 줄로 즉시 알려줍니다. 코드가 커질수록 이게 큰 힘이 돼요.
// ─────────────────────────────────────────────────────────────

// 지원 언어 (routing.ts 의 locales 와 짝을 맞춥니다)
export type Locale = "ko" | "en";

// 언어별 텍스트 묶음. 상품 제목처럼 번역이 필요한 값에 씁니다.
export type Localized = Record<Locale, string>;

export type CategorySlug = "saju" | "ziwei" | "tarot" | "free" | "others";

// 상품이 어떤 입력 폼을 쓰는지
export type InputType = "saju" | "couple" | "naming" | "tarot";

export type VisualTheme = "blueMoon" | "redLotus" | "purpleStar" | "crystalTarot" | "goldCharm" | "inkName";

export interface Product {
  slug: string;
  category: CategorySlug;
  title: Localized;
  subtitle: Localized;
  price: number; // 0 이면 무료
  thumb: string; // 리스트 접근성을 위한 대표 심볼
  inputType: InputType; // 폼 종류 (사주/궁합/작명/타로)
  visual: {
    theme: VisualTheme;
    badge: Localized;
    objects: string[];
  };
}

export interface Review {
  user: string;
  product: Localized;
  text: Localized;
}

// 사주 오행 (목·화·토·금·수)
export type FiveElement = "목" | "화" | "토" | "금" | "수";

// 사주 계산 결과 (lib/saju.ts 가 돌려주는 모양)
export interface SajuResult {
  // 사주팔자 네 기둥 (한글 간지, 예: "경오"). hasHour=false 면 hour 는 "미상"
  pillars: { year: string; month: string; day: string; hour: string };
  // 일간(日干) = 사주에서 '나' 자신을 뜻하는 핵심 글자 + 그 오행
  dayMaster: { stem: string; element: FiveElement };
  // 오행 분포 (글자들에 각 오행이 몇 번 나오는지)
  elements: Record<FiveElement, number>;
  // 태어난 시각을 입력했는지 (안 했으면 시주는 계산 불가)
  hasHour: boolean;
}

// 성별
export type Gender = "male" | "female";

// 한 사람의 입력 정보 (본인 또는 상대방)
export interface PersonInput {
  name: string;
  gender: Gender | ""; // "" = 아직 선택 안 함
  birthDate: string; // "YYYY-MM-DD"
  birthTime?: string; // "HH:MM" (선택)
}

// 타로 카드 한 장 (뽑힌 결과)
export interface DrawnCard {
  cardKo: string; // 카드 이름 (한글)
  cardEn: string; // 카드 이름 (영문)
  reversed: boolean; // 역방향 여부
  position: string; // 자리 (과거/현재/미래 등)
}

// 하나의 운세 결과 전체 (입력 + 계산 + 풀이). 보관함/결과 페이지가 공유합니다.
// 입력 타입에 따라 채워지는 필드가 다릅니다 (사주/궁합은 saju, 타로는 cards 등).
export interface ReadingRecord {
  id: string;
  slug: string;
  locale: Locale;
  inputType: InputType;
  person?: PersonInput; // saju/couple/naming
  partner?: PersonInput; // couple
  saju?: SajuResult; // saju/couple/naming
  partnerSaju?: SajuResult; // couple
  cards?: DrawnCard[]; // tarot
  question?: string; // tarot
  reading: string; // AI 풀이 (또는 폴백)
  aiGenerated: boolean;
  createdAt: string;
}
