import React from 'react'
import { Skeleton } from './skeleton'

export default function SkeletonArticle() {
      return (
            <div className="overflow-hidden">
                  <Skeleton className="h-72 w-full" />
                  <div className="flex justify-between p-4">
                        <Skeleton className="h-3 w-16" />
                        <div className="flex space-x-2 w-1/4 justify-end">
                              <Skeleton className="h-6 w-6" />
                              <Skeleton className="h-6 w-6" />
                              <Skeleton className="h-6 w-6" />
                              <Skeleton className="h-6 w-6" />
                        </div>
                  </div>

                  <div className="p-4 space-y-2 border-b-1">
                        <Skeleton className="h-3 w-1/6" />
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                  </div>
                  <div className="space-y-2 p-3">
                        <Skeleton className="h-48 w-full p-4" />
                        {[...Array(3)].map((_, i) => (
                              <Skeleton key={i} className="h-3 w-full p-4" />
                        ))}
                        <Skeleton className="h-78 w-full p-4" />
                        {[...Array(7)].map((_, i) => (
                              <Skeleton key={i} className="h-3 w-full p-4" />
                        ))}
                  </div>

            </div>
      )
}
