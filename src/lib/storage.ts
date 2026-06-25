// ─────────────────────────────────────────────────────────────
// 보관함 저장소 (브라우저 저장소 사용)
//
// localStorage: 본 운세를 영구 저장 (보관함 목록)
// sessionStorage: "방금 본 결과"를 결과 페이지로 잠깐 넘기는 용도 (탭 닫으면 사라짐)
//
// ⚠️ 이 기기 브라우저에만 남습니다. 진짜 서비스는 로그인 + 서버 DB로 가야 합니다.
// ─────────────────────────────────────────────────────────────
import type { ReadingRecord } from "@/types";

const KEY = "saju_library";
const CURRENT_KEY = "saju_current_id";

// 저장된 결과 전체 목록
export function getRecords(): ReadingRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as ReadingRecord[]) : [];
  } catch {
    return [];
  }
}

// id로 하나 찾기
export function getRecord(id: string): ReadingRecord | undefined {
  return getRecords().find((r) => r.id === id);
}

// 결과 하나 저장 (같은 id 면 최신으로 교체하고 맨 앞으로)
export function saveRecord(record: ReadingRecord): void {
  if (typeof window === "undefined") return;
  const list = getRecords().filter((r) => r.id !== record.id);
  list.unshift(record);
  window.localStorage.setItem(KEY, JSON.stringify(list));
}

export function removeRecord(id: string): void {
  if (typeof window === "undefined") return;
  const list = getRecords().filter((r) => r.id !== id);
  window.localStorage.setItem(KEY, JSON.stringify(list));
}

export function clearRecords(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}

// "방금 본 결과" 핸드오프 (결과 페이지가 어떤 결과를 보여줄지)
export function setCurrentId(id: string): void {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(CURRENT_KEY, id);
}

export function getCurrentId(): string | null {
  if (typeof window === "undefined") return null;
  return window.sessionStorage.getItem(CURRENT_KEY);
}
