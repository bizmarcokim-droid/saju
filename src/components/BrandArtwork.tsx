import type { Product, Locale } from "@/types";

type Theme = {
  bg1: string;
  bg2: string;
  bg3: string;
  accent: string;
  light: string;
  ink: string;
  robe: string;
  robe2: string;
  hair: string;
  skin: string;
  lip: string;
  symbol: string;
  motif: string;
  gender: "woman" | "man" | "couple";
  prop: "book" | "stars" | "lotus" | "tarot" | "shrine" | "brush" | "gold" | "moon";
};

const themes: Record<string, Theme> = {
  "seollin-saju": {
    bg1: "#10183a",
    bg2: "#263d73",
    bg3: "#7f99c8",
    accent: "#f6d37b",
    light: "#f3f7ff",
    ink: "#161b3c",
    robe: "#1d315d",
    robe2: "#314e86",
    hair: "#181622",
    skin: "#ffe1cf",
    lip: "#b45b64",
    symbol: "命",
    motif: "명리서고",
    gender: "woman",
    prop: "book",
  },
  "yeseong-ziwei": {
    bg1: "#1f123d",
    bg2: "#4d2d83",
    bg3: "#9d7de6",
    accent: "#efd17b",
    light: "#f3eaff",
    ink: "#251246",
    robe: "#4f2b86",
    robe2: "#7357be",
    hair: "#1a1322",
    skin: "#ffe0cf",
    lip: "#b15b82",
    symbol: "星",
    motif: "북두칠성",
    gender: "woman",
    prop: "stars",
  },
  "yeonhwa-love": {
    bg1: "#702542",
    bg2: "#c76582",
    bg3: "#ffc4cb",
    accent: "#ffeaa5",
    light: "#fff3f6",
    ink: "#571d35",
    robe: "#c75b78",
    robe2: "#f09bad",
    hair: "#352025",
    skin: "#ffe1d2",
    lip: "#c65377",
    symbol: "緣",
    motif: "연화정원",
    gender: "couple",
    prop: "lotus",
  },
  "seoyun-tarot": {
    bg1: "#171029",
    bg2: "#43246c",
    bg3: "#8a5bd4",
    accent: "#f7c866",
    light: "#f0e7ff",
    ink: "#211039",
    robe: "#32164d",
    robe2: "#684198",
    hair: "#14101d",
    skin: "#ffe0cd",
    lip: "#b25c79",
    symbol: "塔",
    motif: "타로의 방",
    gender: "woman",
    prop: "tarot",
  },
  "wolha-shinjeom": {
    bg1: "#561423",
    bg2: "#a13d42",
    bg3: "#eec39a",
    accent: "#ffe19b",
    light: "#fff5e7",
    ink: "#40121d",
    robe: "#b83c43",
    robe2: "#fff1df",
    hair: "#171116",
    skin: "#ffe2cf",
    lip: "#b43d52",
    symbol: "靈",
    motif: "월하신당",
    gender: "woman",
    prop: "shrine",
  },
  "harin-name": {
    bg1: "#4f4636",
    bg2: "#9f8e68",
    bg3: "#e8d8af",
    accent: "#f8dfa0",
    light: "#fff7e5",
    ink: "#352c22",
    robe: "#776647",
    robe2: "#cbb98e",
    hair: "#201815",
    skin: "#ffe3cf",
    lip: "#a65a55",
    symbol: "名",
    motif: "한지서실",
    gender: "woman",
    prop: "brush",
  },
  "dohyun-money": {
    bg1: "#3f250e",
    bg2: "#8a5a22",
    bg3: "#d6a94e",
    accent: "#ffe083",
    light: "#fff3c9",
    ink: "#3d210b",
    robe: "#624017",
    robe2: "#b68234",
    hair: "#17120e",
    skin: "#ffe0c8",
    lip: "#9a4d42",
    symbol: "財",
    motif: "금룡부적",
    gender: "man",
    prop: "gold",
  },
  "sia-today": {
    bg1: "#0e1733",
    bg2: "#263f70",
    bg3: "#6a91c5",
    accent: "#f4d575",
    light: "#eaf3ff",
    ink: "#14203f",
    robe: "#2f557f",
    robe2: "#86a8d0",
    hair: "#171721",
    skin: "#ffe1ce",
    lip: "#ac5e69",
    symbol: "日",
    motif: "새벽달빛",
    gender: "woman",
    prop: "moon",
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

function Stars({ width = 800, height = 1200, count = 42 }: { width?: number; height?: number; count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const cx = (i * 97 + 37) % width;
        const cy = (i * 151 + 61) % height;
        const r = i % 9 === 0 ? 2.8 : i % 4 === 0 ? 1.8 : 1.1;
        return <circle key={i} cx={cx} cy={cy} r={r} fill="rgba(255,255,255,.72)" />;
      })}
    </>
  );
}

