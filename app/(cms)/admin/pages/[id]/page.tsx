'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import BannerSectionForm from '../_components/BannerSectionForm'
import HighlightSectionForm from '../_components/HighlightSectionForm'
import ProgramsGridSectionForm from '../_components/ProgramsGridSectionForm'
import StatsSectionForm from '../_components/StatsSectionForm'
import DedicatedSectionForm from '../_components/DedicatedSectionForm'
import BeliefsSectionForm from '../_components/BeliefsSectionForm'
// import { Select } from '@/components/ui/select'

const componentTypes = ['HighlightSection', 'StatsSection', 'TestimonialSection']

export default function EditPage() {
  const { id } = useParams()
  const [page, setPage] = useState<any>(null)
  const [selectedType, setSelectedType] = useState('HighlightSection')

  useEffect(() => {
    fetch(`/api/admin/pages/${id}`)
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


      {page.blocks.map((block: any, i: number) => (
        <div key={i} className="border p-4 rounded-md pt-4">
          <h3 className="text-xl font-bold">{block.type}</h3>
          <p>ID: {block.componentId}</p>

          {block.type === 'BannerSection' && (
            <BannerSectionForm
              data={block.data}
              onUpdate={(updatedData) => {
                const updatedBlocks = [...page.blocks]
                updatedBlocks[i].data = updatedData
                setPage({ ...page, blocks: updatedBlocks })
              }}
            />
          )}
          {block.type === 'HighlightSection' && (
            <HighlightSectionForm
              data={block.data}
              onUpdate={(updatedData) => {
                const updatedBlocks = [...page.blocks]
                updatedBlocks[i].data = updatedData
                setPage({ ...page, blocks: updatedBlocks })
              }}
            />
          )}
          {block.type === 'ProgramsGridSection' && (
            <ProgramsGridSectionForm
              data={block.data}
              onUpdate={(updatedData) => {
                const updatedBlocks = [...page.blocks]
                updatedBlocks[i].data = updatedData
                setPage({ ...page, blocks: updatedBlocks })
              }}
            />
          )}
          {block.type === 'StatsSection' && (
            <StatsSectionForm
              data={block.data}
              onUpdate={(updatedData) => {
                const updatedBlocks = [...page.blocks]
                updatedBlocks[i].data = updatedData
                setPage({ ...page, blocks: updatedBlocks })
              }}
            />
          )}
          {block.type === 'DedicatedSection' && (
            <DedicatedSectionForm
              data={block.data}
              onUpdate={(updatedData) => {
                const updatedBlocks = [...page.blocks]
                updatedBlocks[i].data = updatedData
                setPage({ ...page, blocks: updatedBlocks })
              }}
            />
          )}
          {block.type === 'BeliefsSection' && (
            <BeliefsSectionForm
              data={block.data}
              onUpdate={(updatedData) => {
                const updatedBlocks = [...page.blocks]
                updatedBlocks[i].data = updatedData
                setPage({ ...page, blocks: updatedBlocks })
              }}
            />
          )}
        </div>
      ))}


    </div>
  )
}
