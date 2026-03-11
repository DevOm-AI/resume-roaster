/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Archivo Black"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        flame: {
          50:  '#fff7ed',
          100: '#ffedd5',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
        },
        roast: {
          bg:    '#0d0d0d',
          card:  '#161616',
          border:'#2a2a2a',
          muted: '#666666',
        }
      },
      animation: {
        'fire': 'fire 1s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fire: {
          '0%':   { transform: 'scaleY(1) scaleX(1)', filter: 'hue-rotate(0deg)' },
          '100%': { transform: 'scaleY(1.08) scaleX(0.96)', filter: 'hue-rotate(10deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        slideUp: {
          '0%':   { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(249,115,22,0.3)' },
          '50%':      { boxShadow: '0 0 40px rgba(249,115,22,0.6)' },
        }
      }
    },
  },
  plugins: [],
}
