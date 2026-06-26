// ─────────────────────────────────────────────────────────────
// 상품 책표지 카드
// 실제 생성 일러스트 시트에서 상품별 표지를 crop해서 보여줍니다.
// ─────────────────────────────────────────────────────────────
import { Link } from "@/i18n/routing";
import type { Product, Locale } from "@/types";

const coverCrop: Record<string, { x: number; y: number }> = {
  "seollin-saju": { x: 16.1, y: 46.9 },
  "yeseong-ziwei": { x: 26.5, y: 46.9 },
  "yeonhwa-love": { x: 36.9, y: 46.9 },
  "seoyun-tarot": { x: 47.3, y: 46.9 },
  "wolha-shinjeom": { x: 16.1, y: 71.3 },
  "harin-name": { x: 26.5, y: 71.3 },
  "dohyun-money": { x: 36.9, y: 71.3 },
  "sia-today": { x: 47.3, y: 71.3 },
};

export default function ProductCard({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  const title = locale === "ko" ? product.title.ko : product.title.en;
  const crop = coverCrop[product.slug] ?? coverCrop["seollin-saju"];

  return (
    <Link
      href={`/fortune/${product.slug}`}
      className="group block w-[156px] shrink-0 snap-start sm:w-[188px] lg:w-full"
      aria-label={locale === "ko" ? `${title} 상세보기` : `View ${title}`}
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-[1.15rem] bg-[#0d0b16] shadow-[0_12px_32px_rgba(10,6,24,0.24)] ring-1 ring-gold/20 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_20px_46px_rgba(10,6,24,0.34)]">
        <div
          className="absolute inset-0 scale-[1.02] bg-cover bg-no-repeat transition duration-500 group-hover:scale-[1.06]"
          style={{
            backgroundImage: "url('/images/artwork-sheet.svg')",
            backgroundSize: "1082% 488%",
            backgroundPosition: `${crop.x}% ${crop.y}%`,
          }}
        />
      </div>
    </Link>
  );
}
