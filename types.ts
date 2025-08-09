// Comprehensive type definitions for Cosmic slideshow objects

// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  status?: string;
  published_at?: string;
  thumbnail?: string;
}

// Slide type definition
export interface Slide extends CosmicObject {
  type: 'slides';
  metadata: {
    slide_number: number;
    title: string;
    subtitle?: string;
    content?: string;
    background_image?: {
      url: string;
      imgix_url: string;
    };
    slide_type?: {
      key: string;
      value: SlideType;
    };
  };
}

// Slideshow type definition
export interface Slideshow extends CosmicObject {
  type: 'slideshows';
  metadata: {
    title: string;
    description?: string;
    presentation_date?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    slides?: Slide[];
  };
}

// Type literals for slide types
export type SlideType = 'Title Slide' | 'Content Slide' | 'Conclusion Slide';

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Type guards for runtime validation
export function isSlide(obj: CosmicObject): obj is Slide {
  return obj.type === 'slides';
}

export function isSlideshow(obj: CosmicObject): obj is Slideshow {
  return obj.type === 'slideshows';
}

// Component prop types
export interface SlideProps {
  slide: Slide;
  isActive?: boolean;
  slideNumber: number;
  totalSlides: number;
  onNext?: () => void;
  onPrevious?: () => void;
  onExit?: () => void;
}

export interface SlideshowProps {
  slideshow: Slideshow;
}

export interface NavigationProps {
  currentSlide: number;
  totalSlides: number;
  slides: Slide[];
  onSlideSelect: (slideNumber: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  onExit: () => void;
}

// Utility types
export type OptionalSlideMetadata = Partial<Slide['metadata']>;
export type CreateSlideData = Omit<Slide, 'id' | 'created_at' | 'modified_at'>;