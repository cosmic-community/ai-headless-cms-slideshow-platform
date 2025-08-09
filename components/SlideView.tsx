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
        relative w-full min-h-screen flex flex-col justify-start p-6 md:p-12 lg:p-16 pb-24
        ${isActive ? 'animate-fade-in' : ''}
      `}
      style={{
        backgroundImage: optimizedBackgroundUrl ? `url(${optimizedBackgroundUrl})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Enhanced dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/60" />
      
      {/* Slide content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Slide type indicator */}
        <div className="mb-8 text-center">
          <span className="inline-block px-6 py-3 bg-white/25 backdrop-blur-md rounded-full text-white font-semibold text-sm border border-white/20 shadow-lg">
            {slideType}
          </span>
        </div>

        {/* Main title */}
        {slide.metadata?.title && (
          <div className="text-center mb-8">
            <h1 className={`
              font-black text-white mb-6 animate-slide-up leading-tight
              drop-shadow-2xl text-shadow-strong
              ${slideType === 'Title Slide' 
                ? 'text-4xl md:text-6xl lg:text-8xl xl:text-9xl' 
                : 'text-3xl md:text-5xl lg:text-6xl xl:text-7xl'
              }
            `}>
              {slide.metadata.title}
            </h1>
          </div>
        )}

        {/* Subtitle */}
        {slide.metadata?.subtitle && (
          <div className="text-center mb-12">
            <p className={`
              text-white font-semibold animate-slide-up leading-relaxed
              drop-shadow-xl text-shadow-medium
              ${slideType === 'Title Slide' 
                ? 'text-xl md:text-3xl lg:text-4xl xl:text-5xl' 
                : 'text-lg md:text-2xl lg:text-3xl xl:text-4xl'
              }
            `} style={{ animationDelay: '0.1s' }}>
              {slide.metadata.subtitle}
            </p>
          </div>
        )}

        {/* Content */}
        {slide.metadata?.content && (
          <div className={`
            slide-content animate-slide-up mx-auto
            ${slideType === 'Title Slide' 
              ? 'text-center max-w-5xl' 
              : 'text-left max-w-6xl'
            }
          `} style={{ animationDelay: '0.2s' }}>
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10 shadow-2xl">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 text-white drop-shadow-xl text-shadow-strong leading-tight">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 text-white drop-shadow-lg text-shadow-medium leading-tight">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl md:text-3xl lg:text-4xl font-bold mb-4 text-blue-200 drop-shadow-lg text-shadow-medium leading-tight">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-lg md:text-2xl lg:text-3xl mb-6 text-white leading-relaxed drop-shadow-lg font-medium">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-none space-y-4 mb-8">{children}</ul>
                  ),
                  li: ({ children }) => (
                    <li className="text-lg md:text-2xl lg:text-3xl text-white flex items-start gap-4 leading-relaxed drop-shadow-lg font-medium">
                      <span className="text-blue-300 mt-2 text-2xl md:text-3xl lg:text-4xl font-bold">•</span>
                      <span className="flex-1">{children}</span>
                    </li>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-8 border-blue-400 pl-8 py-6 my-8 bg-white/20 backdrop-blur-md rounded-r-2xl shadow-xl">
                      <div className="text-white italic text-xl md:text-2xl lg:text-3xl font-medium drop-shadow-lg leading-relaxed">
                        {children}
                      </div>
                    </blockquote>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-black text-yellow-200 drop-shadow-lg text-shadow-medium">
                      {children}
                    </strong>
                  ),
                  code: ({ children }) => (
                    <code className="bg-black/60 border border-white/20 px-3 py-2 rounded-lg text-lg md:text-xl text-blue-200 font-mono backdrop-blur-sm">
                      {children}
                    </code>
                  ),
                  hr: () => (
                    <hr className="border-white/30 my-8 border-t-2" />
                  ),
                  em: ({ children }) => (
                    <em className="text-blue-200 font-semibold">
                      {children}
                    </em>
                  ),
                }}
              >
                {slide.metadata.content}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>

      {/* Slide counter - fixed at bottom */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-black/60 backdrop-blur-md rounded-full px-6 py-3 text-white font-bold text-lg border border-white/20 shadow-lg">
          {slideNumber} of {totalSlides}
        </div>
      </div>

      {/* Click areas for navigation (invisible) */}
      <div className="fixed inset-0 flex pointer-events-none">
        <div className="flex-1 cursor-pointer pointer-events-auto" /> {/* Left half - previous */}
        <div className="flex-1 cursor-pointer pointer-events-auto" /> {/* Right half - next */}
      </div>
    </div>
  )
}