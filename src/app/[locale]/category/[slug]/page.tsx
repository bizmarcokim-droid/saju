// ─────────────────────────────────────────────────────────────
// 카테고리 페이지 → 주소: /ko/category/saju 등
// 주소에 [locale] 과 [slug] 두 변수가 들어옵니다.
// ─────────────────────────────────────────────────────────────
import { getTranslations, setRequestLocale } from "next-intl/server";
import ProductCard from "@/components/ProductCard";
import { getProductsByCategory } from "@/lib/data";
import type { Locale } from "@/types";

export default async function CategoryPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const { locale, slug } = params;
  setRequestLocale(locale);
  const tNav = await getTranslations("nav");
  const tCat = await getTranslations("category");

  const list = getProductsByCategory(slug);
  const loc = locale as Locale;

  return (
    <div>
      <h1 className="mb-4 mt-2 text-lg font-bold text-ink">
        {tNav(`categories.${slug}`)}
      </h1>
      {list.length === 0 ? (
        <p className="mt-10 text-center text-sm text-ink/50">{tCat("empty")}</p>
      ) : (
        <div className="-mx-4 overflow-x-auto px-4 pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex w-max gap-3 sm:gap-4">
            {list.map((p) => (
              <ProductCard key={p.slug} product={p} locale={loc} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
