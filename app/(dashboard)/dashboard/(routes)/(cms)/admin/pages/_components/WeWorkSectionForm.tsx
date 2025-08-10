'use client'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { UploadImage } from '@/components/admin/UploadImage'
import toast from 'react-hot-toast'
import LoadingOverlay from '@/components/common/LoadingOverlay'

interface Mentor { id?: string; name: string; profession: string; imgSrc: string; linkedin?: string }
interface WeWorkSectionFormProps {
  data: { id: string; title: string; subtitle: string; mentors: Mentor[] }
  pageId: string; sortOrder: number; onUpdate: (x:any)=>void
}

export default function WeWorkSectionForm({ data, pageId, sortOrder, onUpdate }: WeWorkSectionFormProps) {
  const [title, setTitle] = useState(data.title)
  const [subtitle, setSubtitle] = useState(data.subtitle)
  const [mentors, setMentors] = useState<Mentor[]>(data.mentors)
  const [loading, setLoading] = useState(false)

  const handleMentorChange = (i:number, key:keyof Mentor, v:string) => {
    const copy = [...mentors]; (copy[i] as any)[key] = v; setMentors(copy)
  }

  const handleSubmit = async () => {
    const payload = {
      components: [{
        type: 'WeWorkSection',
        componentId: data.id,
        sortOrder,
        componentData: {
          title, subtitle,
          mentors,
        },
      }],
    }

    const tid = toast.loading('Saving WeWork section…')
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/pages/${pageId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(await res.text())
      const updated = await res.json()
      onUpdate(updated)
      toast.success('WeWork section updated!', { id: tid })
    } catch (err:any) {
      toast.error('Failed to update section', { id: tid })
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative">
      {/* overlay that blocks interaction */}
      <LoadingOverlay show={loading} label="Saving WeWork section…" />

      <div className={loading ? "pointer-events-none opacity-60" : ""}>
        <h2 className="text-xl font-semibold">WeWork Section</h2>

        <div className="space-y-2">
          <Label>Title</Label>
          <Input value={title} onChange={(e)=>setTitle(e.target.value)} disabled={loading}/>
        </div>

        <div className="space-y-2 mt-4">
          <Label>Subtitle</Label>
          <Input value={subtitle} onChange={(e)=>setSubtitle(e.target.value)} disabled={loading}/>
        </div>

        <div className="space-y-4 mt-6">
          {mentors.map((mentor, index) => (
            <Card key={mentor.id ?? index}>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input value={mentor.name} onChange={(e)=>handleMentorChange(index,'name',e.target.value)} disabled={loading}/>
                </div>

                <div className="space-y-2">
                  <Label>Profession</Label>
                  <Input value={mentor.profession} onChange={(e)=>handleMentorChange(index,'profession',e.target.value)} disabled={loading}/>
                </div>

                <div className="space-y-2">
                  <Label>LinkedIn URL</Label>
                  <Input value={mentor.linkedin ?? ''} onChange={(e)=>handleMentorChange(index,'linkedin',e.target.value)} disabled={loading}/>
                </div>

                <div className="space-y-2">
                  <Label>Image</Label>
                  <UploadImage
                    folder="mentors"
                    value={mentor.imgSrc}
                    onChange={(url)=>handleMentorChange(index,'imgSrc',url)}
                    disabled={loading}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-4">
          <Button onClick={handleSubmit} disabled={loading}>Save</Button>
        </div>
      </div>
    </div>
  )
}