function Petals({ width = 800, height = 1200, tint = "#fff" }: { width?: number; height?: number; tint?: string }) {
  return (
    <>
      {Array.from({ length: 16 }).map((_, i) => {
        const x = (i * 137 + 40) % width;
        const y = (i * 211 + 80) % height;
        return <ellipse key={i} cx={x} cy={y} rx="7" ry="15" fill={tint} opacity=".38" transform={`rotate(${(i * 37) % 180} ${x} ${y})`} />;
      })}
    </>
  );
}

function BackgroundArchitecture({ theme, hero = false }: { theme: Theme; hero?: boolean }) {
  const scale = hero ? 1.55 : 1;
  return (
    <g opacity=".26" transform={`scale(${scale})`}>
      <path d="M45 392 L220 268 L396 392 Z" fill="rgba(255,255,255,.32)" />
      <rect x="75" y="392" width="292" height="220" rx="12" fill="rgba(255,255,255,.13)" />
      <path d="M40 410 C145 355 265 355 405 410" stroke={theme.accent} strokeWidth="10" fill="none" strokeLinecap="round" />
      <path d="M515 450 C610 390 675 390 760 450" stroke="rgba(255,255,255,.26)" strokeWidth="8" fill="none" strokeLinecap="round" />
      <rect x="555" y="448" width="160" height="154" rx="12" fill="rgba(255,255,255,.10)" />
    </g>
  );
}

function Face({ theme, man = false }: { theme: Theme; man?: boolean }) {
  return (
    <g>
      <ellipse cx="0" cy="0" rx={man ? 76 : 72} ry={man ? 86 : 82} fill={theme.skin} />
      <path d={man ? "M-72 -12 C-84 -82 -15 -126 55 -96 C82 -80 94 -40 78 4 C36 -44 -22 -47 -72 -12 Z" : "M-82 -6 C-92 -96 -6 -132 64 -96 C94 -74 102 -24 76 22 C32 -48 -31 -52 -82 -6 Z"} fill={theme.hair} />
      <path d={man ? "M-58 -12 C-25 -46 27 -46 70 -8" : "M-68 -15 C-24 -62 40 -55 82 -4"} stroke={theme.hair} strokeWidth="24" fill="none" strokeLinecap="round" />
      <path d="M-34 -7 C-18 -18 -2 -18 13 -8" stroke="#37273a" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M32 -8 C48 -18 64 -16 78 -5" stroke="#37273a" strokeWidth="5" fill="none" strokeLinecap="round" />
      <circle cx="-10" cy="5" r="4" fill="#1f1a24" />
      <circle cx="55" cy="5" r="4" fill="#1f1a24" />
      <path d="M16 37 Q27 44 42 36" stroke={theme.lip} strokeWidth="5" fill="none" strokeLinecap="round" />
      {!man && <path d="M-72 44 C-112 114 -104 205 -80 292" stroke={theme.hair} strokeWidth="28" fill="none" strokeLinecap="round" opacity=".92" />}
      {!man && <path d="M75 38 C118 120 105 215 82 300" stroke={theme.hair} strokeWidth="26" fill="none" strokeLinecap="round" opacity=".9" />}
    </g>
  );
}

function Character({ theme, x = 400, y = 640, scale = 1 }: { theme: Theme; x?: number; y?: number; scale?: number }) {
  const man = theme.gender === "man";
  const couple = theme.gender === "couple";
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      {couple && (
        <g transform="translate(-122 18) scale(.82)" opacity=".97">
          <path d="M-92 340 C-65 150 -44 82 0 38 C48 84 72 160 102 340 Z" fill="#253459" />
          <path d="M-145 358 L142 358 L92 110 L0 58 L-92 110 Z" fill="#27385f" />
          <path d="M-88 112 L0 238 L90 112" stroke="#f7dfaa" strokeWidth="8" fill="none" />
          <g transform="translate(0 0)"><Face theme={{ ...theme, hair: "#191720", robe: "#27385f" }} man /></g>
        </g>
      )}
      <g transform={couple ? "translate(88 -6)" : "translate(0 0)"}>
        <path d="M-105 360 C-70 165 -47 84 0 35 C48 85 73 165 110 360 Z" fill={theme.robe} />
        <path d="M-172 378 L174 378 L112 108 L0 50 L-112 108 Z" fill={theme.robe} />
        <path d="M-112 108 L0 254 L112 108" stroke={theme.accent} strokeWidth="8" fill="none" opacity=".94" />
        <path d="M-124 170 C-64 205 0 198 72 172" stroke={theme.robe2} strokeWidth="24" fill="none" strokeLinecap="round" opacity=".75" />
        <path d="M-168 378 C-75 325 70 325 170 378" stroke="rgba(255,255,255,.38)" strokeWidth="7" fill="none" />
        <Face theme={theme} man={man} />
        {!man && <circle cx="80" cy="-20" r="12" fill={theme.accent} />}
        {!man && <path d="M84 -32 C118 -52 136 -32 118 -5 C103 -24 94 -24 84 -32 Z" fill={theme.light} opacity=".85" />}
      </g>
    </g>
  );
}

