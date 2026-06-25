// ─────────────────────────────────────────────────────────────
// 데이터 레이어
// 지금은 고정값이지만, 함수(getProducts 등)를 통해서만 데이터를 꺼내 쓰게 해두면
// 나중에 이 함수 속만 DB/API 호출로 바꿔도 화면 코드는 그대로 둘 수 있습니다.
// → "데이터를 어디서 가져오는지"를 한 곳에 가둬서 확장에 강하게 만드는 패턴.
// ─────────────────────────────────────────────────────────────
import type { Product, Review, Locale, CategorySlug } from "@/types";

export const categories: { slug: CategorySlug | "all" }[] = [
  { slug: "all" },
  { slug: "saju" },
  { slug: "ziwei" },
  { slug: "tarot" },
  { slug: "free" },
  { slug: "others" },
];

const products: Product[] = [
  {
    slug: "seollin-saju",
    category: "saju",
    title: { ko: "설린도사의 정통사주", en: "Seollin Master Saju" },
    subtitle: { ko: "사주의 큰 흐름과 인생의 방향을 깊이 풀이해요", en: "A deep reading of your life path" },
    price: 9900,
    thumb: "命",
    inputType: "saju",
    visual: { theme: "blueMoon", badge: { ko: "정통 명리 풀이", en: "Classic saju reading" }, objects: ["命", "月", "運"] },
  },
  {
    slug: "yeseong-ziwei",
    category: "ziwei",
    title: { ko: "예성아씨의 자미두수", en: "Yeseong Zi Wei" },
    subtitle: { ko: "별의 배치로 타고난 운명의 지도를 읽어요", en: "Your destiny map through Zi Wei" },
    price: 14900,
    thumb: "星",
    inputType: "saju",
    visual: { theme: "purpleStar", badge: { ko: "별자리 운명 지도", en: "Celestial destiny map" }, objects: ["紫", "微", "星"] },
  },
  {
    slug: "yeonhwa-love",
    category: "saju",
    title: { ko: "연화선녀의 연애비책", en: "Yeonhwa Love Reading" },
    subtitle: { ko: "인연의 흐름과 상대의 마음을 섬세하게 살펴봐요", en: "Love, chemistry, and timing" },
    price: 12900,
    thumb: "緣",
    inputType: "couple",
    visual: { theme: "redLotus", badge: { ko: "연애·궁합 집중", en: "Love compatibility" }, objects: ["緣", "合", "心"] },
  },
  {
    slug: "seoyun-tarot",
    category: "tarot",
    title: { ko: "서윤타로의 타로리딩", en: "Seoyun Tarot Reading" },
    subtitle: { ko: "카드가 보여주는 지금의 마음과 선택의 방향", en: "A card reading for your next choice" },
    price: 6900,
    thumb: "塔",
    inputType: "tarot",
    visual: { theme: "crystalTarot", badge: { ko: "속마음 타로 리딩", en: "Hidden-heart tarot" }, objects: ["Ⅰ", "Ⅱ", "Ⅲ"] },
  },
  {
    slug: "wolha-shinjeom",
    category: "others",
    title: { ko: "월하신녀의 영험신점", en: "Wolha Spiritual Reading" },
    subtitle: { ko: "막힌 흐름과 중요한 선택의 기운을 살펴봐요", en: "A spiritual reading for turning points" },
    price: 15900,
    thumb: "靈",
    inputType: "saju",
    visual: { theme: "inkName", badge: { ko: "신점 상담", en: "Spiritual reading" }, objects: ["靈", "月", "神"] },
  },
  {
    slug: "harin-name",
    category: "others",
    title: { ko: "하린선생의 이름풀이", en: "Harin Name Reading" },
    subtitle: { ko: "이름에 담긴 기운과 삶의 방향을 풀이해요", en: "The energy hidden in your name" },
    price: 19900,
    thumb: "名",
    inputType: "naming",
    visual: { theme: "inkName", badge: { ko: "이름 기운 설계", en: "Name energy design" }, objects: ["名", "字", "運"] },
  },
  {
    slug: "dohyun-money",
    category: "saju",
    title: { ko: "도현법사의 재물운", en: "Dohyun Money Fortune" },
    subtitle: { ko: "돈의 흐름과 사업·직업운의 때를 살펴봐요", en: "Money, career, and business timing" },
    price: 11900,
    thumb: "財",
    inputType: "saju",
    visual: { theme: "goldCharm", badge: { ko: "사업·재물운", en: "Wealth reading" }, objects: ["財", "福", "運"] },
  },
  {
    slug: "sia-today",
    category: "free",
    title: { ko: "시아선인의 오늘운세", en: "Sia Daily Fortune" },
    subtitle: { ko: "오늘 하루의 흐름과 작은 행운을 알려드려요", en: "Today’s energy and lucky hints" },
    price: 0,
    thumb: "日",
    inputType: "saju",
    visual: { theme: "blueMoon", badge: { ko: "무료 오늘 운세", en: "Free daily reading" }, objects: ["日", "月", "福"] },
  },
];

const reviews: Review[] = [
  {
    user: "이*진",
    product: { ko: "예성아씨의 자미두수", en: "Moon Girl Zi Wei" },
    text: { ko: "분명하게 말해줘서 좋아요", en: "Loved how clear it was." },
  },
  {
    user: "S*N",
    product: { ko: "설린도사의 정통사주", en: "Blue Moon Saju" },
    text: { ko: "모르던 부분을 알게 되어 좋았습니다.", en: "Learned things I never knew." },
  },
  {
    user: "박*현",
    product: { ko: "예성아씨의 자미두수", en: "Moon Girl Zi Wei" },
    text: { ko: "진짜 똑같아서 소름 돋았습니다.", en: "So accurate it gave me chills." },
  },
];

// 언어에 맞는 텍스트를 꺼내는 도우미
export function t(field: { ko: string; en: string }, locale: Locale): string {
  return field[locale] ?? field.ko;
}

export function getProducts(): Product[] {
  return products;
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(slug: string): Product[] {
  if (slug === "all") return products;
  return products.filter((p) => p.category === slug);
}

export function getReviews(): Review[] {
  return reviews;
}
