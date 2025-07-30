'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

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
  onUpdate: (updatedData: BannerData) => void
}

export default function BannerSectionForm({ data, onUpdate }: Props) {
  const [formData, setFormData] = useState(data)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    const res = await fetch(`/api/components/${formData.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

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
        <Label htmlFor="imageSrc">Image Source</Label>
        <Input id="imageSrc" name="imageSrc" value={formData.imageSrc} onChange={handleChange} />
      </div>

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

      <Button onClick={handleSubmit}>Save</Button>
    </div>
  )
}
