'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

interface FAQItem {
  id?: string
  question: string
  answer: string
}

interface FAQData {
  id: string
  title: string
  items: FAQItem[]
}

interface Props {
  data: FAQData
  pageId: string
  onUpdate: (updatedData: FAQData) => void
}

export default function FAQSectionForm({ data, pageId, onUpdate }: Props) {
  const [formData, setFormData] = useState<FAQData>(data)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleItemChange = (index: number, key: keyof FAQItem, value: string) => {
    const updatedItems = [...formData.items]
    updatedItems[index][key] = value
    setFormData((prev) => ({ ...prev, items: updatedItems }))
  }

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { question: '', answer: '' }],
    }))
  }

  const removeItem = (index: number) => {
    const updatedItems = [...formData.items]
    updatedItems.splice(index, 1)
    setFormData((prev) => ({ ...prev, items: updatedItems }))
  }

  const handleSubmit = async () => {
    setLoading(true)

    const payload = {
      slug: undefined,
      title: undefined,
      components: [
        {
          type: 'FAQSection',
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
      alert('FAQ section updated!')
    } else {
      alert('Update failed!')
    }
  }

  return (
    <div className="space-y-4 border rounded-lg p-6 bg-white shadow">
      <h2 className="text-2xl font-semibold mb-2">Edit FAQ Section</h2>

      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" value={formData.title} onChange={handleChange} />
      </div>

      {formData.items.map((item, idx) => (
        <div key={idx} className="border p-4 rounded mb-2">
          <Label>Question</Label>
          <Input
            value={item.question}
            onChange={(e) => handleItemChange(idx, 'question', e.target.value)}
          />
          <Label className="mt-2">Answer</Label>
          <Textarea
            value={item.answer}
            onChange={(e) => handleItemChange(idx, 'answer', e.target.value)}
          />
          <Button
            variant="destructive"
            className="mt-2"
            onClick={() => removeItem(idx)}
          >
            Remove
          </Button>
        </div>
      ))}

      <Button type="button" onClick={addItem}>
        + Add FAQ
      </Button>

      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Saving...' : 'Save FAQ Section'}
      </Button>
    </div>
  )
}
