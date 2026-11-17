/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#D85430',
          dark: '#A83030',
          light: '#E67252',
          50: '#FDF6F3',
          100: '#FBE8E2',
          500: '#D85430',
          600: '#C04830',
          700: '#A83030',
          800: '#843C30',
          900: '#5F271E',
        },
        accent: '#C04830',
        deep: '#843C30',
        navy: {
          DEFAULT: '#0F172A',
          800: '#1E293B',
          900: '#0F172A',
          950: '#080C15',
        },
        charcoal: '#1F2937',
        warm: '#FAF6F2',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #D85430 0%, #A83030 100%)',
        'brand-gradient-subtle': 'linear-gradient(135deg, rgba(216, 84, 48, 0.08) 0%, rgba(168, 48, 48, 0.04) 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0F172A 0%, #080C15 100%)',
      },
    },
  },
  plugins: [],
}
