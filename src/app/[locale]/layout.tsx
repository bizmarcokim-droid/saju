// ─────────────────────────────────────────────────────────────
// 언어별 루트 레이아웃 (src/app/[locale]/layout.tsx)
//
// 폴더 이름 [locale] 덕분에 /ko, /en 두 주소가 이 레이아웃을 함께 씁니다.
// readmysaju.com 의 app/[locale] 구조와 똑같은 패턴이에요.
// ─────────────────────────────────────────────────────────────
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import "../globals.css";

// ★ 배포할 때 이 URL을 회원님이 구매한 도메인으로 바꾸세요.
//   (검색엔진/공유 미리보기가 절대경로를 만들 때 사용합니다)
export const metadata: Metadata = {
  metadataBase: new URL("https://your-domain.com"),
  title: "Saju Platform",
  description: "AI 사주·타로·운세 플랫폼",
};

// 빌드 시 /ko, /en 페이지를 미리 만들어 둡니다 (속도/SEO에 좋음).
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  // 지원하지 않는 언어 주소면 404
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // 이 요청의 언어를 고정 (서버 렌더링이 올바른 언어를 쓰도록)
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        {/* Provider가 하위 모든 컴포넌트에 번역을 공급합니다 */}
        <NextIntlClientProvider messages={messages}>
          <div className="mx-auto flex min-h-screen max-w-app flex-col bg-mist">
            <Header />
            <main className="flex-1 px-4 pb-16 pt-16">{children}</main>
            <BottomNav />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
