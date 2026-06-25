// ─────────────────────────────────────────────────────────────
// 미들웨어: 모든 요청이 페이지에 닿기 전에 먼저 거치는 관문.
// 여기서는 "주소에 언어가 없으면 알아서 /ko 같은 걸 붙여주는" 역할을 합니다.
// (예: 사용자가 / 로 들어오면 → /ko 로 안내)
// ─────────────────────────────────────────────────────────────
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // 이 패턴에 맞는 주소에만 미들웨어가 동작합니다.
  // api, _next(내부 파일), 정적 파일(.png 등)은 건드리지 않습니다.
  matcher: ["/", "/(ko|en)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
