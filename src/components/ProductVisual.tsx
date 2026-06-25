import type { Locale, Product } from "@/types";

export default function ProductVisual({
  product,
  locale,
  size = "card",
}: {
  product: Product;
  locale: Locale;
  size?: "card" | "hero";
}) {
  const isHero = size === "hero";
  const title = locale === "ko" ? product.title.ko : product.title.en;

  return (
    <div
      className={`relative isolate overflow-hidden bg-white shadow-sm ring-1 ring-black/5 ${
        isHero ? "aspect-[2/3] w-full max-w-[360px] rounded-[1.75rem]" : "aspect-[2/3] w-full rounded-[1.25rem]"
      }`}
      aria-label={title}
    >
      <img
        src={`/images/${product.slug}.png`}
        alt={title}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
