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
        cinema: {
          void: '#030107',
          deep: '#0a0813',
          card: 'rgba(13, 11, 26, 0.45)',
          gold: {
            DEFAULT: '#D4AF37',
            light: '#F3E5AB',
            dark: '#AA7C11',
          },
          purple: {
            DEFAULT: '#7B2CBF',
            light: '#9D4EDD',
            dark: '#5A189A',
          },
          blue: {
            DEFAULT: '#00F5D4',
            light: '#70E000',
            dark: '#00B4D8',
          },
          neon: {
            cyan: '#00F0FF',
            magenta: '#FF007A',
            yellow: '#FFD700',
          }
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      animation: {
        'glow-slow': 'glow 8s ease-in-out infinite alternate',
        'float-slow': 'float 12s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 10px rgba(123, 44, 191, 0.2), 0 0 20px rgba(0, 245, 212, 0.1)' },
          '100%': { boxShadow: '0 0 25px rgba(123, 44, 191, 0.6), 0 0 40px rgba(0, 245, 212, 0.3)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(0.5deg)' },
        }
      },
    },
  },
  plugins: [],
}
