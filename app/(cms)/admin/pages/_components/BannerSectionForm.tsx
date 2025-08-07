'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

interface BannerData {
  id: string
  title: string
  subtitle: string
  imageSrc: string
  buttonText: string
  ctaLink: string
  theme: string
}

interface Props {
  data: BannerData
  pageId: string
  onUpdate: (updatedData: BannerData) => void
}

export default function BannerSectionForm({ data, pageId, onUpdate }: Props) {
  const [formData, setFormData] = useState(data)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

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
        setFormData((prev) => ({ ...prev, imageSrc: result.path }))
      } else {
        alert('Image upload failed')
      }
    } catch (err) {
      console.error('Image upload error:', err)
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
          type: 'BannerSection',
          componentId: formData.id,
          componentData: {
            title: formData.title,
            subtitle: formData.subtitle,
            imageSrc: formData.imageSrc,
            buttonText: formData.buttonText,
            ctaLink: formData.ctaLink,
            theme: formData.theme,
          },
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
      alert('Banner section updated!')
    } else {
      alert('Update failed!')
    }
  }

  return (
    <div className="space-y-4 border rounded-lg p-6 bg-white shadow">
      <h2 className="text-2xl font-semibold mb-2">Edit Banner Section</h2>

      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" value={formData.title} onChange={handleChange} />
      </div>

      <div>
        <Label htmlFor="subtitle">Subtitle</Label>
        <Input id="subtitle" name="subtitle" value={formData.subtitle} onChange={handleChange} />
      </div>

      <div>
        <Label htmlFor="imageSrc">Image Source (URL)</Label>
        <Input id="imageSrc" name="imageSrc" value={formData.imageSrc} onChange={handleChange} />
      </div>

      <div>
        <Label htmlFor="imageUpload">Upload Image</Label>
        <Input type="file" accept="image/*" onChange={handleImageUpload} />
        {uploading && <p className="text-sm text-muted-foreground">Uploading...</p>}
      </div>

      {formData.imageSrc && (
        <div>
          <Label>Image Preview</Label>
          <img
            src={formData.imageSrc.startsWith('/uploads') ? formData.imageSrc : `/uploads/${formData.imageSrc}`}
            alt="Banner"
            className="max-h-40 mt-2 rounded border"
          />
        </div>
      )}

      <div>
        <Label htmlFor="buttonText">Button Text</Label>
        <Input id="buttonText" name="buttonText" value={formData.buttonText} onChange={handleChange} />
      </div>

      <div>
        <Label htmlFor="ctaLink">CTA Link</Label>
        <Input id="ctaLink" name="ctaLink" value={formData.ctaLink} onChange={handleChange} />
      </div>

      <div>
        <Label htmlFor="theme">Theme</Label>
        <Input id="theme" name="theme" value={formData.theme} onChange={handleChange} />
      </div>

      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Saving...' : 'Save'}
      </Button>
    </div>
  )
}
