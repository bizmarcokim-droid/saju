// 운세 결과 페이지 → 주소: /ko/fortune/[slug]/result
// 결과는 브라우저 저장소에 있으므로 클라이언트 컴포넌트가 읽어서 보여줍니다.
import { setRequestLocale } from "next-intl/server";
import ResultClient from "@/components/ResultClient";

export default function ResultPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return <ResultClient />;
}
