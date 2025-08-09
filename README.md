# AI & Headless CMS Slideshow Platform

![Slideshow Preview](https://imgix.cosmicjs.com/1b3a4be0-74ea-11f0-a051-23c10f41277a-photo-1677442136019-21780ecad995-1754720927156.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A professional slideshow presentation platform built with Next.js that showcases your tech presentation about AI and headless CMS benefits. Features interactive navigation, dynamic content rendering, and responsive design for modern presentations.

## ✨ Features

- **📊 Interactive Slideshow** - Full-screen presentation with smooth transitions
- **⌨️ Keyboard Navigation** - Arrow keys, space bar, and ESC for easy control
- **📱 Responsive Design** - Perfect viewing experience on all devices
- **🎨 Dynamic Backgrounds** - Automatically loads slide background images
- **📝 Markdown Support** - Rich content rendering for slide content
- **🎯 Slide Types** - Supports title, content, and conclusion slide layouts
- **🔄 Progress Tracking** - Visual slide counter and progress indicators
- **🖼️ Thumbnail Navigation** - Quick slide selection with thumbnail preview

## Clone this Bucket and Code Repository

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Bucket and Code Repository](https://img.shields.io/badge/Clone%20this%20Bucket-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=6896e9dbf03b84c0e9a979d4&clone_repository=6896eb872987c1a81b77a85e)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a slide show for a tech presentation about the benefits of AI and headless CMS"

### Code Generation Prompt

> Build a slide show using Next.js that uses my existing objects in this bucket

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic CMS** - Headless content management
- **React Markdown** - Markdown content rendering
- **Lucide React** - Modern icon library

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account and bucket

### Installation

1. **Clone this repository**
   ```bash
   git clone <your-repo-url>
   cd slideshow-platform
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your Cosmic credentials:
   ```
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

4. **Run the development server**
   ```bash
   bun run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📚 Cosmic SDK Examples

### Fetching Slideshows
```typescript
const slideshows = await cosmic.objects
  .find({ type: 'slideshows' })
  .depth(1)
  .props(['id', 'title', 'slug', 'metadata'])
```

### Getting Individual Slides
```typescript
const slides = await cosmic.objects
  .find({ type: 'slides' })
  .sort('metadata.slide_number')
  .props(['id', 'title', 'slug', 'metadata'])
```

### Dynamic Slideshow Content
```typescript
const slideshow = await cosmic.objects
  .findOne({ type: 'slideshows', slug: 'presentation-slug' })
  .depth(1)
```

## 🎨 Cosmic CMS Integration

This application leverages your Cosmic bucket's content structure:

- **Slideshows** - Main presentation containers with metadata
- **Slides** - Individual slides with slide numbers, content, and backgrounds
- **Object Relationships** - Slideshows contain multiple connected slides
- **File Uploads** - Background images with imgix optimization
- **Select Dropdowns** - Slide type categorization (title, content, conclusion)

## 🚀 Deployment Options

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Add environment variables in dashboard
3. Deploy automatically on git push

### Netlify
1. Connect repository to Netlify
2. Set build command: `bun run build`
3. Add environment variables
4. Deploy

### Other Platforms
This Next.js application can be deployed to any platform supporting Node.js applications.

---

Built with ❤️ using [Cosmic](https://www.cosmicjs.com/docs) headless CMS
<!-- README_END -->