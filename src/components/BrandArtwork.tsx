import type { Product, Locale } from "@/types";

type ArtworkSize = "cover" | "hero";

type Theme = {
  bg1: string;
  bg2: string;
  accent: string;
  accent2: string;
  ink: string;
  robe: string;
  hair: string;
  skin: string;
  symbol: string;
  motif: string;
};

const themes: Record<string, Theme> = {
  "seollin-saju": {
    bg1: "#111b3d",
    bg2: "#516c9f",
    accent: "#f5d78c",
    accent2: "#e9eefb",
    ink: "#1b1740",
    robe: "#243b67",
    hair: "#201821",
    skin: "#ffe3cd",
    symbol: "命",
    motif: "명리서고",
  },
  "yeseong-ziwei": {
    bg1: "#24153f",
    bg2: "#7d5ac5",
    accent: "#f4d37e",
    accent2: "#efe5ff",
    ink: "#2d1747",
    robe: "#5a3d94",
    hair: "#211426",
    skin: "#ffe1cc",
    symbol: "星",
    motif: "북두칠성",
  },
  "yeonhwa-love": {
    bg1: "#6e2b48",
    bg2: "#ef9fb0",
    accent: "#fff0a8",
    accent2: "#fff3f5",
    ink: "#5a1f36",
    robe: "#cc6b83",
    hair: "#3a2024",
    skin: "#ffe2d2",
    symbol: "緣",
    motif: "연화정원",
  },
  "seoyun-tarot": {
    bg1: "#1d1434",
    bg2: "#7b4fb5",
    accent: "#f7c96a",
    accent2: "#efe7ff",
    ink: "#271143",
    robe: "#412161",
    hair: "#18111f",
    skin: "#ffe0cc",
    symbol: "塔",
    motif: "타로의 방",
  },
  "wolha-shinjeom": {
    bg1: "#5b1724",
    bg2: "#e4b085",
    accent: "#ffe39c",
    accent2: "#fff7ea",
    ink: "#4a1420",
    robe: "#b63e43",
    hair: "#1d1518",
    skin: "#ffe2cf",
    symbol: "靈",
    motif: "월하신당",
  },
  "harin-name": {
    bg1: "#5c513c",
    bg2: "#d7c49c",
    accent: "#f6e2a6",
    accent2: "#fff9e8",
    ink: "#3e3323",
    robe: "#8c7a56",
    hair: "#241b18",
    skin: "#ffe4d0",
    symbol: "名",
    motif: "한지서실",
  },
  "dohyun-money": {
    bg1: "#4b2a13",
    bg2: "#c59243",
    accent: "#ffe083",
    accent2: "#fff4cb",
    ink: "#44230e",
    robe: "#8b5a25",
    hair: "#1d1712",
    skin: "#ffe0c8",
    symbol: "財",
    motif: "금룡부적",
  },
  "sia-today": {
    bg1: "#0f1934",
    bg2: "#365789",
    accent: "#f5d67a",
    accent2: "#e9f2ff",
    ink: "#152044",
    robe: "#355d86",
    hair: "#1b1720",
    skin: "#ffe1ce",
    symbol: "日",
    motif: "새벽달빛",
  },
};

function getTheme(product: Product) {
  return themes[product.slug] ?? themes["seollin-saju"];
}

function splitTitle(title: string) {
  if (title.includes("의 ")) {
    const [advisor, service] = title.split("의 ");
    return { advisor: `${advisor}의`, service };
  }
  const parts = title.split(" ");
  return { advisor: parts.slice(0, -1).join(" "), service: parts.at(-1) ?? title };
}

function Stars({ count = 34 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const x = (i * 73) % 1000;
        const y = (i * 137) % 1500;
        const r = i % 5 === 0 ? 2.6 : 1.2;
        return <circle key={i} cx={x} cy={y} r={r} fill="rgba(255,255,255,.78)" />;
      })}
    </>
  );
}

