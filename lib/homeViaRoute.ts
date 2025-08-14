// lib/homeViaRoute.ts (server-only)
import "server-only";
import { fetchWithTimeout } from "./fetchWithTimeout";

export async function getHomeDataViaRoute() {
  const res = await fetchWithTimeout(
    // Call your Next route handler from the server using an absolute URL
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/pages/home`,
    { next: { revalidate: 300 }, timeoutMs: 8000 }
  );
  return res.json();
}
