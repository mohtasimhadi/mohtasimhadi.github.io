'use client'

import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-full text-gray-800">
      <div className="flex flex-col items-center space-y-4 animate-fade-in">
        <Loader2 className="h-12 w-12 animate-spin text-black" />
      </div>
    </div>
  )
}