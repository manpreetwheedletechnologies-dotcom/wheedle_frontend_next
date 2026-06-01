/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        inter: ['Inter', 'sans-serif'],
        gotham: ['Gotham', 'Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f5f3ff', 100: '#ede9fe', 200: '#ddd6fe', 300: '#c4b5fd',
          400: '#a78bfa', 500: '#8b5cf6', 600: '#7c3aed', 700: '#6d28d9',
          800: '#5b21b6', 900: '#4c1d95',
        },
        secondary: {
          400: '#22d3ee', 500: '#06b6d4', 600: '#0891b2',
        },
        dark: {
          50: '#f9fafb', 100: '#f3f4f6', 200: '#e5e7eb', 300: '#d1d5db',
          400: '#9ca3af', 500: '#6b7280', 600: '#4b5563', 700: '#374151',
          800: '#1f2937', 900: '#111827', 950: '#030712',
        },
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
      },
      animation: {
        'float-wave': 'floatWave 6s ease-in-out infinite',
        'wave-float': 'waveFloat 7s ease-in-out infinite',
        'floating': 'floating 6s ease-in-out infinite',
        'floating-fast': 'floating 2s ease-in-out infinite',
        'scroll': 'scroll 30s linear infinite',
        'popup': 'popup 0.25s ease',
        'fadeIn': 'fadeIn 0.25s ease forwards',
        'scaleIn': 'scaleIn 0.3s ease forwards',
      },
      keyframes: {
        floatWave: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        waveFloat: {
          '0%': { transform: 'translate(0px, 0px)' },
          '25%': { transform: 'translate(6px, -6px)' },
          '50%': { transform: 'translate(12px, 0px)' },
          '75%': { transform: 'translate(6px, 6px)' },
          '100%': { transform: 'translate(0px, 0px)' },
        },
        floating: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        popup: {
          from: { opacity: 0, transform: 'translateY(-20px) scale(0.95)' },
          to: { opacity: 1, transform: 'translateY(0) scale(1)' },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        scaleIn: {
          from: { opacity: 0, transform: 'scale(.9) translateY(20px)' },
          to: { opacity: 1, transform: 'scale(1) translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
