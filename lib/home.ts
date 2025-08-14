// lib/home.ts
import "server-only";
import { fetchWithTimeout } from "./fetchWithTimeout";

// If your data lives behind your own Next route, prefer calling the source directly instead
const HOME_DATA_URL = process.env.HOME_DATA_URL!; // e.g. your headless CMS URL

export type HomeData = {
  hero: { title: string; subtitle?: string };
  sections: Array<{ id: string; heading: string; body: string }>;
};

export async function getHomeData(): Promise<HomeData> {
  // Next's fetch supports cache & ISR when called in a Server Component / server file.
  // Revalidate every 5 minutes; adjust as needed.
  const res = await fetchWithTimeout(HOME_DATA_URL, {
    // Let Next cache the response on the server (no client round-trip)
    next: { revalidate: 300 },
    // If calling a third-party, include any headers/tokens here
    headers: { Authorization: `Bearer ${process.env.CMS_TOKEN}` },
    timeoutMs: 8000,
  });

  return res.json();
}
