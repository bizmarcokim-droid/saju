"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/routing";
import type { Product, Locale } from "@/types";

export default function HomeHero({ products, locale }: { products: Product[]; locale: Locale }) {
  const heroProducts = products.slice(0, 6);
  const [activeIndex, setActiveIndex] = useState(0);
  const active = heroProducts[activeIndex] ?? products[0];
  const title = locale === "ko" ? active.title.ko : active.title.en;
  const subtitle = locale === "ko" ? active.subtitle.ko : active.subtitle.en;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroProducts.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [heroProducts.length]);

  return (
    <section className="mb-6">
      <Link
        href={`/fortune/${active.slug}`}
        aria-label={locale === "ko" ? `${title} 상세보기` : `View ${title}`}
        className="group block overflow-hidden rounded-[2rem] bg-night shadow-[0_18px_42px_rgba(30,20,70,0.20)] ring-1 ring-black/5"
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#171329] sm:aspect-[16/7]">
          <img
            src={`/images/hero-${active.slug}.png`}
            alt={title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.018]"
          />
        </div>
      </Link>
      <div className="px-1 pt-3 text-center">
        <p className="line-clamp-1 text-sm font-semibold text-ink">
          {title} · <span className="font-medium text-ink/65">{subtitle}</span>
        </p>
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
      </div>
    </section>
  );
}
