# Saju Platform (확장형 스타터)

Next.js App Router + TypeScript + 다국어(i18n) + Tailwind 기반의 **확장에 강한** 사주/운세 플랫폼 뼈대입니다.
청월당(국내형)과 readmysaju(글로벌형)의 장점을 합쳐, 처음부터 여러 언어와 AI 연동을 염두에 두고 설계했습니다.

---

## 왜 이 구성이 확장성이 높은가

- **TypeScript** — 데이터/함수의 "모양"을 타입으로 고정. 코드가 커질 때 실수를 빌드 단계에서 잡아줍니다.
- **다국어 라우팅(`/ko`, `/en`)** — `next-intl` + `[locale]` 폴더. 언어 추가 = `locales`에 한 줄 + `messages/xx.json` 한 개.
- **Tailwind (Chakra UI 대신)** — Chakra는 화면 그릴 때마다 스타일을 계산하는 런타임 비용이 있습니다. Tailwind는 빌드 때 CSS를 미리 만들어 두어 트래픽이 커져도 더 가볍고, 생태계/자료도 더 많아 확장에 유리합니다.
- **역할 분리** — 화면(components/pages) · 데이터(lib/data) · 계산 엔진(lib/saju) · 서버 API(app/api)를 폴더로 갈라놨습니다. 한 부분을 통째로 바꿔도 나머지가 안 흔들립니다.

---

## 실행 방법

```bash
npm install      # 부품 설치 (처음 한 번)
npm run dev      # 개발 서버
```

브라우저에서 http://localhost:3000 → 자동으로 `/ko`로 이동합니다. 우측 상단 `EN` 버튼으로 영어 전환.

---

## 폴더 구조

```
src/
├── middleware.ts            ← 언어 자동 감지/리다이렉트
├── i18n/
│   ├── routing.ts           ← 지원 언어 정의 (여기에 언어 추가)
│   └── request.ts           ← 언어별 번역 로딩
├── app/
│   ├── [locale]/            ← /ko, /en 이 공유하는 영역
│   │   ├── layout.tsx        ← 공통 껍데기(헤더+하단탭) + 메타데이터
│   │   ├── page.tsx          ← 홈
│   │   ├── category/[slug]/  ← 카테고리별 목록
│   │   └── fortune/[slug]/   ← 상품 상세 + 입력 폼
│   └── api/fortune/route.ts ← ★ 서버: 사주 계산 + AI 풀이 (핵심)
├── components/              ← Header, BottomNav, ProductCard, FortuneForm
├── lib/
│   ├── data.ts              ← 데이터 접근 (나중에 DB로 교체할 자리)
│   └── saju.ts              ← ★ 사주 계산 엔진 (핵심 로직)
└── types/index.ts          ← 공용 타입
messages/ko.json, en.json    ← 화면 글자 번역
```

★ 표시 두 곳(`lib/saju.ts`, `api/fortune/route.ts`)이 이 서비스의 두뇌입니다.

---

## 채워나갈 순서

| 단계 | 무엇을 | 어디를 |
|------|--------|--------|
| ✅ 1 | 정확한 사주 계산 | `src/lib/saju.ts` — 완료. 만세력 라이브러리(lunar-typescript)로 입춘·절기·진태양시 반영, 시주는 시각 입력 시 계산 |
| ✅ 2 | AI 풀이 생성 | `src/lib/ai.ts` + `route.ts` — 완료. 사주 결과를 Claude API로 보내 풀이 생성 (키 없으면 요약 폴백) |
| 3 | 상품/리뷰를 DB로 | `src/lib/data.ts` 의 함수 속을 fetch/DB 쿼리로 교체 |
| 4 | 로그인·결제 | 글로벌이면 PayPal/Stripe, 국내면 토스/포트원 |
| 5 | 언어 추가 | `i18n/routing.ts` + `messages/ja.json` 등 |

### AI 풀이 켜는 법
1. `.env.example` 을 복사해 `.env` 파일을 만듭니다.
2. `.env` 안의 `ANTHROPIC_API_KEY=` 뒤에 본인 키를 붙여넣습니다. (키 발급: https://console.anthropic.com)
3. 서버를 껐다가 (`Ctrl+C`) `npm run dev` 로 다시 켭니다.
4. 운세를 보면 이제 AI가 작성한 풀이가 나옵니다.

- 키를 안 넣어도 앱은 동작합니다 — 대신 사주 요약만 표시돼요.
- 모델은 `.env` 의 `AI_MODEL` 로 바꿀 수 있어요 (기본 `claude-sonnet-4-6`).
- ⚠️ `.env` 파일은 절대 깃/공개 저장소에 올리지 마세요. (`.gitignore` 에 이미 등록돼 있습니다)

API 키는 `.env` 파일에 넣습니다. `.env.example` 을 복사해 `.env` 로 만들고 값을 채우세요. (`.env` 는 절대 공개 저장소에 올리지 마세요)

---

## 배포 + 도메인 연결 (직접 하셔야 하는 단계)

코드는 도메인만 바꿔 끼우면 바로 올라가도록 준비돼 있습니다. 계정/결제가 얽혀서 이 부분은 회원님이 직접 진행하세요.

1. **도메인 자리 수정**
   - `src/app/[locale]/layout.tsx` 의 `metadataBase` 를 구매한 도메인으로 변경
   - `.env` 의 `NEXT_PUBLIC_SITE_URL` 변경
2. **GitHub에 코드 올리기** (`git init` → 커밋 → 푸시)
3. **Vercel 연결**
   - vercel.com 에서 그 GitHub 저장소를 Import (청월당·readmysaju 둘 다 Vercel을 씁니다)
   - 환경변수(`ANTHROPIC_API_KEY` 등)를 Vercel 대시보드에 입력
4. **도메인 붙이기**
   - Vercel 프로젝트 → Settings → Domains 에서 구매한 도메인 입력
   - 안내해주는 DNS 레코드를 도메인 구매처(가비아/Cloudflare 등)에 등록하면 끝

여러 도메인을 사두셨다면, 같은 프로젝트에 여러 도메인을 붙이거나(리다이렉트), 언어/브랜드별로 프로젝트를 나눠 붙일 수도 있어요. 그 구성은 어떤 도메인을 어떻게 쓰실지 정해지면 같이 잡아드릴게요.
