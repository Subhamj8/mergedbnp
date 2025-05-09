/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#e0eeff',
          100: '#b0d0ff',
          200: '#80b3ff',
          300: '#5096ff',
          400: '#2079ff',
          500: '#0057B8', // primary brand color
          600: '#0049a3',
          700: '#003b8e',
          800: '#002d79',
          900: '#001f64',
        },
        accent: {
          50: '#fff0e6',
          100: '#ffe0cc',
          200: '#ffc199',
          300: '#ffa366',
          400: '#ff8533',
          500: '#FF6B00', // accent color
          600: '#e55d00',
          700: '#cc4c00',
          800: '#b33c00',
          900: '#992c00',
        },
        success: {
          500: '#00A651', // success color
        },
        warning: {
          500: '#FFB016', // warning color
        },
        error: {
          500: '#E53935', // error color
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      spacing: {
        '1': '8px',
        '2': '16px',
        '3': '24px',
        '4': '32px',
        '5': '40px',
        '6': '48px',
      },
    },
  },
  plugins: [],
};