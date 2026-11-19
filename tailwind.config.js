/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"SF Pro Text"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['"SF Mono"', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      colors: {
        mac: {
          bg: 'rgba(240, 243, 248, 0.75)',
          darkBg: 'rgba(30, 32, 40, 0.85)',
          glass: 'rgba(255, 255, 255, 0.22)',
          darkGlass: 'rgba(20, 22, 30, 0.55)',
          border: 'rgba(255, 255, 255, 0.35)',
          darkBorder: 'rgba(255, 255, 255, 0.12)',
          accent: '#007AFF',
          sidebar: 'rgba(246, 246, 246, 0.65)',
          darkSidebar: 'rgba(28, 28, 30, 0.65)',
        },
      },
      boxShadow: {
        'mac-window': '0 22px 70px 4px rgba(0, 0, 0, 0.36), 0 0 0 1px rgba(255, 255, 255, 0.15) inset',
        'mac-dock': '0 20px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4), inset 0 -1px 0 rgba(0, 0, 0, 0.2)',
        'neumorph-raised': '8px 8px 16px rgba(163, 177, 198, 0.4), -8px -8px 16px rgba(255, 255, 255, 0.8)',
        'neumorph-dark-raised': '6px 6px 14px rgba(0, 0, 0, 0.45), -6px -6px 14px rgba(255, 255, 255, 0.05)',
        'neumorph-inset': 'inset 3px 3px 6px rgba(163, 177, 198, 0.4), inset -3px -3px 6px rgba(255, 255, 255, 0.8)',
        'neumorph-dark-inset': 'inset 3px 3px 6px rgba(0, 0, 0, 0.5), inset -3px -3px 6px rgba(255, 255, 255, 0.05)',
        'mac-menu': '0 8px 32px 0 rgba(0, 0, 0, 0.18)',
      },
      backdropBlur: {
        '2xl': '40px',
        '3xl': '60px',
      },
      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(1deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '0.9' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        }
      },
      animation: {
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
