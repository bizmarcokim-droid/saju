// ─────────────────────────────────────────────────────────────
// 운세 생성 API — 주소: POST /api/fortune
// 상품의 inputType(사주/궁합/작명/타로)에 따라 계산 방식과 AI 프롬프트가 달라집니다.
// 키 없으면 요약 폴백.
// ─────────────────────────────────────────────────────────────
import { NextResponse } from "next/server";
import { calculateSaju } from "@/lib/saju";
import { generateReading, isAiConfigured } from "@/lib/ai";
import { getProduct, t } from "@/lib/data";
import type { Locale, SajuResult, PersonInput, DrawnCard } from "@/types";

function sajuSummary(s: SajuResult, locale: Locale): string {
  const p = s.pillars;
  const el = (Object.keys(s.elements) as (keyof typeof s.elements)[])
    .map((k) => `${k}${s.elements[k]}`)
    .join(" ");
  return locale === "ko"
    ? `사주: ${p.year} ${p.month} ${p.day} ${p.hour} · 일간 ${s.dayMaster.stem}(${s.dayMaster.element}) · 오행 ${el}`
    : `Pillars: ${p.year} ${p.month} ${p.day} ${p.hour} · Day Master ${s.dayMaster.stem}(${s.dayMaster.element}) · ${el}`;
}

const noKeyNote = (locale: Locale) =>
  locale === "ko"
    ? "\n\n※ .env 에 ANTHROPIC_API_KEY 를 넣으면 AI가 풀이해 줍니다."
    : "\n\n* Add ANTHROPIC_API_KEY to .env for an AI reading.";

export async function POST(request: Request) {
  const body = await request.json();
  const { productSlug, locale = "ko", person, partner, question, cards } = body as {
    productSlug: string;
    locale: Locale;
    person?: PersonInput;
    partner?: PersonInput;
    question?: string;
    cards?: DrawnCard[];
  };

  const product = productSlug ? getProduct(productSlug) : undefined;
  if (!product) {
    return NextResponse.json({ error: "product not found" }, { status: 404 });
  }
  const title = t(product.title, locale);
  const type = product.inputType;

  // ── 입력 검증 (타입별) ──
  if (type === "tarot") {
    if (!cards || cards.length === 0) {
      return NextResponse.json({ error: "cards are required" }, { status: 400 });
    }
  } else {
    if (!person?.birthDate) {
      return NextResponse.json({ error: "person.birthDate is required" }, { status: 400 });
    }
    if (type === "couple" && !partner?.birthDate) {
      return NextResponse.json({ error: "partner info is required" }, { status: 400 });
    }
  }

  // ── 계산 ──
  let saju: SajuResult | undefined;
  let partnerSaju: SajuResult | undefined;
  if (type !== "tarot") {
    saju = calculateSaju(person!.birthDate, person!.birthTime);
    if (type === "couple") partnerSaju = calculateSaju(partner!.birthDate, partner!.birthTime);
  }

  // ── AI 풀이 (또는 폴백) ──
  let reading = "";
  let aiGenerated = false;

  if (isAiConfigured()) {
    try {
      if (type === "couple") {
        reading = await generateReading({ kind: "couple", product, locale, person: person!, saju: saju!, partner: partner!, partnerSaju: partnerSaju! });
      } else if (type === "naming") {
        reading = await generateReading({ kind: "naming", product, locale, person: person!, saju: saju! });
      } else if (type === "tarot") {
        reading = await generateReading({ kind: "tarot", product, locale, question: question || "", cards: cards! });
      } else {
        reading = await generateReading({ kind: "saju", product, locale, person: person!, saju: saju! });
      }
      aiGenerated = true;
    } catch (err) {
      console.error("AI generation failed:", err);
    }
  }

  // 폴백 (키 없음 또는 실패)
  if (!reading) {
    if (type === "tarot") {
      const lines = cards!.map((c) => `- ${c.position.split("|")[locale === "ko" ? 0 : 1] || c.position}: ${locale === "ko" ? c.cardKo : c.cardEn}${c.reversed ? (locale === "ko" ? " (역)" : " (rev)") : ""}`);
      reading = `[${title}]\n${question ? question + "\n" : ""}${lines.join("\n")}${noKeyNote(locale)}`;
    } else {
      const lines = [`[${title}]`, sajuSummary(saju!, locale)];
      if (partnerSaju) lines.push(locale === "ko" ? "[상대방] " + sajuSummary(partnerSaju, locale) : "[Partner] " + sajuSummary(partnerSaju, locale));
      reading = lines.join("\n") + noKeyNote(locale);
    }
  }

  return NextResponse.json({ saju, partnerSaju, reading, aiGenerated });
}
