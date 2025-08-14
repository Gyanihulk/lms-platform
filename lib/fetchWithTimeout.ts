// lib/fetchWithTimeout.ts
export async function fetchWithTimeout(
    url: string,
    opts: RequestInit & { timeoutMs?: number } = {}
  ) {
    const { timeoutMs = 10_000, ...init } = opts;
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);
  
    try {
      const res = await fetch(url, { ...init, signal: controller.signal });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status} ${res.statusText}`);
      }
      return res;
    } catch (err) {
      // Surface a clear error to your logs; return something safe if you want
      console.error(`[fetchWithTimeout] ${url} failed:`, err);
      throw err;
    } finally {
      clearTimeout(id);
    }
  }
  