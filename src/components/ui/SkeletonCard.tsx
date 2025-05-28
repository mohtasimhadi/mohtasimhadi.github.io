import React from 'react'
import { Skeleton } from './skeleton'

export default function SkeletonCard() {
      return (
            <div className="border overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-4 space-y-2">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                  </div>
            </div>
      )
}
