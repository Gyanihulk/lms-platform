'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
import LoadingOverlay from '@/components/common/LoadingOverlay'

interface Testimonial {
  id?: string
  name: string
  profession: string
  comment: string
  imgSrc: string
  rating: number
}

interface TestimonialSectionData {
  id: string
  title: string
  subtitle?: string
  testimonials: Testimonial[]
}

interface Props {
  data: TestimonialSectionData
  pageId: string
  sortOrder: number
  onUpdate: (x:any)=>void
  onClose?: () => void
}

export default function TestimonialSectionForm({ data, pageId, sortOrder, onUpdate, onClose}: Props) {
  const [formData, setFormData] = useState<TestimonialSectionData>(data)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTestimonialChange = <K extends keyof Testimonial>(
    index: number,
    field: K,
    value: Testimonial[K]
  ) => {
    const updated = [...formData.testimonials]
    updated[index][field] = value
    setFormData((prev) => ({ ...prev, testimonials: updated }))
  }

  const handleAddTestimonial = () => {
    setFormData((prev) => ({
      ...prev,
      testimonials: [
        ...prev.testimonials,
        { name: '', profession: '', comment: '', imgSrc: '', rating: 5 }
      ]
    }))
  }

  const handleRemoveTestimonial = (index: number) => {
    const updated = formData.testimonials.filter((_, i) => i !== index)
    setFormData((prev) => ({ ...prev, testimonials: updated }))
  }

  const handleImageUpload = async (file: File, index: number) => {
    const formDataUpload = new FormData()
    formDataUpload.append('file', file)
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formDataUpload })
      const result = await res.json()
      if (res.ok && result.path) {
        handleTestimonialChange(index, 'imgSrc', result.path)
      } else {
        toast.error('Failed to upload image')
      }
    } catch (err) {
      toast.error('Failed to upload image')
    }
  }

  const handleSubmit = async () => {
    setLoading(true)

    const payload = {
      components: [
        {
          type: 'TestimonialSection',
          componentId: formData.id,
          sortOrder,
          componentData: {
            title: formData.title,
            subtitle: formData.subtitle,
       testimonials: formData.testimonials
          },
        },
      ],
    }

    if (onClose) onClose()

    const res = await fetch(`/api/admin/pages/${pageId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    setLoading(false)

    if (res.ok) {
      onUpdate(formData)
      toast.success('Testimonial section updated!')
    } else {
      toast.error('Failed to update section')
    }
  }

  return (
    <div className="relative">
      <LoadingOverlay show={loading} label="Saving testimonials..." />

      <div className={loading ? "pointer-events-none opacity-60" : ""}>
        <h2 className="text-2xl font-semibold">Edit Testimonial Section</h2>

        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" value={formData.title} onChange={handleChange} />
        </div>

        <div>
          <Label htmlFor="subtitle">Subtitle</Label>
          <Input id="subtitle" name="subtitle" value={formData.subtitle || ''} onChange={handleChange} />
        </div>

        <div className="space-y-4">
          {formData.testimonials.map((t, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-2 bg-gray-50">
              <h4 className="font-medium">Testimonial {index + 1}</h4>

              <div>
                <Label>Name</Label>
                <Input value={t.name} onChange={(e) => handleTestimonialChange(index, 'name', e.target.value)} />
              </div>

              <div>
                <Label>Profession</Label>
                <Input value={t.profession} onChange={(e) => handleTestimonialChange(index, 'profession', e.target.value)} />
              </div>

              <div>
                <Label>Comment</Label>
                <Textarea value={t.comment} onChange={(e) => handleTestimonialChange(index, 'comment', e.target.value)} />
              </div>

              <div>
                <Label>Rating (1–5)</Label>
                <Input type="number" min={1} max={5} value={t.rating} onChange={(e) => handleTestimonialChange(index, 'rating', Number(e.target.value))} />
              </div>

              <div>
                <Label>Image Path</Label>
                <Input value={t.imgSrc} onChange={(e) => handleTestimonialChange(index, 'imgSrc', e.target.value)} />
              </div>

              <div>
                <Label>Upload Image</Label>
                <Input type="file" accept="image/*" onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleImageUpload(file, index)
                }} />
                {t.imgSrc && (
                  <img src={t.imgSrc} alt="testimonial" className="max-h-32 mt-2 rounded border" />
                )}
              </div>

              <Button variant="destructive" onClick={() => handleRemoveTestimonial(index)}>Remove Testimonial</Button>
            </div>
          ))}
        </div>

        <div className="flex space-x-2 mt-4">
          {/* <Button onClick={handleAddTestimonial}>Add Testimonial</Button> */}
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>
    </div>
  )
}
