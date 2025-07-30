'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function PagesAdmin() {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const router = useRouter()

  const createPage = async () => {
    const res = await fetch('/api/admin/pages', {
      method: 'POST',
      body: JSON.stringify({ title, slug }),
    })
    const data = await res.json()
    router.push(`/admin/pages/${data.id}`)
  }

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Create New Page</h1>
      <Input
        placeholder="Page Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-4"
      />
      <Input
        placeholder="Page Slug (e.g. home, about)"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        className="mb-4"
      />
      <Button onClick={createPage}>Create Page</Button>
    </div>
  )
}
