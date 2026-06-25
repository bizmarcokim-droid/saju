// ─────────────────────────────────────────────────────────────
// 운세 상세 페이지 → 주소: /ko/fortune/bluemoon-saju 등
// 상품 정보는 서버에서 그리고(빠름), 입력 폼만 클라이언트 컴포넌트로 분리합니다.
// ─────────────────────────────────────────────────────────────
import { getTranslations, setRequestLocale } from "next-intl/server";
import FortuneForm from "@/components/FortuneForm";
import TarotForm from "@/components/TarotForm";
import { getProduct, t } from "@/lib/data";
import ProductVisual from "@/components/ProductVisual";
import type { Locale } from "@/types";

export default async function FortunePage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const { locale, slug } = params;
  setRequestLocale(locale);
  const tr = await getTranslations("fortune");

  const product = getProduct(slug);
  const loc = locale as Locale;

  if (!product) {
    return <p className="mt-10 text-center text-sm text-ink/50">{tr("notFound")}</p>;
  }

  return (
    <div className="py-2">
      <div className="overflow-hidden rounded-3xl bg-night p-3 text-white shadow-lg">
        <div className="flex justify-center">
          <ProductVisual product={product} locale={loc} size="hero" />
        </div>
        <div className="px-3 pb-4 pt-5 text-center">
          <h1 className="text-xl font-bold text-moongold">{t(product.title, loc)}</h1>
          <p className="mt-1 text-sm text-white/70">{t(product.subtitle, loc)}</p>
          <p className="mt-3 text-lg font-bold">
            {product.price === 0
              ? tr("free")
              : `${product.price.toLocaleString()}${tr("priceSuffix")}`}
          </p>
        </div>
      </div>

      {/* 상품 종류에 맞는 입력 폼을 보여줍니다. */}
      {product.inputType === "tarot" ? (
        <TarotForm productSlug={product.slug} />
      ) : (
        <FortuneForm productSlug={product.slug} mode={product.inputType} />
      )}
    </div>
  );
}
