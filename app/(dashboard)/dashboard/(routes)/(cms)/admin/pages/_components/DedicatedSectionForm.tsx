'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import toast from 'react-hot-toast'
import LoadingOverlay from '@/components/common/LoadingOverlay'

interface DedicatedSectionData {
  id: string
  title: string
  subtitle: string
  points: string[]
  imageSrc: string
  commaSrc: string
  spiralSrc: string
  button1Text: string
  button1Link: string
  button2Text: string
  button2Link: string
}

interface Props {
  data: DedicatedSectionData
  pageId: string
  sortOrder: number
  onUpdate: (updatedData: DedicatedSectionData) => void
}

export default function DedicatedSectionForm({ data, pageId, sortOrder,onUpdate }: Props) {
  const [formData, setFormData] = useState(data)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePointChange = (index: number, value: string) => {
    const updated = [...formData.points]
    updated[index] = value
    setFormData((prev) => ({ ...prev, points: updated }))
  }

  const handleAddPoint = () => {
    setFormData((prev) => ({
      ...prev,
      points: [...prev.points, ''],
    }))
  }

  const handleRemovePoint = (index: number) => {
    const updated = formData.points.filter((_, i) => i !== index)
    setFormData((prev) => ({ ...prev, points: updated }))
  }

  const handleImageUpload = async (field: keyof DedicatedSectionData, file: File) => {
    setUploading(true)

    const formDataFile = new FormData()
    formDataFile.append('file', file)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formDataFile,
      })

      const result = await res.json()
      if (res.ok && result.path) {
        setFormData((prev) => ({
          ...prev,
          [field]: result.path,
        }))
      } else {
        toast.error('Failed to upload image')
      }
    } catch (err) {
      toast.error('Failed to upload image')

    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
console.log(formData)
    const payload = {
      slug: undefined,
      title: undefined,
      components: [
        {
          type: 'DedicatedSection',
          componentId: formData.id,
          sortOrder,
          componentData: formData,
        },
      ],
    }

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

  const renderImageUpload = (
    label: string,
    field: keyof DedicatedSectionData,
    currentValue: string
  ) => (
    <div>
      <Label>{label}</Label>
      <Input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleImageUpload(field, file)
        }}
      />
      {currentValue && (
        <img src={currentValue} alt={label} className="max-h-32 mt-2 rounded border" />
      )}
    </div>
  )

  return (
  <div className="relative">
        <LoadingOverlay show={loading} label="Saving Dedicated..." />
  
        <div className={loading ? "pointer-events-none opacity-60" : ""}>
          
      <h2 className="text-2xl font-semibold">Edit Dedicated Section</h2>

      <div>
        <Label>Title</Label>
        <Input name="title" value={formData.title} onChange={handleChange} />
      </div>

      <div>
        <Label>Subtitle</Label>
        <Input name="subtitle" value={formData.subtitle} onChange={handleChange} />
      </div>

      <div className="space-y-2">
        <Label>Points</Label>
        {formData.points.map((point, i) => (
          <div key={i} className="flex gap-2">
            <Textarea value={point} onChange={(e) => handlePointChange(i, e.target.value)} />
            <Button variant="destructive" onClick={() => handleRemovePoint(i)}>X</Button>
          </div>
        ))}
        {/* <Button onClick={handleAddPoint}>Add Point</Button> */}
      </div>

      {renderImageUpload('Main Image', 'imageSrc', formData.imageSrc)}
      {/* {renderImageUpload('Comma Image', 'commaSrc', formData.commaSrc)}
      {renderImageUpload('Spiral Image', 'spiralSrc', formData.spiralSrc)} */}

      <div>
        <Label>Button 1 Text</Label>
        <Input name="button1Text" value={formData.button1Text} onChange={handleChange} />
      </div>

      <div>
        <Label>Button 1 Link</Label>
        <Input name="button1Link" value={formData.button1Link} onChange={handleChange} />
      </div>

      <div>
        <Label>Button 2 Text</Label>
        <Input name="button2Text" value={formData.button2Text} onChange={handleChange} />
      </div>

      <div>
        <Label>Button 2 Link</Label>
        <Input name="button2Link" value={formData.button2Link} onChange={handleChange} />
      </div>

      <Button onClick={handleSubmit} disabled={loading || uploading}>
        {loading || uploading ? 'Saving...' : 'Save'}
      </Button>
    </div>   </div>
  )
}
