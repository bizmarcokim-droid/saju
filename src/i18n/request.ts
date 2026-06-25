// ─────────────────────────────────────────────────────────────
// 요청별 번역 로딩
// 사용자가 /en 으로 들어오면 messages/en.json 을,
// /ko 로 들어오면 messages/ko.json 을 불러옵니다.
// (직접 호출할 일은 없고, next-intl이 자동으로 사용합니다)
// ─────────────────────────────────────────────────────────────
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // 지원하지 않는 언어로 들어오면 기본 언어로 되돌립니다.
  if (!locale || !routing.locales.includes(locale as (typeof routing.locales)[number])) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
