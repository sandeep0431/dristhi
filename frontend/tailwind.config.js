/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        drishti: {
          bg: '#030817',
          surface: '#071226',
          card: 'rgba(12, 25, 48, 0.72)',
          'card-hover': 'rgba(18, 38, 70, 0.85)',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-highlight': 'rgba(77, 163, 255, 0.3)',
          primary: '#4DA3FF',
          bright: '#7CC4FF',
          cyan: '#38BDF8',
          success: '#42D6A4',
          warning: '#F5B942',
          danger: '#FF5D67',
          text: '#F5F8FF',
          muted: '#8C9AB5',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-blue': '0 0 35px -5px rgba(77, 163, 255, 0.25)',
        'glow-cyan': '0 0 35px -5px rgba(56, 189, 248, 0.25)',
        'glow-danger': '0 0 35px -5px rgba(255, 93, 103, 0.35)',
        'glow-warning': '0 0 35px -5px rgba(245, 185, 66, 0.35)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'drill-motion': 'drillDown 8s ease-in-out infinite',
      },
      keyframes: {
        drillDown: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(24px)' },
        }
      }
    },
  },
  plugins: [],
}
