'use client'

import { useState } from 'react'
import { Slide } from '@/types'
import { ChevronLeft, ChevronRight, X, Menu, Grid, Play, Pause } from 'lucide-react'

interface SlideNavigationProps {
  currentSlide: number
  totalSlides: number
  slides: Slide[]
  onSlideSelect: (slideNumber: number) => void
  onNext: () => void
  onPrevious: () => void
  onExit: () => void
}

export default function SlideNavigation({
  currentSlide,
  totalSlides,
  slides,
  onSlideSelect,
  onNext,
  onPrevious,
  onExit
}: SlideNavigationProps) {
  const [showThumbnails, setShowThumbnails] = useState(false)

  return (
    <>
      {/* Main navigation bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-50">
        {/* Left controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onExit}
            className="flex items-center gap-2 bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            title="Exit slideshow (ESC)"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Exit</span>
          </button>
        </div>

        {/* Center controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onPrevious}
            className="bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white p-2 rounded-lg transition-colors duration-200 disabled:opacity-50"
            disabled={currentSlide === 1}
            title="Previous slide (←)"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm font-medium min-w-[80px] text-center">
            {currentSlide} / {totalSlides}
          </div>

          <button
            onClick={onNext}
            className="bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white p-2 rounded-lg transition-colors duration-200 disabled:opacity-50"
            disabled={currentSlide === totalSlides}
            title="Next slide (→)"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowThumbnails(!showThumbnails)}
            className="flex items-center gap-2 bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            title="Show slide thumbnails"
          >
            <Grid className="w-4 h-4" />
            <span className="hidden sm:inline">Slides</span>
          </button>
        </div>
      </div>

      {/* Thumbnail overlay */}
      {showThumbnails && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-8">
          <div className="w-full max-w-6xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">All Slides</h2>
              <button
                onClick={() => setShowThumbnails(false)}
                className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-colors duration-200"
                title="Close thumbnails"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-h-[70vh] overflow-y-auto">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => {
                    onSlideSelect(index + 1)
                    setShowThumbnails(false)
                  }}
                  className={`
                    relative group bg-white/10 hover:bg-white/20 rounded-lg p-3 transition-all duration-200
                    ${currentSlide === index + 1 ? 'ring-2 ring-blue-400 bg-white/20' : ''}
                  `}
                >
                  {/* Thumbnail image */}
                  {slide.metadata?.background_image ? (
                    <div className="aspect-video bg-gray-800 rounded mb-2 overflow-hidden">
                      <img
                        src={`${slide.metadata.background_image.imgix_url}?w=300&h=169&fit=crop&auto=format,compress`}
                        alt={slide.metadata?.title || `Slide ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        width={150}
                        height={84}
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-blue-600 to-purple-600 rounded mb-2 flex items-center justify-center">
                      <div className="text-white text-2xl font-bold">
                        {index + 1}
                      </div>
                    </div>
                  )}

                  {/* Slide info */}
                  <div className="text-left">
                    <div className="text-white text-sm font-medium mb-1 line-clamp-2">
                      {slide.metadata?.title || `Slide ${index + 1}`}
                    </div>
                    <div className="text-white/60 text-xs">
                      {slide.metadata?.slide_type?.value || 'Content Slide'}
                    </div>
                  </div>

                  {/* Current slide indicator */}
                  {currentSlide === index + 1 && (
                    <div className="absolute top-2 right-2">
                      <div className="bg-blue-500 text-white rounded-full p-1">
                        <Play className="w-3 h-3" />
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Keyboard shortcuts help */}
            <div className="mt-6 text-center text-white/60 text-sm">
              <p>Use arrow keys, space bar, or number keys to navigate • Press F for fullscreen • ESC to exit</p>
            </div>
          </div>
        </div>
      )}

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20 z-40">
        <div 
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${(currentSlide / totalSlides) * 100}%` }}
        />
      </div>
    </>
  )
}