"use client";

import { useEffect, useMemo, useState } from "react";
import { Link } from "@/i18n/routing";
import type { Product, Locale } from "@/types";

export default function HomeHero({ products, locale }: { products: Product[]; locale: Locale }) {
  const heroProducts = useMemo(() => products.slice(0, 6), [products]);
  const [activeIndex, setActiveIndex] = useState(0);
  const active = heroProducts[activeIndex] ?? products[0];
  const title = locale === "ko" ? active.title.ko : active.title.en;
  const subtitle = locale === "ko" ? active.subtitle.ko : active.subtitle.en;

  useEffect(() => {
    if (heroProducts.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroProducts.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [heroProducts.length]);

  return (
    <section className="-mx-4 -mt-1 mb-6">
      <Link
        href={`/fortune/${active.slug}`}
        aria-label={locale === "ko" ? `${title} 상세보기` : `View ${title}`}
        className="group block overflow-hidden bg-night shadow-[0_18px_42px_rgba(10,6,24,0.32)] sm:mx-4 sm:rounded-[2rem]"
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#080711] sm:aspect-[16/8]">
          <div
            className="absolute inset-0 bg-cover bg-no-repeat transition duration-700 group-hover:scale-[1.018]"
            style={{
              backgroundImage: "url('/images/artwork-sheet.svg')",
              backgroundSize: "161% 190%",
              backgroundPosition: "0% 0%",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/5 to-black/70" />
          <div className="absolute inset-x-0 bottom-0 p-5 pt-16 text-white sm:p-7">
            <p className="mb-1 text-[11px] font-bold tracking-[0.24em] text-gold/85">
              {locale === "ko" ? "천기누설" : "CHEONGI"}
            </p>
            <h1 className="text-2xl font-extrabold leading-tight sm:text-4xl">{title}</h1>
            <p className="mt-2 line-clamp-1 text-sm font-medium text-white/78 sm:text-base">{subtitle}</p>
          </div>
        </div>
      </Link>

      <div className="mt-3 flex items-center justify-center gap-2" aria-label={locale === "ko" ? "메인 슬라이드 선택" : "Select hero slide"}>
        {heroProducts.map((product, index) => {
          const isActive = index === activeIndex;
          const itemTitle = locale === "ko" ? product.title.ko : product.title.en;
          return (
            <button
              key={product.slug}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                isActive ? "w-7 bg-night" : "w-2.5 bg-night/20 hover:bg-night/40"
              }`}
              aria-label={itemTitle}
              aria-current={isActive ? "true" : undefined}
            />
          );
        })}
      </div>
    </section>
  );
}
