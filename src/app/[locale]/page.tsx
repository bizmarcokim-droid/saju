// ─────────────────────────────────────────────────────────────
// 홈 페이지 (src/app/[locale]/page.tsx) → 주소: /ko, /en
// 서버 컴포넌트라 데이터를 바로 읽어 그립니다 (빠르고 SEO에 좋음).
// ─────────────────────────────────────────────────────────────
import { getTranslations, setRequestLocale } from "next-intl/server";
import ProductCard from "@/components/ProductCard";
import HomeHero from "@/components/HomeHero";
import ProductHeroCarousel from "@/components/ProductHeroCarousel";
import { getProducts, getReviews, t } from "@/lib/data";
import type { Locale } from "@/types";

export default async function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  setRequestLocale(locale);
  const tr = await getTranslations("home");

  const products = getProducts();
  const reviews = getReviews();
  const loc = locale as Locale;

  return (
    <div>
      <HomeHero products={products} locale={loc} />
      <ProductHeroCarousel products={products} locale={loc} />
      <div className="mb-3 mt-5 flex items-center justify-between px-0.5">
        <h2 className="text-base font-bold text-ink">{loc === "ko" ? "천기누설 추천 리포트" : "Featured readings"}</h2>
        <span className="text-xs font-semibold text-night-soft/60">
          {loc === "ko" ? "가로로 넘겨보기" : "Swipe sideways"}
        </span>
      </div>
      <div className="-mx-4 overflow-x-auto px-4 pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max gap-3 sm:gap-4">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} locale={loc} />
          ))}
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-[1.65rem] bg-white shadow-sm ring-1 ring-black/5">
        <img
          src="/images/cta-webtoon.png"
          alt={loc === "ko" ? "상담 안내 웹툰 배너" : "Webtoon consultation banner"}
          className="h-40 w-full object-cover"
        />
      </div>

      <h2 className="mb-3 mt-6 text-base font-bold text-ink">{tr("reviews")}</h2>
      <div className="flex flex-col gap-2">
        {reviews.map((r, i) => (
          <div key={i} className="rounded-xl bg-white p-3 shadow-sm">
            <div className="flex items-center gap-2 text-xs text-ink/50">
              <span className="font-semibold text-ink/80">{r.user}</span>
              <span>·</span>
              <span>{t(r.product, loc)}</span>
              <span className="ml-auto">{tr("justNow")}</span>
            </div>
            <p className="mt-1 text-sm text-ink/80">{t(r.text, loc)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
