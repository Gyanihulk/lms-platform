'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
import LoadingOverlay from '@/components/common/LoadingOverlay'

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
  pageId: string
  sortOrder: number
  onUpdate: (updatedData: StatsSectionData) => void
}

export default function StatsSectionForm({ data, pageId,sortOrder, onUpdate }: Props) {
  const [formData, setFormData] = useState<StatsSectionData>(data)
  const [loading, setLoading] = useState(false)

  const handleStatChange = (
    index: number,
    field: keyof StatItem,
    value: string | number
  ) => {
    const updatedStats = [...formData.stats]
    if (field === 'value') {
      updatedStats[index][field] = value // can be number or string
    } else {
      updatedStats[index][field] = String(value) // force to string
    }
    setFormData((prev) => ({ ...prev, stats: updatedStats }))
  }

  const handleAddStat = () => {
    setFormData((prev) => ({
      ...prev,
      stats: [
        ...prev.stats,
        { label: '', value: '', icon: '', suffix: '', textColor: '' },
      ],
    }))
  }

  const handleRemoveStat = (index: number) => {
    const updated = formData.stats.filter((_, i) => i !== index)
    setFormData((prev) => ({ ...prev, stats: updated }))
  }

  const handleSubmit = async () => {
    setLoading(true)

    const payload = {
      slug: undefined,
      title: undefined,
      components: [
        {
          type: 'StatsSection',
          componentId: formData.id,
          sortOrder,
          componentData: {
            stats: formData.stats,
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
      toast.success('Stats section updated!')
    } else {
      toast.error('Failed to update section')
    }
  }

  return (
    <div className="relative">
      <LoadingOverlay show={loading} label="Saving testimonials..." />

      <div className={loading ? "pointer-events-none opacity-60" : ""}>
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

            {/* <Button
              variant="destructive"
              onClick={() => handleRemoveStat(index)}
            >
              Delete Stat
            </Button> */}
          </div>
        ))}
      </div>

      <div className="flex space-x-2">
        {/* <Button onClick={handleAddStat}>Add Stat</Button> */}
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </div></div>
  )
}
