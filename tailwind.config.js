/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        biajan: {
          dark: '#0B0F17',
          surface: '#121824',
          card: '#182030',
          hover: '#1F293D',
          border: '#2A364F',
          text: '#F1F5F9',
          muted: '#94A3B8',
          subtle: '#64748B',
          accent: '#0D9488', // professional deep teal
          accentHover: '#14B8A6',
          accentGlow: 'rgba(20, 184, 166, 0.15)',
          warning: '#F59E0B',
          danger: '#EF4444',
          success: '#10B981',
          info: '#3B82F6'
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      keyframes: {
        pulseSlow: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.85, transform: 'scale(1.05)' },
        },
        wave: {
          '0%': { height: '6px' },
          '50%': { height: '24px' },
          '100%': { height: '6px' },
        }
      },
      animation: {
        'pulse-slow': 'pulseSlow 2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
