"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/routing";
import type { Product, Locale } from "@/types";

export default function ProductHeroCarousel({
  products,
  locale,
}: {
  products: Product[];
  locale: Locale;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProduct = products[activeIndex];
  const title = locale === "ko" ? activeProduct.title.ko : activeProduct.title.en;
  const subtitle = locale === "ko" ? activeProduct.subtitle.ko : activeProduct.subtitle.en;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % products.length);
    }, 3800);

    return () => window.clearInterval(timer);
  }, [products.length]);

  return (
    <section className="mb-6">
      <Link
        href={`/fortune/${activeProduct.slug}`}
        aria-label={locale === "ko" ? `${title} 상세보기` : `View ${title}`}
        className="group block overflow-hidden rounded-[1.8rem] bg-white shadow-[0_14px_34px_rgba(30,20,70,0.16)] ring-1 ring-black/5"
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#f7f1ea] sm:aspect-[16/7]">
          <img
            src={`/images/${activeProduct.slug}.png`}
            alt={title}
            className="h-full w-full object-contain transition duration-700 group-hover:scale-[1.015]"
          />
        </div>
      </Link>

      <div className="px-1 pt-3 text-center">
        <p className="line-clamp-1 text-sm font-semibold text-ink">
          {title} · <span className="font-medium text-ink/65">{subtitle}</span>
        </p>

        <div className="mt-3 flex items-center justify-center gap-2" aria-label={locale === "ko" ? "상품 슬라이드 선택" : "Select product slide"}>
          {products.map((product, index) => {
            const itemTitle = locale === "ko" ? product.title.ko : product.title.en;
            const isActive = index === activeIndex;
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
