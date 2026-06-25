import createNextIntlPlugin from "next-intl/plugin";

// next-intl 플러그인에 "번역 설정 파일이 어디 있는지" 알려줍니다.
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 나중에 외부 이미지(CDN)를 쓰게 되면 여기에 도메인을 등록합니다.
  // images: { remotePatterns: [{ protocol: "https", hostname: "cdn.example.com" }] },
};

export default withNextIntl(nextConfig);