function Props({ theme, cover = true }: { theme: Theme; cover?: boolean }) {
  const y = cover ? 955 : 710;
  if (theme.prop === "tarot") {
    return (
      <g opacity=".96">
        {[0, 1, 2, 3].map((n) => (
          <g key={n} transform={`translate(${250 + n * 70} ${y}) rotate(${-16 + n * 10})`}>
            <rect width="62" height="96" rx="8" fill="#151025" stroke={theme.accent} strokeWidth="3" />
            <circle cx="31" cy="32" r="13" fill={theme.accent} opacity=".86" />
            <path d="M18 68 Q31 50 44 68" stroke={theme.accent} strokeWidth="3" fill="none" />
          </g>
        ))}
      </g>
    );
  }
  if (theme.prop === "brush") {
    return (
      <g opacity=".94">
        <rect x="226" y={y - 12} width="330" height="102" rx="16" fill="rgba(255,255,255,.70)" />
        <path d={`M250 ${y + 56} C340 ${y + 18} 435 ${y + 18} 525 ${y + 58}`} stroke={theme.ink} strokeWidth="10" fill="none" strokeLinecap="round" />
        <path d={`M540 ${y - 45} L612 ${y + 95}`} stroke={theme.ink} strokeWidth="13" strokeLinecap="round" />
      </g>
    );
  }
  if (theme.prop === "gold") {
    return (
      <g opacity=".96">
        <path d={`M218 ${y + 20} C292 ${y - 82} 438 ${y - 78} 560 ${y + 14} C455 ${y - 20} 338 ${y - 16} 218 ${y + 20} Z`} fill="none" stroke={theme.accent} strokeWidth="12" />
        <rect x="280" y={y + 35} width="96" height="132" rx="12" fill={theme.accent} stroke="#fff6cc" strokeWidth="4" />
        <text x="328" y={y + 116} textAnchor="middle" fontSize="54" fontWeight="900" fill={theme.ink}>財</text>
      </g>
    );
  }
  if (theme.prop === "lotus") {
    return (
      <g opacity=".92">
        <path d={`M395 ${y + 58} C355 ${y} 282 ${y + 6} 282 ${y + 80} C282 ${y + 155} 395 ${y + 202} 395 ${y + 202} C395 ${y + 202} 508 ${y + 155} 508 ${y + 80} C508 ${y + 6} 435 ${y} 395 ${y + 58} Z`} fill="rgba(255,242,248,.86)" stroke="#fff" strokeWidth="5" />
      </g>
    );
  }
  return (
    <g opacity=".90">
      <rect x="248" y={y} width="188" height="132" rx="18" fill="rgba(255,255,255,.55)" stroke="rgba(255,255,255,.72)" strokeWidth="3" />
      <text x="342" y={y + 84} textAnchor="middle" fontSize="68" fontWeight="900" fill={theme.ink}>{theme.symbol}</text>
    </g>
  );
}

