/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      fontSize: {
        '10xl': '10rem',
        '11xl': '12rem',
        '12xl': '14rem',
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.6s ease-out',
        'slide-in-right': 'slide-in-right 0.5s ease-out',
        'slide-in-left': 'slide-in-left 0.5s ease-out',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      backdropBlur: {
        'xs': '2px',
        'strong': '12px',
      },
      textShadow: {
        'sm': '1px 1px 2px rgba(0, 0, 0, 0.5)',
        'DEFAULT': '2px 2px 4px rgba(0, 0, 0, 0.5)',
        'lg': '3px 3px 6px rgba(0, 0, 0, 0.5)',
        'xl': '4px 4px 8px rgba(0, 0, 0, 0.5)',
        '2xl': '5px 5px 10px rgba(0, 0, 0, 0.5)',
        'strong': '2px 2px 4px rgba(0, 0, 0, 0.8), 4px 4px 8px rgba(0, 0, 0, 0.6)',
        'medium': '1px 1px 2px rgba(0, 0, 0, 0.8), 2px 2px 4px rgba(0, 0, 0, 0.6)',
      },
      boxShadow: {
        'text': '2px 2px 4px rgba(0, 0, 0, 0.8)',
        'text-strong': '2px 2px 4px rgba(0, 0, 0, 0.8), 4px 4px 8px rgba(0, 0, 0, 0.6)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // Custom plugin for text shadows
    function({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-sm': {
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
        },
        '.text-shadow': {
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        },
        '.text-shadow-lg': {
          textShadow: '3px 3px 6px rgba(0, 0, 0, 0.5)',
        },
        '.text-shadow-xl': {
          textShadow: '4px 4px 8px rgba(0, 0, 0, 0.5)',
        },
        '.text-shadow-2xl': {
          textShadow: '5px 5px 10px rgba(0, 0, 0, 0.5)',
        },
        '.text-shadow-strong': {
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 4px 4px 8px rgba(0, 0, 0, 0.6), 6px 6px 12px rgba(0, 0, 0, 0.4)',
        },
        '.text-shadow-medium': {
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8), 2px 2px 4px rgba(0, 0, 0, 0.6), 3px 3px 6px rgba(0, 0, 0, 0.4)',
        },
        '.text-shadow-none': {
          textShadow: 'none',
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ],
}