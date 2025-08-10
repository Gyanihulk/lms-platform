'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import BannerSectionForm from '../_components/BannerSectionForm'
import HighlightSectionForm from '../_components/HighlightSectionForm'
import ProgramsGridSectionForm from '../_components/ProgramsGridSectionForm'
import StatsSectionForm from '../_components/StatsSectionForm'
import DedicatedSectionForm from '../_components/DedicatedSectionForm'
import BeliefsSectionForm from '../_components/BeliefsSectionForm'
import TestimonialSectionForm from '../_components/TestimonialSectionForm'
import FAQSectionForm from '../_components/FAQSectionForm'
import WeWorkSectionForm from '../_components/WeWorkSectionForm'

export default function EditPage() {
  const { id } = useParams()
  const pageId = Array.isArray(id) ? id[0] : id
  const [page, setPage] = useState<any>(null)
  const [openItem, setOpenItem] = useState<string | undefined>(undefined)
  useEffect(() => {
    fetch(`/api/admin/pages/${pageId}`)
      .then((res) => res.json())
      .then(setPage)
  }, [id])

  if (!page) return <p>Loading...</p>

  // helper to avoid repeating the onUpdate body
  const makeOnUpdate = (i: number) => (updatedData: any) => {
    const updatedBlocks = [...page.blocks]
    updatedBlocks[i].data = updatedData
    setPage({ ...page, blocks: updatedBlocks })
    // If you want to persist immediately, call your savePage(updatedBlocks) here.
  }

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">{page.title} Page</h1>

      <Accordion type="single" collapsible className="w-full" value={openItem}
  onValueChange={setOpenItem}>
        {page.blocks.map((block: any, i: number) => (
          <AccordionItem key={block.id} value={block.id} className="border rounded-md mb-4">
            <AccordionTrigger className="px-4 py-3 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-2">
                <div className="font-semibold">{block.type}</div>
                <div className="text-sm text-muted-foreground">
                  ID: {block.componentId} • Order: {block.sortOrder}
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent className="px-4 pb-4">
              {block.type === 'BannerSection' && (
                <BannerSectionForm
                  data={block.data}
                  pageId={pageId}
                  sortOrder={block.sortOrder}
                  onUpdate={makeOnUpdate(i)}
                />
              )}

              {block.type === 'FAQSection' && (
                <FAQSectionForm
                  data={block.data}
                  pageId={pageId}
                  sortOrder={block.sortOrder}
                  onUpdate={makeOnUpdate(i)}
                />
              )}

              {block.type === 'HighlightSection' && (
                <HighlightSectionForm
                  data={block.data}
                  pageId={pageId}
                  sortOrder={block.sortOrder}
                  onUpdate={makeOnUpdate(i)}
                />
              )}

              {block.type === 'ProgramsGridSection' && (
                <ProgramsGridSectionForm
                  data={block.data}
                  pageId={pageId}
                  sortOrder={block.sortOrder}
                  onUpdate={makeOnUpdate(i)}
                />
              )}

              {block.type === 'StatsSection' && (
                <StatsSectionForm
                  data={block.data}
                  pageId={pageId}
                  sortOrder={block.sortOrder}
                  onUpdate={makeOnUpdate(i)}
                />
              )}

              {block.type === 'WeWorkSection' && (
                <WeWorkSectionForm
                  data={block.data}
                  pageId={pageId}
                  sortOrder={block.sortOrder}
                  onUpdate={makeOnUpdate(i)}
                />
              )}

              {block.type === 'TestimonialSection' && (
                <TestimonialSectionForm
                  data={block.data}
                  pageId={pageId}
                  sortOrder={block.sortOrder}
                  onUpdate={makeOnUpdate(i)}
                  onClose={() => setOpenItem(undefined)} 
                />
              )}

              {block.type === 'DedicatedSection' && (
                <DedicatedSectionForm
                  data={block.data}
                  pageId={pageId}
                  sortOrder={block.sortOrder}
                  onUpdate={makeOnUpdate(i)}
                />
              )}

              {block.type === 'BeliefsSection' && (
                <BeliefsSectionForm
                  data={block.data}
                  pageId={pageId}
                  sortOrder={block.sortOrder}
                  onUpdate={makeOnUpdate(i)}
                />
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
