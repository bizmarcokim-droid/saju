// 검색 페이지 → 주소: /ko/search, /en/search
import { setRequestLocale } from "next-intl/server";
import SearchClient from "@/components/SearchClient";

export default function SearchPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return <SearchClient />;
}
