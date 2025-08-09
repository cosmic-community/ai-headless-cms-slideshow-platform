// app/slideshow/[slug]/not-found.tsx
import Link from 'next/link'
import { ArrowLeft, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
      <div className="text-center text-white max-w-md mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Slideshow Not Found
          </h2>
          <p className="text-lg text-white/80 mb-8">
            The slideshow you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          
          <div className="text-white/60">
            <p>or</p>
          </div>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 border border-white/30 hover:bg-white/10 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}