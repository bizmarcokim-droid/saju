// 보관함 페이지 → 주소: /ko/library, /en/library
import { setRequestLocale } from "next-intl/server";
import LibraryClient from "@/components/LibraryClient";

export default function LibraryPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return <LibraryClient />;
}
