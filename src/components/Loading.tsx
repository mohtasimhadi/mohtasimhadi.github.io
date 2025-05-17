'use client'

export default function Loading() {
      return (
            <div className="border border-gray-200 rounded-lg p-4 animate-pulse">
                  <div className="flex items-start gap-3">
                        {/* Image placeholder */}
                        <div className="w-16 h-16 bg-slate-200 rounded-md"></div>

                        <div className="flex-1 space-y-2">
                              {/* Title placeholder */}
                              <div className="h-5 bg-slate-200 rounded w-3/4"></div>

                              {/* Description placeholder */}
                              <div className="space-y-1">
                                    <div className="h-3 bg-slate-200 rounded"></div>
                                    <div className="h-3 bg-slate-200 rounded w-5/6"></div>
                              </div>

                              {/* Date and tags placeholder */}
                              <div className="flex justify-between items-center pt-2">
                                    <div className="h-3 bg-slate-200 rounded w-20"></div>
                                    <div className="flex gap-1">
                                          <div className="h-5 w-12 bg-slate-200 rounded-full"></div>
                                          <div className="h-5 w-12 bg-slate-200 rounded-full"></div>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      )
}
