// ─────────────────────────────────────────────────────────────
// 다국어 라우팅 설정 (i18n의 중심)
//
// 여기서 "어떤 언어들을 지원할지"를 한 곳에 정의합니다.
// 나중에 일본어를 추가하고 싶으면? locales 에 "ja" 한 줄 넣고,
// messages/ja.json 파일만 만들면 끝입니다. 이게 확장성의 핵심이에요.
// ─────────────────────────────────────────────────────────────
import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  // 지원 언어 목록
  locales: ["ko", "en"],
  // 기본 언어 (어떤 언어인지 알 수 없을 때)
  defaultLocale: "ko",
});

// 일반 next/link 대신 이걸 쓰면, 링크에 현재 언어(/ko, /en)가 자동으로 붙습니다.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
