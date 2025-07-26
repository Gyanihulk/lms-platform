'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
// import { Select } from '@/components/ui/select'

const componentTypes = ['HighlightSection', 'StatsSection', 'TestimonialSection']

export default function EditPage() {
  const { id } = useParams()
  const [page, setPage] = useState<any>(null)
  const [selectedType, setSelectedType] = useState('HighlightSection')

  useEffect(() => {
    fetch(`/api/pages/${id}`)
      .then((res) => res.json())
      .then(setPage)
  }, [id])

  const addComponent = async () => {
    const res = await fetch('/api/components', {
      method: 'POST',
      body: JSON.stringify({ pageId: id, type: selectedType }),
    })
    const data = await res.json()
    setPage((prev: any) => ({
      ...prev,
      blocks: [...prev.blocks, data],
    }))
  }

  if (!page) return <p>Loading...</p>

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Editing Page: {page.title}</h1>
      <div className="mb-6">
        {/* <Select onValueChange={setSelectedType} defaultValue={selectedType}>
          {componentTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Select> */}
        <Button onClick={addComponent} className="ml-4">
          Add Component
        </Button>
      </div>

      <div className="space-y-6">
        {page.blocks.map((block: any, i: number) => (
          <div key={i} className="border p-4 rounded-md">
            <h3 className="text-xl font-bold">{block.type}</h3>
            <p>ID: {block.componentId}</p>
            {/* Add edit button per type later */}
          </div>
        ))}
      </div>
    </div>
  )
}
