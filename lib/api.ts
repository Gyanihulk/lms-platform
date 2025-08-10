// lib/api.ts
import 'server-only'

export type PageBlock = {
  id: string
  type: string
  sortOrder: number
  data: Record<string, any>
}

export type PageData = {
  id: string
  slug: string
  title: string
  createdAt: string
  updatedAt: string
  blocks: PageBlock[]
}

const DEFAULT_TIMEOUT_MS = 7000

function withTimeout<T>(p: Promise<T>, ms = DEFAULT_TIMEOUT_MS) {
  return new Promise<T>((resolve, reject) => {
    const id = setTimeout(() => reject(new Error('Request timed out')), ms)
    p.then((v) => {
      clearTimeout(id)
      resolve(v)
    }).catch((e) => {
      clearTimeout(id)
      reject(e)
    })
  })
}

/**
 * Fetches page data from your API by slug.
 * Works on the server for SSR/SEO.
 * Returns null if request fails or data shape invalid.
 */
export async function getPageData(slug: string): Promise<PageData | null> {
  const base = process.env.NEXT_PUBLIC_APP_URL // e.g. https://cms.example.com
  const path = process.env.HOMEPAGE_API_PATH ?? '/api/pages'
  

  if (!base) {
    return null
  }

  const url = `${base}${path}`

  try {
    const res = await withTimeout(fetch(url, { cache: 'no-store' }))


    if (!res.ok) throw new Error(`Bad status ${res.status}`)

    const json = await res.json()

    const data = (json?.data ?? json) as PageData | undefined
    if (!data || !Array.isArray(data.blocks)) {
      console.warn('[getPageData] No valid blocks found in API response')
      return null
    }

    // sort by sortOrder
    data.blocks.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    
// console.log('[getPageData] returning parsed page data:', JSON.stringify(data, null, 3))


    return data
  } catch (err) {
    console.error('[getPageData] failed:', err)
    return null
  }
}


/**
 * Safe helper to pick block data by type.
 */
export function pickBlock<T = any>(page: PageData | null, type: string): T | null {
  const b = page?.blocks?.find((blk) => blk.type === type)
  return (b?.data as T) ?? null
}
