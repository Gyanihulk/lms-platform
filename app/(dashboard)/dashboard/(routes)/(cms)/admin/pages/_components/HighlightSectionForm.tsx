'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import LoadingOverlay from '@/components/common/LoadingOverlay'
import toast from 'react-hot-toast'

interface HighlightData {
  id: string
  title: string
  description: string[]
  imageSrc: string
  reverse: boolean
  buttonText: string
  ctaLink: string | null
  backgroundClass: string | null
  imageWidth: number
  imageHeight: number
}

interface Props {
  data: HighlightData
  pageId: string
  sortOrder: number
  onUpdate: (updatedData: HighlightData) => void
}

export default function HighlightSectionForm({ data, pageId, sortOrder,onUpdate }: Props) {
  const [formData, setFormData] = useState(data)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDescriptionChange = (index: number, value: string) => {
    const updated = [...formData.description]
    updated[index] = value
    setFormData((prev) => ({ ...prev, description: updated }))
  }

  const handleImageUpload = async (file: File) => {
    setUploading(true)
    const formDataUpload = new FormData()
    formDataUpload.append('file', file)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload,
      })

      const result = await res.json()
      if (res.ok && result.path) {
        setFormData((prev) => ({ ...prev, imageSrc: result.path }))
      } else {
        toast.error('Failed to upload image')
      }
    } catch (err) {
      toast.error('Failed to upload image')
      alert('Upload failed')
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
          type: 'HighlightSection',
          componentId: formData.id,
          sortOrder: sortOrder,
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
      toast.success('Hightlight section updated!')
    } else {
      toast.error('Failed to update section')
    }
  }

  return (
 <div className="relative">
       <LoadingOverlay show={loading} label="Saving Hightlight Section..." />
 
       <div className={loading ? "pointer-events-none opacity-60" : ""}>
      <h2 className="text-2xl font-semibold mb-2">Edit Highlight Section</h2>

      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" value={formData.title} onChange={handleChange} />
      </div>

      {formData.description.map((desc, idx) => (
        <div key={idx}>
          <Label>Description {idx + 1}</Label>
          <Textarea
            value={desc}
            onChange={(e) => handleDescriptionChange(idx, e.target.value)}
          />
        </div>
      ))}

      <div>
        <Label>Image Source</Label>
        <Input
          id="imageSrc"
          name="imageSrc"
          value={formData.imageSrc}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label>Upload Image</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleImageUpload(file)
          }}
        />
        {formData.imageSrc && (
          <img
            src={formData.imageSrc}
            alt="Highlight"
            className="max-h-40 mt-2 rounded border"
          />
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Label htmlFor="reverse">Reverse Layout</Label>
        <Switch
          id="reverse"
          checked={formData.reverse}
          onCheckedChange={(checked) =>
            setFormData((prev) => ({ ...prev, reverse: checked }))
          }
        />
      </div>

      <div>
        <Label htmlFor="buttonText">Button Text</Label>
        <Input
          id="buttonText"
          name="buttonText"
          value={formData.buttonText}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="ctaLink">CTA Link</Label>
        <Input
          id="ctaLink"
          name="ctaLink"
          value={formData.ctaLink || ''}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="backgroundClass">Background Class</Label>
        <Input
          id="backgroundClass"
          name="backgroundClass"
          value={formData.backgroundClass || ''}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="imageWidth">Image Width</Label>
        <Input
          id="imageWidth"
          name="imageWidth"
          type="number"
          value={formData.imageWidth}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              imageWidth: parseInt(e.target.value),
            }))
          }
        />
      </div>

      <div>
        <Label htmlFor="imageHeight">Image Height</Label>
        <Input
          id="imageHeight"
          name="imageHeight"
          type="number"
          value={formData.imageHeight}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              imageHeight: parseInt(e.target.value),
            }))
          }
        />
      </div>

      <Button onClick={handleSubmit} disabled={loading || uploading}>
        {loading || uploading ? 'Saving...' : 'Save'}
      </Button>
    </div></div>
  )
}
