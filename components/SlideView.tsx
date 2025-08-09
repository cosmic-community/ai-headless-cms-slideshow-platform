'use client'

import { Slide } from '@/types'
import ReactMarkdown from 'react-markdown'
import { getOptimizedImageUrl } from '@/lib/cosmic'

interface SlideViewProps {
  slide: Slide
  slideNumber: number
  totalSlides: number
  isActive?: boolean
  onNext?: () => void
  onPrevious?: () => void
  onExit?: () => void
}

export default function SlideView({ 
  slide, 
  slideNumber, 
  totalSlides, 
  isActive = true 
}: SlideViewProps) {
  const backgroundImageUrl = slide.metadata?.background_image?.imgix_url
  const slideType = slide.metadata?.slide_type?.value || 'Content Slide'
  
  const optimizedBackgroundUrl = backgroundImageUrl 
    ? getOptimizedImageUrl(backgroundImageUrl, { width: 1920, height: 1080, quality: 90 })
    : null

  return (
    <div 
      className={`
        relative w-full h-screen flex items-center justify-center p-8 md:p-16
        ${isActive ? 'animate-fade-in' : ''}
      `}
      style={{
        backgroundImage: optimizedBackgroundUrl ? `url(${optimizedBackgroundUrl})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Slide content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto text-center">
        {/* Slide type indicator */}
        <div className="mb-6">
          <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white/80 text-sm font-medium">
            {slideType}
          </span>
        </div>

        {/* Main title */}
        {slide.metadata?.title && (
          <h1 className={`
            font-bold text-white mb-6 animate-slide-up
            ${slideType === 'Title Slide' ? 'text-4xl md:text-6xl lg:text-7xl' : 'text-3xl md:text-4xl lg:text-5xl'}
          `}>
            {slide.metadata.title}
          </h1>
        )}

        {/* Subtitle */}
        {slide.metadata?.subtitle && (
          <p className={`
            text-white/90 font-medium mb-8 animate-slide-up
            ${slideType === 'Title Slide' ? 'text-xl md:text-2xl lg:text-3xl' : 'text-lg md:text-xl lg:text-2xl'}
          `} style={{ animationDelay: '0.1s' }}>
            {slide.metadata.subtitle}
          </p>
        )}

        {/* Content */}
        {slide.metadata?.content && (
          <div className={`
            slide-content text-left max-w-4xl mx-auto animate-slide-up
            ${slideType === 'Title Slide' ? 'text-center' : ''}
          `} style={{ animationDelay: '0.2s' }}>
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl md:text-4xl font-bold mb-6 text-white">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl md:text-2xl font-semibold mb-3 text-white">{children}</h3>
                ),
                p: ({ children }) => (
                  <p className="text-lg md:text-xl mb-4 text-white/90 leading-relaxed">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="list-none space-y-2 mb-4">{children}</ul>
                ),
                li: ({ children }) => (
                  <li className="text-lg md:text-xl text-white/90 flex items-start gap-3">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>{children}</span>
                  </li>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-blue-400 pl-6 py-4 my-6 bg-white/10 backdrop-blur-sm rounded-r-lg">
                    <div className="text-white/90 italic">{children}</div>
                  </blockquote>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-white">{children}</strong>
                ),
                code: ({ children }) => (
                  <code className="bg-black/30 px-2 py-1 rounded text-sm text-blue-200">{children}</code>
                ),
              }}
            >
              {slide.metadata.content}
            </ReactMarkdown>
          </div>
        )}

        {/* Slide counter - positioned at bottom */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 text-white/80 text-sm font-medium">
            {slideNumber} of {totalSlides}
          </div>
        </div>
      </div>

      {/* Click areas for navigation (invisible) */}
      <div className="absolute inset-0 flex">
        <div className="flex-1 cursor-pointer" /> {/* Left half - previous */}
        <div className="flex-1 cursor-pointer" /> {/* Right half - next */}
      </div>
    </div>
  )
}