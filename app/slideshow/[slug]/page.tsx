// app/slideshow/[slug]/page.tsx
import { getSlideshow } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import SlideshowPlayer from '@/components/SlideshowPlayer'
import { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const slideshow = await getSlideshow(slug)
  
  if (!slideshow) {
    return {
      title: 'Slideshow Not Found'
    }
  }
  
  return {
    title: `${slideshow.title} - AI & Headless CMS Slideshow`,
    description: slideshow.metadata?.description || 'Professional slideshow presentation',
    openGraph: {
      title: slideshow.title,
      description: slideshow.metadata?.description || '',
      images: slideshow.metadata?.featured_image ? [
        {
          url: `${slideshow.metadata.featured_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`,
          width: 1200,
          height: 630,
          alt: slideshow.title,
        }
      ] : [],
    },
  }
}

export default async function SlideshowPage({ params }: PageProps) {
  const { slug } = await params
  const slideshow = await getSlideshow(slug)

  if (!slideshow) {
    notFound()
  }

  // Check if slideshow has slides
  if (!slideshow.metadata?.slides || slideshow.metadata.slides.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">No Slides Available</h1>
          <p className="text-xl text-white/80">
            This slideshow doesn't contain any slides yet.
          </p>
        </div>
      </div>
    )
  }

  return <SlideshowPlayer slideshow={slideshow} />
}