export function BookCoverArtwork({ product, locale }: { product: Product; locale: Locale }) {
  const theme = getTheme(product);
  const title = locale === "ko" ? product.title.ko : product.title.en;
  const { advisor, service } = splitTitle(title);
  return (
    <svg viewBox="0 0 800 1200" role="img" aria-label={title} className="h-full w-full">
      <defs>
        <linearGradient id={`${product.slug}-book-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={theme.bg1} />
          <stop offset="56%" stopColor={theme.bg2} />
          <stop offset="100%" stopColor={theme.bg3} />
        </linearGradient>
        <radialGradient id={`${product.slug}-book-glow`} cx="72%" cy="16%" r="34%">
          <stop offset="0%" stopColor={theme.accent} stopOpacity=".76" />
          <stop offset="100%" stopColor={theme.accent} stopOpacity="0" />
        </radialGradient>
        <filter id={`${product.slug}-blur`} x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="20" /></filter>
      </defs>
      <rect width="800" height="1200" rx="44" fill={`url(#${product.slug}-book-bg)`} />
      <rect width="800" height="1200" fill={`url(#${product.slug}-book-glow)`} />
      <BackgroundArchitecture theme={theme} />
      <Stars />
      <Petals tint={theme.light} />
      <circle cx="640" cy="130" r="56" fill="#fff2b3" opacity=".94" />
      <path d="M45 765 C208 665 325 696 430 760 C552 835 646 740 760 705" stroke="rgba(255,255,255,.20)" strokeWidth="7" fill="none" />
      <path d="M40 824 C210 742 345 760 470 820 C580 874 665 805 760 768" stroke="rgba(255,255,255,.15)" strokeWidth="5" fill="none" />
      <Character theme={theme} y={625} scale={1.12} />
      <Props theme={theme} />
      <rect x="32" y="32" width="736" height="1136" rx="34" fill="none" stroke="rgba(255,255,255,.56)" strokeWidth="3" />
      <rect x="52" y="52" width="696" height="1096" rx="28" fill="none" stroke={theme.accent} strokeOpacity=".58" strokeWidth="2" />
      <g>
        <rect x="86" y="92" width="286" height="82" rx="18" fill="rgba(0,0,0,.14)" />
        <text x="112" y="143" fontSize="30" fontWeight="800" fill={theme.accent}>{locale === "ko" ? "천기누설" : "CHEONGI"}</text>
      </g>
      <g filter={`url(#${product.slug}-blur)`} opacity=".52"><rect x="85" y="800" width="630" height="266" rx="64" fill="#000" /></g>
      <text x="400" y="872" textAnchor="middle" fontSize="42" fontWeight="900" fill="rgba(255,255,255,.88)">{advisor}</text>
      <text x="400" y="965" textAnchor="middle" fontSize={service.length > 5 ? 72 : 88} fontWeight="900" fill="#fff" stroke={theme.accent} strokeWidth="1.4">{service}</text>
      <path d="M258 1005 L542 1005" stroke={theme.accent} strokeWidth="3" opacity=".75" />
      <text x="400" y="1070" textAnchor="middle" fontSize="24" fontWeight="800" fill="rgba(255,255,255,.65)">{theme.motif}</text>
    </svg>
  );
}

export function HeroArtwork({ product, locale }: { product: Product; locale: Locale }) {
  const theme = getTheme(product);
  const title = locale === "ko" ? product.title.ko : product.title.en;
  return (
    <svg viewBox="0 0 1600 900" role="img" aria-label={title} className="h-full w-full">
      <defs>
        <linearGradient id={`${product.slug}-hero-bg2`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={theme.bg1} />
          <stop offset="58%" stopColor={theme.bg2} />
          <stop offset="100%" stopColor={theme.bg3} />
        </linearGradient>
        <radialGradient id={`${product.slug}-hero-light`} cx="78%" cy="23%" r="32%">
          <stop offset="0%" stopColor={theme.accent} stopOpacity=".72" />
          <stop offset="100%" stopColor={theme.accent} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1600" height="900" fill={`url(#${product.slug}-hero-bg2)`} />
      <rect width="1600" height="900" fill={`url(#${product.slug}-hero-light)`} />
      <Stars width={1600} height={900} count={68} />
      <Petals width={1600} height={900} tint={theme.light} />
      <BackgroundArchitecture theme={theme} hero />
      <circle cx="1295" cy="150" r="74" fill="#fff0ad" opacity=".94" />
      <path d="M0 655 C260 552 430 584 625 655 C850 737 1065 620 1600 525 L1600 900 L0 900 Z" fill="rgba(255,255,255,.10)" />
      <path d="M0 742 C325 628 558 660 782 728 C985 790 1210 716 1600 616" stroke="rgba(255,255,255,.20)" strokeWidth="7" fill="none" />
      <g transform="translate(515 -76) scale(1.18)">
        <Character theme={theme} y={610} scale={1.08} />
        <Props theme={theme} cover={false} />
      </g>
      <rect x="86" y="90" width="250" height="76" rx="20" fill="rgba(0,0,0,.15)" />
      <text x="112" y="139" fontSize="30" fontWeight="900" letterSpacing="10" fill={theme.accent}>{locale === "ko" ? "천기누설" : "CHEONGI"}</text>
    </svg>
  );
}
