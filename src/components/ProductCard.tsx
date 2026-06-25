// ─────────────────────────────────────────────────────────────
// 상품 책표지 카드
// 가격/바로가기 문구 없이, 세로형 동양풍 일러스트 자체가 메인이 되도록 구성합니다.
// 모바일에서는 가로 스크롤 리스트 안에서 사용됩니다.
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
      className="group block w-[164px] shrink-0 sm:w-[190px] lg:w-[210px]"
      aria-label={locale === "ko" ? `${title} 상세보기` : `View ${title}`}
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-[1.25rem] bg-white shadow-[0_10px_30px_rgba(30,20,70,0.14)] ring-1 ring-black/5 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_18px_42px_rgba(30,20,70,0.22)]">
        <img
          src={`/images/${product.slug}.png`}
          alt={title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]"
          loading="lazy"
        />
      </div>
    </Link>
  );
}
