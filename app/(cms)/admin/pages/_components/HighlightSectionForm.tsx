'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'

interface HighlightData {
  id: string
  title: string
  description: string[] // multiple paragraphs
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
  onUpdate: (updatedData: HighlightData) => void
}

export default function HighlightSectionForm({ data, onUpdate }: Props) {
  const [formData, setFormData] = useState(data)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDescriptionChange = (index: number, value: string) => {
    const updated = [...formData.description]
    updated[index] = value
    setFormData((prev) => ({ ...prev, description: updated }))
  }

  const handleSubmit = async () => {
    const res = await fetch(`/api/components/${formData.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    if (res.ok) {
      onUpdate(formData)
      alert('Highlight section updated!')
    } else {
      alert('Update failed!')
    }
  }

  return (
    <div className="space-y-4 border rounded-lg p-6 bg-white shadow">
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
        <Label htmlFor="imageSrc">Image Source</Label>
        <Input id="imageSrc" name="imageSrc" value={formData.imageSrc} onChange={handleChange} />
      </div>

      <div className="flex items-center space-x-2">
        <Label htmlFor="reverse">Reverse Layout</Label>
        <Switch
          id="reverse"
          checked={formData.reverse}
          onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, reverse: checked }))}
        />
      </div>

      <div>
        <Label htmlFor="buttonText">Button Text</Label>
        <Input id="buttonText" name="buttonText" value={formData.buttonText} onChange={handleChange} />
      </div>

      <div>
        <Label htmlFor="ctaLink">CTA Link</Label>
        <Input id="ctaLink" name="ctaLink" value={formData.ctaLink || ''} onChange={handleChange} />
      </div>

      <div>
        <Label htmlFor="backgroundClass">Background Class</Label>
        <Input id="backgroundClass" name="backgroundClass" value={formData.backgroundClass || ''} onChange={handleChange} />
      </div>

      <div>
        <Label htmlFor="imageWidth">Image Width</Label>
        <Input
          id="imageWidth"
          name="imageWidth"
          type="number"
          value={formData.imageWidth}
          onChange={(e) => setFormData((prev) => ({ ...prev, imageWidth: parseInt(e.target.value) }))}
        />
      </div>

      <div>
        <Label htmlFor="imageHeight">Image Height</Label>
        <Input
          id="imageHeight"
          name="imageHeight"
          type="number"
          value={formData.imageHeight}
          onChange={(e) => setFormData((prev) => ({ ...prev, imageHeight: parseInt(e.target.value) }))}
        />
      </div>

      <Button onClick={handleSubmit}>Save</Button>
    </div>
  )
}
