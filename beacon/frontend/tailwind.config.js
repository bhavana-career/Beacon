/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        executive: {
          bg: '#FDFBF5',      // Warm ivory background
          card: '#FFFFFF',    // Pure white for cards
          gold: '#D4AF37',    // Champagne Gold accent
          goldHover: '#c19f32', 
          text: '#1C1C1C',    // Near black primary text
          textMuted: '#6B7280', // Muted gray secondary text
          border: '#E5E7EB',  // Very soft border
          surface: '#F9FAFB', // Very soft surface for inner elements
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
