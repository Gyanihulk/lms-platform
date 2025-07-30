'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

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
  onUpdate: (updatedData: DedicatedSectionData) => void
}

export default function DedicatedSectionForm({ data, onUpdate }: Props) {
  const [formData, setFormData] = useState(data)

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

  const handleSubmit = async () => {
    const res = await fetch(`/api/components/${formData.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    if (res.ok) {
      onUpdate(formData)
      alert('Dedicated section updated!')
    } else {
      alert('Update failed!')
    }
  }

  return (
    <div className="space-y-6 border rounded-lg p-6 bg-white shadow">
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
            <Textarea
              value={point}
              onChange={(e) => handlePointChange(i, e.target.value)}
            />
            <Button variant="destructive" onClick={() => handleRemovePoint(i)}>
              X
            </Button>
          </div>
        ))}
        <Button onClick={handleAddPoint}>Add Point</Button>
      </div>

      <div>
        <Label>Image Source</Label>
        <Input name="imageSrc" value={formData.imageSrc} onChange={handleChange} />
      </div>

      <div>
        <Label>Comma Image Source</Label>
        <Input name="commaSrc" value={formData.commaSrc} onChange={handleChange} />
      </div>

      <div>
        <Label>Spiral Image Source</Label>
        <Input name="spiralSrc" value={formData.spiralSrc} onChange={handleChange} />
      </div>

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

      <Button onClick={handleSubmit}>Save</Button>
    </div>
  )
}
