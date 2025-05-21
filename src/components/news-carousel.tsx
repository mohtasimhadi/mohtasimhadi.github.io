"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { ParsedPage } from "@/types/notion"

interface NewsCarouselProps {
  items: ParsedPage[]
  loading: boolean
}

export default function NewsCarousel({ items, loading }: NewsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1))
    resetAutoPlay()
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1))
    resetAutoPlay()
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    resetAutoPlay()
  }

  const resetAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
    }

    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(goToNext, 5000)
    }
  }

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying)
  }

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(goToNext, 5000)
    } else if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isAutoPlaying, items.length])

  if (loading) {
    return <div className="h-96 bg-slate-100 animate-pulse"></div>
  }

  if (items.length === 0) {
    return <p className="text-slate-500 p-8 text-center">No news to display</p>
  }

  const currentItem = items[currentIndex]

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div className="relative h-96 md:h-[500px]">
          {/* Background image with overlay */}
          <div className="absolute inset-0 bg-slate-900">
            {currentItem.cover && (
              <img
                src={currentItem.cover || "/placeholder.svg"}
                alt=""
                className="w-full h-full object-cover opacity-30"
              />
            )}
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center">
              {/* Image */}
              <div className="w-full md:w-1/2 mb-8 md:mb-0 flex justify-center md:justify-end">
                {currentItem.cover ? (
                  <div className="w-full max-w-md h-48 md:h-64 overflow-hidden">
                    <img
                      src={currentItem.cover || "/placeholder.svg"}
                      alt={currentItem.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full max-w-md h-48 md:h-64 bg-slate-800"></div>
                )}
              </div>

              {/* Text content */}
              <div className="w-full md:w-1/2 md:pl-12 text-white">
                <div className="inline-block bg-slate-700 text-white text-xs px-3 py-1 mb-4">
                  {currentItem.type}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">{currentItem.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300 text-sm">
                    {currentItem.date ? new Date(currentItem.date).toLocaleDateString() : "No date"}
                  </span>
                  <Link
                    href={`/news/${currentItem.id}`}
                    className="bg-white text-slate-900 px-4 py-2 hover:bg-slate-100 transition font-medium text-sm"
                  >
                    Read more
                  </Link>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation controls */}
      <div className="absolute inset-x-0 bottom-4 flex justify-center items-center gap-2 z-10">
        {items.map((_, index) => (
          <button
            key={`indicator-${index}`}
            onClick={() => goToSlide(index)}
            className={`h-2 w-2 transition-all duration-300 ${index === currentIndex ? "bg-white w-6" : "bg-white/50"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Side controls */}
      {items.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/30 text-white transition z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/30 text-white transition z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Auto-play toggle */}
      <button
        onClick={toggleAutoPlay}
        className={`absolute top-4 right-4 p-2 ${isAutoPlaying ? "bg-white text-slate-900" : "bg-slate-700 text-white"
          } z-10 text-xs flex items-center gap-1`}
        aria-label={isAutoPlaying ? "Pause auto-play" : "Start auto-play"}
      >
        {isAutoPlaying ? (
          <>
            <span className="sr-only">Pause</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          </>
        ) : (
          <>
            <span className="sr-only">Play</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </>
        )}
      </button>
    </div>
  )
}
