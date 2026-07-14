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
          bg: '#FDFBF5',      // Warm Ivory
          card: '#FFFFFF',    // Pure White
          gold: '#D4AF37',    // Champagne Gold
          goldMetallic: '#C9A227', 
          goldHighlight: '#F6E27A',
          text: '#1C1C1C',    // Near Black
          textMuted: '#6B7280', // Muted Gray
          border: '#E5E7EB',  
          surface: '#F9FAFB', 
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
