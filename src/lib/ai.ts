// ─────────────────────────────────────────────────────────────
// AI 풀이 생성 (★ 입력 타입별로 다른 프롬프트를 만들어 Claude에게 보냄)
//
// 키는 .env 의 ANTHROPIC_API_KEY, 모델은 AI_MODEL (기본 claude-sonnet-4-6).
// ⚠️ 서버 전용.
// ─────────────────────────────────────────────────────────────
import Anthropic from "@anthropic-ai/sdk";
import { t } from "@/lib/data";
import { cardName, positionName, orientationName } from "@/lib/tarot";
import type { SajuResult, Product, Locale, PersonInput, DrawnCard } from "@/types";

const MODEL = process.env.AI_MODEL || "claude-sonnet-4-6";

export function isAiConfigured(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

function genderText(g: PersonInput["gender"], locale: Locale): string {
  if (g === "male") return locale === "ko" ? "남성" : "male";
  if (g === "female") return locale === "ko" ? "여성" : "female";
  return locale === "ko" ? "미입력" : "n/a";
}

function describePerson(label: string, person: PersonInput, saju: SajuResult, locale: Locale): string {
  const p = saju.pillars;
  const el = (Object.keys(saju.elements) as (keyof typeof saju.elements)[])
    .map((k) => `${k} ${saju.elements[k]}`)
    .join(", ");
  return [
    `${label}: ${person.name || "?"} (${genderText(person.gender, locale)})`,
    `  사주: 연 ${p.year} / 월 ${p.month} / 일 ${p.day} / 시 ${p.hour}`,
    `  일간: ${saju.dayMaster.stem} (${saju.dayMaster.element}) · 오행: ${el}`,
    saju.hasHour ? "" : "  (시각 미입력 — 시주 제외)",
  ]
    .filter(Boolean)
    .join("\n");
}

const SYSTEM = {
  saju: {
    ko: "당신은 따뜻하고 통찰력 있는 사주 명리 상담가입니다. 전통 명리학에 근거하되 운명을 단정 짓지 않고 자기 이해를 돕는 조언으로 풀이합니다. 이름을 자연스럽게 부르고, 의료·법률·재정 단정은 피하며 가벼운 격려로 마무리하세요.",
    en: "You are a warm, insightful Korean Saju counselor. Ground readings in traditional myeongli but never speak in absolutes about fate. Address the person by name, avoid definitive medical/legal/financial claims, end with gentle encouragement.",
  },
  naming: {
    ko: "당신은 작명 전문가입니다. 아기의 사주 오행 균형을 보완하는 이름을 제안합니다. 성씨에 어울리는 이름 3~4개를 추천하고, 각 이름의 한글·의미·왜 이 사주에 좋은지를 간단히 설명하세요. 한자는 선택적으로 덧붙여도 됩니다.",
    en: "You are a Korean naming expert. Suggest given names that balance the child's Saju element distribution. Propose 3–4 names that fit the surname, each with the name, its meaning, and why it suits this chart.",
  },
  tarot: {
    ko: "당신은 따뜻하고 직관적인 타로 리더입니다. 뽑힌 카드(자리·정역방향)와 질문을 종합해 풀이합니다. 운명을 단정 짓지 않고, 각 카드의 의미를 질문과 연결해 4~6문단으로 부드럽게 해석하고 가벼운 조언으로 마무리하세요.",
    en: "You are a warm, intuitive tarot reader. Interpret the drawn cards (position, orientation) in light of the question. Avoid absolutes; connect each card's meaning to the question across 4–6 gentle paragraphs, ending with light guidance.",
  },
};

async function call(system: string, userMsg: string): Promise<string> {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const res = await client.messages.create({
    model: MODEL,
    max_tokens: 1400,
    system,
    messages: [{ role: "user", content: userMsg }],
  });
  return res.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("\n")
    .trim();
}

type GenArgs =
  | { kind: "saju"; product: Product; locale: Locale; person: PersonInput; saju: SajuResult }
  | { kind: "couple"; product: Product; locale: Locale; person: PersonInput; saju: SajuResult; partner: PersonInput; partnerSaju: SajuResult }
  | { kind: "naming"; product: Product; locale: Locale; person: PersonInput; saju: SajuResult }
  | { kind: "tarot"; product: Product; locale: Locale; question: string; cards: DrawnCard[] };

export async function generateReading(args: GenArgs): Promise<string> {
  const { product, locale } = args;
  const title = t(product.title, locale);
  const lang = locale === "ko" ? "한국어" : "English";

  if (args.kind === "couple") {
    const msg = [
      `주제: ${title} (궁합/인연)`,
      "",
      describePerson(locale === "ko" ? "본인" : "Person", args.person, args.saju, locale),
      "",
      describePerson(locale === "ko" ? "상대방" : "Partner", args.partner, args.partnerSaju, locale),
      "",
      `두 사람의 일간과 오행이 서로를 어떻게 보완·상충하는지 중심으로 ${lang}로 궁합을 풀이하세요. 4~6개의 짧은 문단.`,
    ].join("\n");
    return call(SYSTEM.saju[locale], msg);
  }

  if (args.kind === "naming") {
    const msg = [
      `주제: ${title} (작명)`,
      `성씨: ${args.person.name || "?"} · 성별: ${genderText(args.person.gender, locale)}`,
      describePerson(locale === "ko" ? "아기 사주" : "Child's chart", args.person, args.saju, locale),
      "",
      `위 사주의 오행 균형을 보완하는 이름을 성씨 '${args.person.name}'에 어울리게 ${lang}로 3~4개 추천하세요. 각 이름마다 의미와 이 사주에 좋은 이유를 한두 줄로.`,
    ].join("\n");
    return call(SYSTEM.naming[locale], msg);
  }

  if (args.kind === "tarot") {
    const cardLines = args.cards
      .map(
        (c) =>
          `- ${positionName(c, locale)}: ${cardName(c, locale)} (${c.cardEn}) [${orientationName(c, locale)}]`
      )
      .join("\n");
    const msg = [
      `주제: ${title} (타로)`,
      `질문: ${args.question || (locale === "ko" ? "(질문 없음 — 전반 운세)" : "(no question — general)")}`,
      "뽑은 카드:",
      cardLines,
      "",
      `위 카드를 질문과 연결해 ${lang}로 풀이하세요. 각 카드의 자리(과거/현재/미래)와 정·역방향을 반영해 4~6개의 짧은 문단으로.`,
    ].join("\n");
    return call(SYSTEM.tarot[locale], msg);
  }

  // kind === "saju"
  const msg = [
    `주제: ${title}`,
    describePerson(locale === "ko" ? "본인" : "Person", args.person, args.saju, locale),
    "",
    `위 사주를 '${title}' 주제에 맞춰 ${lang}로 풀이하세요. 일간과 오행 균형 중심, 4~6개의 짧은 문단.`,
  ].join("\n");
  return call(SYSTEM.saju[locale], msg);
}
