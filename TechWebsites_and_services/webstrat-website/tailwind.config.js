/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        '3xl': '1920px',
        '4xl': '2560px',
      },
      colors: {
        webstrat: {
          50: '#f0f7ff',
          100: '#e0efff',
          200: '#bae2ff',
          300: '#60a5fa',  // More vibrant blue
          400: '#3b82f6',  // Classic vibrant blue
          500: '#1d4ed8',  // Rich royal blue
          600: '#1e40af',  // Deep professional blue
          700: '#0361a7',
          800: '#07528a',
          900: '#0c4372',
          950: '#082b4b',
        },
        navy: {
          50: '#f6f8fc',
          100: '#ebf1f8',
          200: '#d3e2ef',
          300: '#abcce0',
          400: '#7db1ce',
          500: '#5a96bd',
          600: '#467ba0',
          700: '#3a6382',
          800: '#33536c',
          900: '#2e465a',
          950: '#1e2e3c',
        },
        dark: {
          50: '#1a1f2e',
          100: '#161a26',
          200: '#13151f',
          300: '#0f1118',
          400: '#0c0e14',
          500: '#080a10',
          600: '#05060b',
          700: '#030407',
          800: '#020304',
          900: '#010101',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'Courier New', 'monospace'],
        tech: ['Orbitron', 'Exo 2', 'Rajdhani', 'Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'slide-in-right': 'slideInRight 0.8s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgb(3, 97, 167)' },
          '100%': { boxShadow: '0 0 20px rgb(3, 97, 167), 0 0 30px rgb(3, 97, 167)' },
        },
      },
    },
  },
  plugins: [],
}
