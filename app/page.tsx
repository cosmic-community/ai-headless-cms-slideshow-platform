import { getSlideshows } from '@/lib/cosmic'
import Link from 'next/link'
import { Calendar, Play, FileText } from 'lucide-react'

export default async function HomePage() {
  const slideshows = await getSlideshows()

  if (!slideshows || slideshows.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">No Slideshows Found</h1>
          <p className="text-xl text-white/80">
            No presentation data available in your Cosmic bucket.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            AI & Headless CMS
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto animate-slide-up">
            Professional slideshow presentations exploring the future of content management
          </p>
        </div>

        {/* Slideshows Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {slideshows.map((slideshow) => (
            <div
              key={slideshow.id}
              className="group relative bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              {/* Featured Image */}
              {slideshow.metadata?.featured_image && (
                <div className="relative mb-6 rounded-lg overflow-hidden">
                  <img
                    src={`${slideshow.metadata.featured_image.imgix_url}?w=600&h=300&fit=crop&auto=format,compress`}
                    alt={slideshow.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    width={300}
                    height={150}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
              )}

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white group-hover:text-blue-200 transition-colors duration-300">
                  {slideshow.title}
                </h2>
                
                {slideshow.metadata?.description && (
                  <p className="text-white/80 line-clamp-3">
                    {slideshow.metadata.description}
                  </p>
                )}

                <div className="flex items-center justify-between text-sm text-white/60">
                  {slideshow.metadata?.presentation_date && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(slideshow.metadata.presentation_date).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  
                  {slideshow.metadata?.slides && (
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span>{slideshow.metadata.slides.length} slides</span>
                    </div>
                  )}
                </div>

                <Link
                  href={`/slideshow/${slideshow.slug}`}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 group"
                >
                  <Play className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  Start Presentation
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-white/60">
          <p>Built with Next.js and powered by Cosmic CMS</p>
        </div>
      </div>
    </div>
  )
}