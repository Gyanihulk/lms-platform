// lib/api.ts
import "server-only";
import { revalidateTag } from "next/cache";
import { cache } from "react";

export type PageBlock = { id: string; type: string; sortOrder: number; data: Record<string, any> };
export type PageData = {
  id: string; slug: string; title: string; createdAt: string; updatedAt: string; blocks: PageBlock[];
};

const INTERNAL_ORIGIN =
  process.env.INTERNAL_ORIGIN || process.env.CMS_URL || process.env.NEXT_PUBLIC_APP_URL;
const HOMEPAGE_API_PATH = process.env.HOMEPAGE_API_PATH ?? "/api/pages";
const DEFAULT_TIMEOUT_MS = Number(process.env.API_TIMEOUT_MS ?? 8000);
const HOME_TAG = "page:/";

async function fetchWithTimeout(url: string, init: RequestInit & { timeoutMs?: number } = {}) {
  const { timeoutMs = DEFAULT_TIMEOUT_MS, ...rest } = init;
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...rest, signal: controller.signal });
  } finally {
    clearTimeout(t);
  }
}

async function getPageDataRaw(slug: string): Promise<PageData> {
  if (!INTERNAL_ORIGIN) throw new Error("Missing INTERNAL_ORIGIN/CMS_URL/NEXT_PUBLIC_APP_URL");

  const url = `${INTERNAL_ORIGIN}${HOMEPAGE_API_PATH}${
    HOMEPAGE_API_PATH.includes("?") ? "&" : "?"
  }slug=${encodeURIComponent(slug)}`;

  const res = await fetchWithTimeout(url, {
    // ISR happens here; do NOT use 'no-store'
    next: { revalidate: 300, tags: [HOME_TAG] },
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error(`API ${res.status} ${res.statusText}`);

  const json = await res.json();
  const data = (json?.data ?? json) as PageData | undefined;
  if (!data || !Array.isArray(data.blocks)) throw new Error("Invalid API shape: missing blocks");

  data.blocks.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  return data;
}

// Per-request dedupe only (safe in Edge/Node). ISR still handled by fetch above.
export const getPageData = cache(async (slug: string): Promise<PageData | null> => {
  try {
    return await getPageDataRaw(slug);
  } catch (e) {
    console.error("[getPageData] failed:", e);
    return null;
  }
});

export function pickBlock<T = any>(page: PageData | null, type: string): T | null {
  const b = page?.blocks?.find((blk) => blk.type === type);
  return (b?.data as T) ?? null;
}

export function revalidateHome() {
  revalidateTag(HOME_TAG);
}

export const prewarmHome = (async () => {
  console.log("[prewarmHome] Starting home page prewarm...");
  try {
    const data = await getPageData("/");
    if (data) {
      console.log("[prewarmHome] Home page data cached successfully.");
    } else {
      console.warn("[prewarmHome] No data returned from getPageData.");
    }
  } catch (err) {
    console.error("[prewarmHome] Failed to prewarm home page data:", err);
  }
})();