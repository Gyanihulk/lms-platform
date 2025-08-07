'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

interface BeliefsSectionData {
  id: string
  missionTitle: string
  missionText: string
  missionPoints: string[]
  visionTitle: string
  visionText: string
  visionPoints: string[]
  missionImage?: string
  visionImage?: string
}

interface Props {
  data: BeliefsSectionData
  pageId: string
  onUpdate: (updatedData: BeliefsSectionData) => void
}

export default function BeliefsSectionForm({ data, pageId, onUpdate }: Props) {
  const [formData, setFormData] = useState(data)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleListChange = (
    listName: 'missionPoints' | 'visionPoints',
    index: number,
    value: string
  ) => {
    const updatedList = [...formData[listName]]
    updatedList[index] = value
    setFormData((prev) => ({ ...prev, [listName]: updatedList }))
  }

  const handleAddItem = (listName: 'missionPoints' | 'visionPoints') => {
    setFormData((prev) => ({
      ...prev,
      [listName]: [...prev[listName], ''],
    }))
  }

  const handleRemoveItem = (listName: 'missionPoints' | 'visionPoints', index: number) => {
    const updated = formData[listName].filter((_, i) => i !== index)
    setFormData((prev) => ({ ...prev, [listName]: updated }))
  }

  const handleImageUpload = async (field: 'missionImage' | 'visionImage', file: File) => {
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
        setFormData((prev) => ({ ...prev, [field]: result.path }))
      } else {
        alert('Image upload failed')
      }
    } catch (err) {
      console.error('Upload error:', err)
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
          type: 'BeliefsSection',
          componentId: formData.id,
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
      alert('Beliefs section updated!')
    } else {
      alert('Update failed!')
    }
  }

  return (
    <div className="space-y-6 border rounded-lg p-6 bg-white shadow">
      <h2 className="text-2xl font-semibold">Edit Beliefs Section</h2>

      <div>
        <Label>Mission Title</Label>
        <Input name="missionTitle" value={formData.missionTitle} onChange={handleChange} />
      </div>

      <div>
        <Label>Mission Text</Label>
        <Textarea name="missionText" value={formData.missionText} onChange={handleChange} />
      </div>

      <div>
        <Label>Mission Points</Label>
        {formData.missionPoints.map((point, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <Input value={point} onChange={(e) => handleListChange('missionPoints', i, e.target.value)} />
            <Button variant="destructive" onClick={() => handleRemoveItem('missionPoints', i)}>X</Button>
          </div>
        ))}
        <Button onClick={() => handleAddItem('missionPoints')}>Add Mission Point</Button>
      </div>

      <div>
        <Label>Mission Image</Label>
        <Input type="file" accept="image/*" onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleImageUpload('missionImage', file)
        }} />
        {formData.missionImage && (
          <img src={formData.missionImage} alt="Mission" className="max-h-32 mt-2 rounded border" />
        )}
      </div>

      <div>
        <Label>Vision Title</Label>
        <Input name="visionTitle" value={formData.visionTitle} onChange={handleChange} />
      </div>

      <div>
        <Label>Vision Text</Label>
        <Textarea name="visionText" value={formData.visionText} onChange={handleChange} />
      </div>

      <div>
        <Label>Vision Points</Label>
        {formData.visionPoints.map((point, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <Input value={point} onChange={(e) => handleListChange('visionPoints', i, e.target.value)} />
            <Button variant="destructive" onClick={() => handleRemoveItem('visionPoints', i)}>X</Button>
          </div>
        ))}
        <Button onClick={() => handleAddItem('visionPoints')}>Add Vision Point</Button>
      </div>

      <div>
        <Label>Vision Image</Label>
        <Input type="file" accept="image/*" onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleImageUpload('visionImage', file)
        }} />
        {formData.visionImage && (
          <img src={formData.visionImage} alt="Vision" className="max-h-32 mt-2 rounded border" />
        )}
      </div>

      <Button onClick={handleSubmit} disabled={loading || uploading}>
        {loading || uploading ? 'Saving...' : 'Save'}
      </Button>
    </div>
  )
}
