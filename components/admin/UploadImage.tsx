'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'

interface UploadImageProps {
  value: string
  onChange: (url: string) => void
  folder?: string
}

export function UploadImage({ value, onChange, folder = 'uploads' }: UploadImageProps) {
  const [uploading, setUploading] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', folder)

    setUploading(true)
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      const data = await res.json()
      if (res.ok && data.path) {
        onChange(data.path)
      } else {
        alert('Upload failed. Please try again.')
      }
    } catch (error) {
      console.error('Upload failed', error)
      alert('Something went wrong during upload.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      {value && (
        <div className="relative w-32 h-32 rounded border">
          <Image src={value} alt="Uploaded" fill className="object-cover rounded" />
        </div>
      )}

      <Input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
      />

      <div className="text-sm text-muted-foreground">
        {uploading ? 'Uploading...' : 'Allowed: .png, .jpg, .jpeg'}
      </div>
    </div>
  )
}
