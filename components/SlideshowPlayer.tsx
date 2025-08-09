'use client'

import { useState, useEffect, useCallback } from 'react'
import { Slideshow } from '@/types'
import SlideView from './SlideView'
import SlideNavigation from './SlideNavigation'
import { useRouter } from 'next/navigation'

interface SlideshowPlayerProps {
  slideshow: Slideshow
}

export default function SlideshowPlayer({ slideshow }: SlideshowPlayerProps) {
  const router = useRouter()
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  
  const slides = slideshow.metadata?.slides || []
  const totalSlides = slides.length

  // Navigation functions
  const goToNextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % totalSlides)
  }, [totalSlides])

  const goToPreviousSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
  }, [totalSlides])

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlideIndex(index)
      // Scroll to top when changing slides
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [totalSlides])

  const exitSlideshow = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    }
    router.push('/')
  }, [router])

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }, [])

  // Keyboard event handler
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowRight':
        case ' ': // Space bar
          event.preventDefault()
          goToNextSlide()
          break
        case 'ArrowLeft':
          event.preventDefault()
          goToPreviousSlide()
          break
        case 'Home':
          event.preventDefault()
          goToSlide(0)
          break
        case 'End':
          event.preventDefault()
          goToSlide(totalSlides - 1)
          break
        case 'Escape':
          event.preventDefault()
          if (document.fullscreenElement) {
            document.exitFullscreen()
          } else {
            exitSlideshow()
          }
          break
        case 'f':
        case 'F':
          event.preventDefault()
          toggleFullscreen()
          break
        default:
          // Handle number keys (1-9) for direct slide navigation
          const slideNumber = parseInt(event.key)
          if (slideNumber >= 1 && slideNumber <= 9 && slideNumber <= totalSlides) {
            event.preventDefault()
            goToSlide(slideNumber - 1)
          }
          break
      }
    }

    // Fullscreen change handler
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('fullscreenchange', handleFullscreenChange)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [goToNextSlide, goToPreviousSlide, goToSlide, exitSlideshow, toggleFullscreen, totalSlides])

  // Scroll to top when slide changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentSlideIndex])

  // Prevent context menu and text selection during presentation
  useEffect(() => {
    const preventContextMenu = (e: MouseEvent) => e.preventDefault()
    const preventTextSelection = () => {
      document.body.style.userSelect = 'none'
      return false
    }

    document.addEventListener('contextmenu', preventContextMenu)
    document.addEventListener('selectstart', preventTextSelection)

    return () => {
      document.removeEventListener('contextmenu', preventContextMenu)
      document.removeEventListener('selectstart', preventTextSelection)
      document.body.style.userSelect = 'auto'
    }
  }, [])

  if (!slides || slides.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">No Slides Available</h1>
          <p className="text-xl text-white/80">This slideshow is empty.</p>
        </div>
      </div>
    )
  }

  const currentSlide = slides[currentSlideIndex]

  // Add safety check for currentSlide before rendering
  if (!currentSlide) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Slide Not Found</h1>
          <p className="text-xl text-white/80">The requested slide could not be loaded.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative bg-black">
      {/* Main slide view */}
      <SlideView
        slide={currentSlide}
        slideNumber={currentSlideIndex + 1}
        totalSlides={totalSlides}
        isActive={true}
        onNext={goToNextSlide}
        onPrevious={goToPreviousSlide}
        onExit={exitSlideshow}
      />

      {/* Navigation overlay - hidden in fullscreen */}
      {!isFullscreen && (
        <SlideNavigation
          currentSlide={currentSlideIndex + 1}
          totalSlides={totalSlides}
          slides={slides}
          onSlideSelect={(slideNumber) => goToSlide(slideNumber - 1)}
          onNext={goToNextSlide}
          onPrevious={goToPreviousSlide}
          onExit={exitSlideshow}
        />
      )}

      {/* Fullscreen controls */}
      {isFullscreen && (
        <div className="fixed top-4 right-4 flex items-center gap-2 z-50">
          <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-sm">
            {currentSlideIndex + 1} / {totalSlides}
          </div>
        </div>
      )}

      {/* Progress indicator */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-black/20 z-40">
        <div 
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${((currentSlideIndex + 1) / totalSlides) * 100}%` }}
        />
      </div>
    </div>
  )
}