module.exports = {
    content: [
      './*.html',
      './pages/**/*.{html,js}',
      './components/**/*.{html,js}'
    ],
    theme: {
      extend: {
        colors: {
          darkBlue: 'hsl(217, 28%, 15%)',
          darkBlue1: 'hsl(218, 28%, 13%)',
          darkBlue2: 'hsl(216, 53%, 9%)',
          darkBlue3: 'hsl(219, 30%, 18%)',
          accentCyan: 'hsl(176, 68%, 64%)',
          accentBlue: 'hsl(198, 60%, 50%)',
          lightRed: 'hsl(0, 100%, 63%)',
          ceruleanBlue: '#007BA7',
          darkBlue:'#001524',
          jasperRed:'#CD533B',
          darkBlueViolet:'#2a2f44'
        },
        fontFamily: {
          sans: ['Raleway', 'sans-serif'],
          opensans: ['Open Sans', 'sans-serif'],
        }
      },
    },
    plugins: [
      require('tailwindcss'),
      require('@tailwindcss/deprecation-warnings'),
      require('autoprefixer'),
    ],
  }