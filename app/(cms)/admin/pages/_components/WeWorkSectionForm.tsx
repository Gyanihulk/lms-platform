'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { UploadImage } from '@/components/admin/UploadImage'

interface Mentor {
  id?: string
  name: string
  profession: string
  imgSrc: string
  linkedin?: string
}

interface WeWorkSectionFormProps {
  data: {
    id: string
    title: string
    subtitle: string
    mentors: Mentor[]
  }
  pageId: string
  onUpdate: (updatedData: any) => void
}

export default function WeWorkSectionForm({
  data,
  pageId,
  onUpdate
}: WeWorkSectionFormProps) {
  const [title, setTitle] = useState(data.title)
  const [subtitle, setSubtitle] = useState(data.subtitle)
  const [mentors, setMentors] = useState<Mentor[]>(data.mentors)

  const handleMentorChange = (index: number, key: keyof Mentor, value: string) => {
    const updated = [...mentors]
    updated[index][key] = value
    setMentors(updated)
  }

  const handleAddMentor = () => {
    setMentors([...mentors, { name: '', profession: '', imgSrc: '', linkedin: '' }])
  }

  const handleRemoveMentor = (index: number) => {
    const updated = [...mentors]
    updated.splice(index, 1)
    setMentors(updated)
  }

  const handleSubmit = async () => {
    const payload = {
      components: [
        {
          type: 'WeWorkSection',
          componentId: data.id,
          componentData: {
            title,
            subtitle,
            mentors: {
              upsert: mentors.map((mentor) => ({
                where: { id: mentor.id || '' },
                update: {
                  name: mentor.name,
                  profession: mentor.profession,
                  imgSrc: mentor.imgSrc,
                  linkedin: mentor.linkedin,
                },
                create: {
                  name: mentor.name,
                  profession: mentor.profession,
                  imgSrc: mentor.imgSrc,
                  linkedin: mentor.linkedin,
                },
              })),
            },
          },
        },
      ],
    }
  
    const res = await fetch(`/api/admin/pages/${pageId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
  
    if (res.ok) {
      const updatedData = await res.json()
      onUpdate(updatedData)
      alert('WeWork section updated!')
    } else {
      alert('Update failed')
    }
  }
  

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">WeWork Section</h2>

      <div className="space-y-2">
        <Label>Title</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div className="space-y-2">
        <Label>Subtitle</Label>
        <Input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
      </div>

      <div className="space-y-4">
        {mentors.map((mentor, index) => (
          <Card key={index}>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  value={mentor.name}
                  onChange={(e) => handleMentorChange(index, 'name', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Profession</Label>
                <Input
                  value={mentor.profession}
                  onChange={(e) => handleMentorChange(index, 'profession', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>LinkedIn URL</Label>
                <Input
                  value={mentor.linkedin || ''}
                  onChange={(e) => handleMentorChange(index, 'linkedin', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Image</Label>
                <UploadImage
                  folder="mentors"
                  value={mentor.imgSrc}
                  onChange={(url) => handleMentorChange(index, 'imgSrc', url)}
                />
              </div>

              <Button
                variant="destructive"
                onClick={() => handleRemoveMentor(index)}
                className="w-full"
              >
                Remove Mentor
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button variant="outline" onClick={handleAddMentor}>
        + Add Mentor
      </Button>

      <div>
        <Button className="mt-4" onClick={handleSubmit}>
          Save 
        </Button>
      </div>
    </div>
  )
}
