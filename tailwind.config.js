/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '1440': '1440px',
        '1270': '1270px',
        '800': '800px',
        '560': '560px'
      },
      padding: {
        '18': '74px'
      },
      margin: {
        '520': '520px',
        '1920': '1920px'
      },
      colors: {
        'main': '#3483fa',
        'blackv2': '#000000e6',
        'green': '#00a650'
      },
      screens: {
        'navbar': '1457px',
        'mobile': '435px',
        'mobile2': '388px',
        'xl2': '1288px',
        '530': '530px'
      },
      fontSize: {
        '15': '15px'
      }
    },
    fontFamily: {
      'poppins': ['poppins', 'system-ui', 'sans-serif']
    }
  },
  plugins: [],
}
