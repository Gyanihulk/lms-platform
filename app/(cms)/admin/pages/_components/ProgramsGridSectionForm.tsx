'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

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
  onUpdate: (updatedData: ProgramsGridData) => void
}

export default function ProgramsGridSectionForm({ data, onUpdate }: Props) {
  const [formData, setFormData] = useState(data)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

  const handleSubmit = async () => {
    const res = await fetch(`/api/components/${formData.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    if (res.ok) {
      onUpdate(formData)
      alert('ProgramsGrid section updated!')
    } else {
      alert('Update failed!')
    }
  }

  return (
    <div className="space-y-6 border p-6 rounded-lg shadow bg-white">
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

      <Button onClick={handleSubmit}>Save</Button>
    </div>
  )
}