function Blossom({ x, y, scale = 1, color }: { x: number; y: number; scale?: number; color: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} opacity="0.9">
      <circle r="4" fill={color} />
      <ellipse rx="5" ry="11" transform="rotate(0) translate(0 -11)" fill={color} />
      <ellipse rx="5" ry="11" transform="rotate(72) translate(0 -11)" fill={color} />
      <ellipse rx="5" ry="11" transform="rotate(144) translate(0 -11)" fill={color} />
      <ellipse rx="5" ry="11" transform="rotate(216) translate(0 -11)" fill={color} />
      <ellipse rx="5" ry="11" transform="rotate(288) translate(0 -11)" fill={color} />
    </g>
  );
}

function Character({ theme, couple = false }: { theme: Theme; couple?: boolean }) {
  const second = couple;

  return (
    <g>
      {second && (
        <g transform="translate(-150 40) scale(.94)" opacity=".96">
          <path d="M475 760 C455 620 468 510 528 455 C575 510 588 620 568 760 Z" fill="#273455" />
          <path d="M443 754 L610 754 L572 510 L512 485 L465 520 Z" fill="#273455" />
          <circle cx="520" cy="410" r="58" fill={theme.skin} />
          <path d="M465 402 C470 330 555 318 586 372 C575 344 548 322 512 325 C474 329 452 365 465 402 Z" fill={theme.hair} />
          <path d="M463 395 C493 356 536 348 585 386 C572 326 492 299 460 356 C449 374 451 390 463 395 Z" fill={theme.hair} />
          <path d="M485 426 Q520 448 555 426" stroke="#8f5145" strokeWidth="4" fill="none" strokeLinecap="round" />
        </g>
      )}
      <g transform={second ? "translate(110 0)" : "translate(0 0)"}>
        <path d="M500 780 C463 650 475 520 555 450 C635 520 647 650 610 780 Z" fill={theme.robe} />
        <path d="M398 790 L712 790 L646 522 L557 472 L468 522 Z" fill={theme.robe} />
        <path d="M468 522 L558 650 L646 522" fill="none" stroke="#f7dfaa" strokeWidth="8" opacity=".9" />
        <path d="M405 730 C495 678 605 678 706 730" fill="none" stroke="rgba(255,255,255,.45)" strokeWidth="6" />
        <circle cx="557" cy="405" r="74" fill={theme.skin} />
        <path d="M482 406 C490 310 608 292 650 368 C637 327 598 290 545 297 C493 303 462 352 482 406 Z" fill={theme.hair} />
        <path d="M479 392 C520 338 584 333 653 386 C636 297 515 260 475 340 C456 374 462 390 479 392 Z" fill={theme.hair} />
        <path d="M512 424 Q557 454 602 424" stroke="#8f5145" strokeWidth="5" fill="none" strokeLinecap="round" />
        <circle cx="525" cy="398" r="5" fill="#2c2030" />
        <circle cx="589" cy="398" r="5" fill="#2c2030" />
        <path d="M545 430 Q557 438 571 430" stroke="#c88770" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M470 502 C420 540 390 600 383 682" stroke="#f7dfaa" strokeWidth="10" fill="none" strokeLinecap="round" />
        <path d="M644 502 C694 540 724 600 731 682" stroke="#f7dfaa" strokeWidth="10" fill="none" strokeLinecap="round" />
      </g>
    </g>
  );
}

