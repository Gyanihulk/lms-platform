'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default function PagesAdmin() {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [pages, setPages] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    fetchPages()
  }, [])

  const fetchPages = async () => {
    const res = await fetch('/api/admin/pages')
    const data = await res.json()
    setPages(data)
  }

  const createPage = async () => {
    const res = await fetch('/api/admin/pages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, slug }),
    })
    const data = await res.json()

    if (res.ok) {
      setTitle('')
      setSlug('')
      fetchPages()
    } else {
      alert(data.error || 'Failed to create page')
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-10">
      {/* Create Page Form */}
      {/* <Card>
        <CardHeader>
          <CardTitle>Create New Page</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Page Title</Label>
            <Input
              id="title"
              placeholder="Page Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="slug">Page Slug</Label>
            <Input
              id="slug"
              placeholder="e.g. home, about"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
          </div>
          <Button onClick={createPage}>Create Page</Button>
        </CardContent>
      </Card> */}

      {/* Pages List */}
      <Card>
        <CardHeader>
          <CardTitle>Pages</CardTitle>
        </CardHeader>
        <CardContent>
          {pages.length === 0 ? (
            <p className="text-gray-500">No pages found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pages.map((page) => (
                  <TableRow key={page.id}>
                    <TableCell className="font-medium">{page.title}</TableCell>
                    <TableCell>/{page.slug}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/dashboard/admin/pages/${page.id}`)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
