/** @type {import('tailwindcss').Config} */
// Palette de marque centralisée : modifiez "brand" ici pour rehabiller tout le logiciel.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eefdf3',
          100: '#d6f9e1',
          200: '#b0f1c8',
          300: '#7be4a7',
          400: '#40cd7f',
          500: '#1bb463',
          600: '#0f924f',
          700: '#0e7442',
          800: '#105c37',
          900: '#0e4b2f',
          950: '#022c19',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.06)',
        soft: '0 4px 20px -6px rgb(15 23 42 / 0.12)',
      },
      keyframes: {
        'slide-in': {
          '0%': { transform: 'translateX(120%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'slide-in': 'slide-in .3s ease-out',
        'fade-in': 'fade-in .25s ease-out',
        'scale-in': 'scale-in .18s ease-out',
      },
    },
  },
  plugins: [],
}
