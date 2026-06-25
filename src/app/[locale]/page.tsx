// ─────────────────────────────────────────────────────────────
// 홈 페이지 (src/app/[locale]/page.tsx) → 주소: /ko, /en
// ─────────────────────────────────────────────────────────────
import { getTranslations, setRequestLocale } from "next-intl/server";
import ProductCard from "@/components/ProductCard";
import HomeHero from "@/components/HomeHero";
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

      <section className="mt-7">
        <div className="mb-3 flex items-end justify-between px-0.5">
          <div>
            <p className="text-[11px] font-bold tracking-[0.24em] text-night-soft/45">
              {loc === "ko" ? "CHEONGI LIBRARY" : "CHEONGI LIBRARY"}
            </p>
            <h2 className="mt-1 text-lg font-extrabold text-ink">
              {loc === "ko" ? "천기누설 서고" : "Cheongi Library"}
            </h2>
          </div>
          <span className="text-xs font-semibold text-night-soft/55">
            {loc === "ko" ? "가로로 넘겨보기" : "Swipe sideways"}
          </span>
        </div>

        <div className="-mx-4 overflow-x-auto px-4 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex w-max snap-x snap-mandatory gap-3 sm:gap-4 lg:w-full lg:grid lg:grid-cols-4 lg:gap-4">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} locale={loc} />
            ))}
          </div>
        </div>
      </section>

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
