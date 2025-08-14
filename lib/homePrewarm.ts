// lib/homePrewarm.ts
import "server-only";
import { getHomeData } from "./home";

let _homeDataPromise: Promise<import("./home").HomeData> | null = null;

function prewarm() {
  if (!_homeDataPromise) {
    _homeDataPromise = getHomeData().catch(err => {
      // Don’t let a rejected promise poison future calls
      _homeDataPromise = null;
      throw err;
    });
  }
  return _homeDataPromise;
}

export async function getPrewarmedHomeData() {
  try {
    return await prewarm();
  } catch {
    // Fallback to a fresh attempt if prewarm failed
    return getHomeData();
  }
}
