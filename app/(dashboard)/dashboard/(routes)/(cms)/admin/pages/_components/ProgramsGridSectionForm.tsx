'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import toast from 'react-hot-toast'
import LoadingOverlay from '@/components/common/LoadingOverlay'

interface Program {
  title: string
  description: string
  iconPath: string
  iconAlt: string
}

interface ProgramsGridData {
  id: string
  title: string
  subtitle: string
  images: string[]
  programs: Program[]
}

interface Props {
  data: ProgramsGridData
  pageId: string
  sortOrder: number
  onUpdate: (updatedData: ProgramsGridData) => void
}

export default function ProgramsGridSectionForm({ data, pageId,sortOrder, onUpdate }: Props) {
  const [formData, setFormData] = useState(data)
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (index: number, value: string) => {
    const updated = [...formData.images]
    updated[index] = value
    setFormData((prev) => ({ ...prev, images: updated }))
  }

  const handleProgramChange = (
    index: number,
    field: keyof Program,
    value: string
  ) => {
    const updated = [...formData.programs]
    updated[index][field] = value
    setFormData((prev) => ({ ...prev, programs: updated }))
  }

  const handleImageUpload = async (
    file: File,
    target: { type: 'images' | 'programIcon'; index: number }
  ) => {
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
        if (target.type === 'images') {
          const updated = [...formData.images]
          updated[target.index] = result.path
          setFormData((prev) => ({ ...prev, images: updated }))
        } else if (target.type === 'programIcon') {
          const updated = [...formData.programs]
          updated[target.index].iconPath = result.path
          setFormData((prev) => ({ ...prev, programs: updated }))
        }
      } else {
        toast.error('Failed to upload image')
      }
    } catch (err) {
      toast.error('Failed to upload image')
      alert('Upload error')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)

    const payload = {
      slug: undefined,
      title: undefined,
      components: [
        {
          type: 'ProgramsGridSection',
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
      toast.success('Program Grid section updated!')
    } else {
      toast.error('Failed to update section')
    }
  }

  return (
    <div className="relative">
      <LoadingOverlay show={loading} label="Saving program grid..." />

      <div className={loading ? "pointer-events-none opacity-60" : ""}>
              <h2 className="text-2xl font-semibold">Edit Programs Grid Section</h2>

      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" value={formData.title} onChange={handleInputChange} />
      </div>

      <div>
        <Label htmlFor="subtitle">Subtitle</Label>
        <Input id="subtitle" name="subtitle" value={formData.subtitle} onChange={handleInputChange} />
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Images</h3>
        {formData.images.map((img, idx) => (
          <div key={idx}>
            <Label>Image {idx + 1}</Label>
            <Input
              value={img}
              onChange={(e) => handleImageChange(idx, e.target.value)}
            />
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleImageUpload(file, { type: 'images', index: idx })
              }}
            />
            {img && <img src={img} alt={`Image ${idx + 1}`} className="max-h-32 mt-2 rounded" />}
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-medium">Programs</h3>
        {formData.programs.map((program, i) => (
          <div key={i} className="border rounded p-4 space-y-2">
            <h4 className="font-semibold">Program {i + 1}</h4>

            <div>
              <Label>Title</Label>
              <Input
                value={program.title}
                onChange={(e) => handleProgramChange(i, 'title', e.target.value)}
              />
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                value={program.description}
                onChange={(e) => handleProgramChange(i, 'description', e.target.value)}
              />
            </div>

            <div>
              <Label>Icon Path</Label>
              <Input
                value={program.iconPath}
                onChange={(e) => handleProgramChange(i, 'iconPath', e.target.value)}
              />
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleImageUpload(file, { type: 'programIcon', index: i })
                }}
              />
              {program.iconPath && (
                <img
                  src={program.iconPath}
                  alt={program.iconAlt || `Program ${i + 1}`}
                  className="max-h-20 mt-2"
                />
              )}
            </div>

            <div>
              <Label>Icon Alt</Label>
              <Input
                value={program.iconAlt}
                onChange={(e) => handleProgramChange(i, 'iconAlt', e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>

      <Button onClick={handleSubmit} disabled={uploading || loading}>
        {uploading || loading ? 'Saving...' : 'Save'}
      </Button>
    </div></div>
  )
}
