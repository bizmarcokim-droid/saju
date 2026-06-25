// ─────────────────────────────────────────────────────────────
// 상품 책표지 카드
// 가격/버튼/설명을 제거하고, 일러스트 책표지 자체가 상품을 설명하도록 구성합니다.
// ─────────────────────────────────────────────────────────────
import { Link } from "@/i18n/routing";
import type { Product, Locale } from "@/types";

export default function ProductCard({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  const title = locale === "ko" ? product.title.ko : product.title.en;

  return (
    <Link
      href={`/fortune/${product.slug}`}
      className="group block w-[156px] shrink-0 snap-start sm:w-[188px] lg:w-full"
      aria-label={locale === "ko" ? `${title} 상세보기` : `View ${title}`}
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-[1.15rem] bg-[#f8f1e8] shadow-[0_10px_28px_rgba(28,18,62,0.14)] ring-1 ring-black/5 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_18px_42px_rgba(28,18,62,0.24)]">
        <img
          src={`/images/cover-${product.slug}.svg`}
          alt={title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]"
          loading="lazy"
        />
      </div>
    </Link>
  );
}