function ForegroundObjects({ product, theme, size }: { product: Product; theme: Theme; size: ArtworkSize }) {
  const isTarot = product.slug.includes("tarot");
  const isMoney = product.slug.includes("money");
  const isName = product.slug.includes("name");
  const isLove = product.slug.includes("love");

  if (isTarot) {
    return (
      <g opacity=".95">
        {[0, 1, 2].map((n) => (
          <g key={n} transform={`translate(${310 + n * 72} ${size === "hero" ? 730 : 1020}) rotate(${-10 + n * 8})`}>
            <rect x="0" y="0" width="58" height="90" rx="8" fill="#161026" stroke={theme.accent} strokeWidth="3" />
            <circle cx="29" cy="32" r="12" fill={theme.accent} opacity=".85" />
            <path d="M18 63 Q29 48 40 63" stroke={theme.accent} strokeWidth="3" fill="none" />
          </g>
        ))}
      </g>
    );
  }

  if (isName) {
    return (
      <g opacity=".95">
        <rect x="230" y={size === "hero" ? 720 : 1000} width="300" height="95" rx="14" fill="rgba(255,255,255,.72)" />
        <path d="M250 1060 C330 1035 410 1035 500 1060" stroke={theme.ink} strokeWidth="9" fill="none" strokeLinecap="round" />
        <path d="M520 970 L590 1085" stroke={theme.ink} strokeWidth="12" strokeLinecap="round" />
      </g>
    );
  }

  if (isMoney) {
    return (
      <g opacity=".95">
        <path d="M250 980 C340 900 440 900 530 980 C440 940 340 940 250 980 Z" fill="none" stroke={theme.accent} strokeWidth="10" />
        <rect x="255" y="1020" width="92" height="128" rx="12" fill="rgba(255,224,131,.85)" stroke="#fff6cc" strokeWidth="4" />
        <text x="301" y="1097" textAnchor="middle" fontSize="52" fontWeight="900" fill={theme.ink}>財</text>
      </g>
    );
  }

  if (isLove) {
    return (
      <g opacity=".9">
        <path d="M330 980 C300 935 238 940 238 1002 C238 1064 330 1110 330 1110 C330 1110 422 1064 422 1002 C422 940 360 935 330 980 Z" fill="rgba(255,240,248,.85)" stroke="#ffffff" strokeWidth="5" />
      </g>
    );
  }

  return (
    <g opacity=".9">
      <rect x="245" y={size === "hero" ? 720 : 1000} width="180" height="128" rx="16" fill="rgba(255,255,255,.55)" stroke="rgba(255,255,255,.75)" strokeWidth="3" />
      <text x="335" y={size === "hero" ? 802 : 1082} textAnchor="middle" fontSize="64" fontWeight="900" fill={theme.ink}>{theme.symbol}</text>
    </g>
  );
}

