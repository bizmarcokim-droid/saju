// ─────────────────────────────────────────────────────────────
// 사주 / 궁합 / 작명 공용 입력 폼
//   mode="saju"   → 본인 정보만
//   mode="couple" → 본인 + 상대방
//   mode="naming" → 본인 정보(이름칸이 '성씨')
// 제출하면 결과를 저장하고 결과 페이지로 이동합니다.
// ─────────────────────────────────────────────────────────────
"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { saveRecord, setCurrentId } from "@/lib/storage";
import { SIJIN, sijinOptionLabel } from "@/lib/sijin";
import type { Gender, PersonInput, Locale, ReadingRecord, InputType } from "@/types";

function emptyPerson(): PersonInput {
  return { name: "", gender: "", birthDate: "", birthTime: "" };
}

function PersonFields({
  value,
  onChange,
  t,
  locale,
  nameKey,
}: {
  value: PersonInput;
  onChange: (next: PersonInput) => void;
  t: (key: string) => string;
  locale: Locale;
  nameKey: "nameLabel" | "surnameLabel";
}) {
  const set = (patch: Partial<PersonInput>) => onChange({ ...value, ...patch });
  const genders: Gender[] = ["male", "female"];
  const placeholderKey = nameKey === "surnameLabel" ? "surnamePlaceholder" : "namePlaceholder";

  return (
    <div className="flex flex-col gap-3">
      <div>
        <label className="text-sm font-semibold text-ink">{t(nameKey)}</label>
        <input
          type="text"
          value={value.name}
          onChange={(e) => set({ name: e.target.value })}
          placeholder={t(placeholderKey)}
          className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 text-ink"
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-ink">{t("genderLabel")}</label>
        <div className="mt-1 grid grid-cols-2 gap-2">
          {genders.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => set({ gender: g })}
              className={
                "rounded-xl border py-2 text-sm font-medium transition " +
                (value.gender === g
                  ? "border-night bg-night text-moongold"
                  : "border-black/10 bg-white text-ink/70")
              }
            >
              {t(g)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold text-ink">{t("birthLabel")}</label>
        <input
          type="date"
          value={value.birthDate}
          onChange={(e) => set({ birthDate: e.target.value })}
          className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 text-ink"
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-ink">{t("timeLabel")}</label>
        <select
          value={value.birthTime}
          onChange={(e) => set({ birthTime: e.target.value })}
          className="mt-1 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-ink"
        >
          <option value="">{t("timeUnknown")}</option>
          {SIJIN.map((s) => (
            <option key={s.ko} value={s.time}>
              {sijinOptionLabel(s, locale)}
            </option>
          ))}
        </select>
        <p className="mt-1 text-xs text-ink/40">{t("timeHint")}</p>
      </div>
    </div>
  );
}

export default function FortuneForm({
  productSlug,
  mode,
}: {
  productSlug: string;
  mode: InputType; // "saju" | "couple" | "naming"
}) {
  const t = useTranslations("fortune");
  const locale = useLocale() as Locale;
  const router = useRouter();

  const isCouple = mode === "couple";
  const isNaming = mode === "naming";
  const mainNameKey = isNaming ? "surnameLabel" : "nameLabel";

  const [person, setPerson] = useState<PersonInput>(emptyPerson());
  const [partner, setPartner] = useState<PersonInput>(emptyPerson());
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const valid = (p: PersonInput) => p.name && p.gender && p.birthDate;

  async function handleSubmit() {
    if (!valid(person) || (isCouple && !valid(partner))) {
      setError(t("needRequired"));
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/fortune", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productSlug, locale, person, partner: isCouple ? partner : undefined }),
      });
      const data = await res.json();
      if (data.error) {
        setError(String(data.error));
        return;
      }
      const id = [productSlug, person.name, person.birthDate, partner.name, partner.birthDate]
        .filter(Boolean)
        .join("__");
      const record: ReadingRecord = {
        id,
        slug: productSlug,
        locale,
        inputType: mode,
        person,
        partner: isCouple ? partner : undefined,
        saju: data.saju,
        partnerSaju: data.partnerSaju,
        reading: data.reading,
        aiGenerated: data.aiGenerated,
        createdAt: new Date().toISOString(),
      };
      saveRecord(record);
      setCurrentId(id);
      router.push(`/fortune/${productSlug}/result`);
    } catch {
      setError(locale === "ko" ? "네트워크 오류가 발생했어요." : "Network error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-5 flex flex-col gap-4">
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        {isCouple && <h2 className="mb-3 text-sm font-bold text-night">{t("yourInfo")}</h2>}
        {isNaming && <h2 className="mb-3 text-sm font-bold text-night">{t("namingInfo")}</h2>}
        <PersonFields value={person} onChange={setPerson} t={t} locale={locale} nameKey={mainNameKey} />
      </div>

      {isCouple && (
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-sm font-bold text-night">{t("partnerInfo")}</h2>
          <PersonFields value={partner} onChange={setPartner} t={t} locale={locale} nameKey="nameLabel" />
        </div>
      )}

      {error && <p className="text-center text-sm text-red-500">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full rounded-xl bg-night py-3 font-bold text-moongold transition active:scale-95 disabled:opacity-60"
      >
        {loading ? t("loading") : t("submit")}
      </button>
    </div>
  );
}
