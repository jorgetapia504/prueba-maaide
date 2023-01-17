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
      height: {
        '700': '700px',
        '600': '600px',
        '500': '500px',
        '400': '400px'
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
        '530': '530px',
        '400': '400px',
        '580': '580px',
        '420': '420px'
      },
      fontSize: {
        '15': '15px'
      },
      boxShadow: {
        'det': '0 1px 8px 0px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
      }
    },
    fontFamily: {
      'poppins': ['poppins', 'system-ui', 'sans-serif']
    }
  },
  plugins: [],
}
