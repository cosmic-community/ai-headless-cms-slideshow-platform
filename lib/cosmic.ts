import { createBucketClient } from '@cosmicjs/sdk'
import { CosmicResponse, Slide, Slideshow } from '../types'

// Create Cosmic client
export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging'
})

// Fetch all slideshows with their connected slides
export async function getSlideshows(): Promise<Slideshow[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'slideshows' })
      .depth(1)
      .props(['id', 'title', 'slug', 'metadata'])
    
    return response.objects as Slideshow[]
  } catch (error) {
    if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
      return []
    }
    console.error('Error fetching slideshows:', error)
    throw new Error('Failed to fetch slideshows')
  }
}

// Fetch a specific slideshow by slug
export async function getSlideshow(slug: string): Promise<Slideshow | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'slideshows',
        slug
      })
      .depth(1)
    
    const slideshow = response.object as Slideshow
    
    // Sort slides by slide_number if they exist
    if (slideshow.metadata?.slides && Array.isArray(slideshow.metadata.slides)) {
      slideshow.metadata.slides.sort((a: Slide, b: Slide) => {
        const aNumber = a.metadata?.slide_number || 0
        const bNumber = b.metadata?.slide_number || 0
        return aNumber - bNumber
      })
    }
    
    return slideshow
  } catch (error) {
    if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
      return null
    }
    console.error('Error fetching slideshow:', error)
    throw new Error('Failed to fetch slideshow')
  }
}

// Fetch all individual slides (not connected to slideshows)
export async function getSlides(): Promise<Slide[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'slides' })
      .sort('metadata.slide_number')
      .props(['id', 'title', 'slug', 'metadata'])
    
    return response.objects as Slide[]
  } catch (error) {
    if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
      return []
    }
    console.error('Error fetching slides:', error)
    throw new Error('Failed to fetch slides')
  }
}

// Fetch a specific slide by slug
export async function getSlide(slug: string): Promise<Slide | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'slides',
        slug
      })
    
    return response.object as Slide
  } catch (error) {
    if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
      return null
    }
    console.error('Error fetching slide:', error)
    throw new Error('Failed to fetch slide')
  }
}

// Helper function to get optimized image URL
export function getOptimizedImageUrl(
  imageUrl: string, 
  options: { width?: number; height?: number; quality?: number } = {}
): string {
  const { width = 1920, height = 1080, quality = 80 } = options
  
  if (!imageUrl) return ''
  
  // If it's already an imgix URL, add parameters
  if (imageUrl.includes('imgix.cosmicjs.com')) {
    return `${imageUrl}?w=${width}&h=${height}&fit=crop&auto=format,compress&q=${quality}`
  }
  
  // If it's a regular Cosmic URL, convert to imgix
  if (imageUrl.includes('cdn.cosmicjs.com')) {
    const imgixUrl = imageUrl.replace('cdn.cosmicjs.com', 'imgix.cosmicjs.com')
    return `${imgixUrl}?w=${width}&h=${height}&fit=crop&auto=format,compress&q=${quality}`
  }
  
  return imageUrl
}