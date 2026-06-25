// 오늘의 운세 페이지 → 주소: /ko/today, /en/today
import { setRequestLocale } from "next-intl/server";
import TodayFortune from "@/components/TodayFortune";

export default function TodayPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return <TodayFortune />;
}