export function BookCoverArtwork({ product, locale }: { product: Product; locale: Locale }) {
  const theme = getTheme(product);
  const title = locale === "ko" ? product.title.ko : product.title.en;
  const { advisor, service } = splitTitle(title);
  const isCouple = product.slug.includes("love");

  return (
    <svg viewBox="0 0 800 1200" role="img" aria-label={title} className="h-full w-full">
      <defs>
        <linearGradient id={`${product.slug}-cover-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={theme.bg1} />
          <stop offset="100%" stopColor={theme.bg2} />
        </linearGradient>
        <radialGradient id={`${product.slug}-moon`} cx="72%" cy="14%" r="18%">
          <stop offset="0%" stopColor="#fff7c6" />
          <stop offset="100%" stopColor="#fff7c6" stopOpacity="0" />
        </radialGradient>
        <filter id={`${product.slug}-soft`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>
      <rect width="800" height="1200" rx="44" fill={`url(#${product.slug}-cover-bg)`} />
      <rect x="30" y="30" width="740" height="1140" rx="34" fill="none" stroke="rgba(255,255,255,.52)" strokeWidth="3" />
      <rect x="48" y="48" width="704" height="1104" rx="28" fill="none" stroke={theme.accent} strokeOpacity=".45" strokeWidth="2" />
      <circle cx="628" cy="142" r="78" fill={`url(#${product.slug}-moon)`} />
      <circle cx="640" cy="130" r="52" fill="#fff3b0" opacity=".95" />
      <Stars />
      <path d="M80 760 C210 682 308 675 395 720 C485 765 575 725 720 650" stroke="rgba(255,255,255,.22)" strokeWidth="6" fill="none" />
      <path d="M74 820 C230 742 350 750 460 800 C560 845 640 800 728 750" stroke="rgba(255,255,255,.16)" strokeWidth="5" fill="none" />
      <Blossom x={124} y={205} scale={1.35} color={theme.accent2} />
      <Blossom x={690} y={330} scale={.95} color={theme.accent2} />
      <Character theme={theme} couple={isCouple} />
      <ForegroundObjects product={product} theme={theme} size="cover" />
      <g>
        <rect x="86" y="94" width="310" height="88" rx="18" fill="rgba(255,255,255,.12)" />
        <text x="112" y="145" fontSize="30" fontWeight="700" fill={theme.accent}>{locale === "ko" ? "천기누설" : "CHEONGI"}</text>
      </g>
      <g filter={`url(#${product.slug}-soft)`} opacity=".55">
        <rect x="90" y="812" width="620" height="240" rx="60" fill="#000" />
      </g>
      <g>
        <text x="400" y="888" textAnchor="middle" fontSize="42" fontWeight="800" fill="rgba(255,255,255,.88)">{advisor}</text>
        <text x="400" y="974" textAnchor="middle" fontSize={service.length > 5 ? 74 : 88} fontWeight="900" fill="#fff" stroke={theme.accent} strokeWidth="1.5">{service}</text>
        <text x="400" y="1090" textAnchor="middle" fontSize="24" fontWeight="700" fill="rgba(255,255,255,.62)">{theme.motif}</text>
      </g>
    </svg>
  );
}

export function HeroArtwork({ product, locale }: { product: Product; locale: Locale }) {
  const theme = getTheme(product);
  const title = locale === "ko" ? product.title.ko : product.title.en;
  const { advisor, service } = splitTitle(title);
  const isCouple = product.slug.includes("love");

  return (
    <svg viewBox="0 0 1600 900" role="img" aria-label={title} className="h-full w-full">
      <defs>
        <linearGradient id={`${product.slug}-hero-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={theme.bg1} />
          <stop offset="100%" stopColor={theme.bg2} />
        </linearGradient>
        <radialGradient id={`${product.slug}-hero-glow`} cx="78%" cy="28%" r="28%">
          <stop offset="0%" stopColor={theme.accent} stopOpacity=".72" />
          <stop offset="100%" stopColor={theme.accent} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1600" height="900" fill={`url(#${product.slug}-hero-bg)`} />
      <rect width="1600" height="900" fill={`url(#${product.slug}-hero-glow)`} />
      <Stars count={54} />
      <circle cx="1285" cy="155" r="70" fill="#fff0ad" opacity=".95" />
      <path d="M0 660 C250 560 420 588 600 650 C810 722 1040 624 1600 520 L1600 900 L0 900 Z" fill="rgba(255,255,255,.10)" />
      <path d="M0 735 C310 620 560 650 760 720 C960 792 1190 712 1600 610" stroke="rgba(255,255,255,.20)" strokeWidth="7" fill="none" />
      <g transform="translate(660 -155) scale(.9)">
        <Character theme={theme} couple={isCouple} />
        <ForegroundObjects product={product} theme={theme} size="hero" />
      </g>
      <Blossom x={1160} y={260} scale={1.1} color={theme.accent2} />
      <Blossom x={1420} y={410} scale={.9} color={theme.accent2} />
      <g transform="translate(105 160)">
        <text x="0" y="0" fontSize="28" fontWeight="800" letterSpacing="12" fill={theme.accent}>{locale === "ko" ? "천기누설" : "CHEONGI"}</text>
        <text x="0" y="86" fontSize="56" fontWeight="800" fill="rgba(255,255,255,.86)">{advisor}</text>
        <text x="0" y="190" fontSize={service.length > 5 ? 88 : 108} fontWeight="900" fill="#fff" stroke={theme.accent} strokeWidth="1.5">{service}</text>
        <path d="M0 230 L470 230" stroke={theme.accent} strokeWidth="3" opacity=".65" />
        <text x="0" y="292" fontSize="30" fontWeight="700" fill="rgba(255,255,255,.74)">{theme.motif}</text>
      </g>
    </svg>
  );
}
