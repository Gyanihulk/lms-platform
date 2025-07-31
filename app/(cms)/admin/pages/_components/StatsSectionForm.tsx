'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

interface StatItem {
  id?: string
  label: string
  value: string | number
  icon: string
  suffix?: string
  textColor?: string
}

interface StatsSectionData {
  id: string
  stats: StatItem[]
}

interface Props {
  data: StatsSectionData
  onUpdate: (updatedData: StatsSectionData) => void
}

export default function StatsSectionForm({ data, onUpdate }: Props) {
  const [formData, setFormData] = useState<StatsSectionData>(data)

  const handleStatChange = (
    index: number,
    field: keyof StatItem,
    value: string | number
  ) => {
    const updatedStats = [...formData.stats]
    updatedStats[index][field] = String(value)
    setFormData((prev) => ({ ...prev, stats: updatedStats }))
  }

  const handleAddStat = () => {
    setFormData((prev) => ({
      ...prev,
      stats: [
        ...prev.stats,
        { label: '', value: '', icon: '', suffix: '', textColor: '' }
      ],
    }))
  }

  const handleRemoveStat = (index: number) => {
    const updated = formData.stats.filter((_, i) => i !== index)
    setFormData((prev) => ({ ...prev, stats: updated }))
  }

  const handleSubmit = async () => {
    const res = await fetch(`/api/components/${formData.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    if (res.ok) {
      onUpdate(formData)
      alert('Stats section updated!')
    } else {
      alert('Update failed!')
    }
  }

  return (
    <div className="space-y-6 border rounded-lg p-6 bg-white shadow">
      <h2 className="text-2xl font-semibold">Edit Stats Section</h2>

      <div className="space-y-4">
        {formData.stats.map((stat, index) => (
          <div key={index} className="border rounded p-4 space-y-2 bg-gray-50">
            <h4 className="font-medium">Stat {index + 1}</h4>

            <div>
              <Label>Label</Label>
              <Input
                value={stat.label}
                onChange={(e) =>
                  handleStatChange(index, 'label', e.target.value)
                }
              />
            </div>

            <div>
              <Label>Value</Label>
              <Input
                type="number"
                value={stat.value}
                onChange={(e) =>
                  handleStatChange(index, 'value', Number(e.target.value))
                }
              />
            </div>

            <div>
              <Label>Icon (e.g. FaGraduationCap)</Label>
              <Input
                value={stat.icon}
                onChange={(e) =>
                  handleStatChange(index, 'icon', e.target.value)
                }
              />
            </div>

            <div>
              <Label>Suffix (e.g. +, %)</Label>
              <Input
                value={stat.suffix || ''}
                onChange={(e) =>
                  handleStatChange(index, 'suffix', e.target.value)
                }
              />
            </div>

            <div>
              <Label>Text Color (Tailwind class, e.g. text-white)</Label>
              <Input
                value={stat.textColor || ''}
                onChange={(e) =>
                  handleStatChange(index, 'textColor', e.target.value)
                }
              />
            </div>

            <Button
              variant="destructive"
              onClick={() => handleRemoveStat(index)}
            >
              Delete Stat
            </Button>
          </div>
        ))}
      </div>

      <div className="flex space-x-2">
        <Button onClick={handleAddStat}>Add Stat</Button>
        <Button onClick={handleSubmit}>Save</Button>
      </div>
    </div>
  )
}
