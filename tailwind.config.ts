import type { Config } from 'tailwindcss'

const flowbite = require('flowbite-react/tailwind')

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './layouts/**/*.{js,ts,jsx,tsx,mdx}',
    flowbite.content()
  ],
  theme: {
    extend: {
      colors: {
        'brown-dark' : '#472C1B ',
        'brown-normal': '#7D451B',
        'brown-light':'#EDC79B',
        'pink-melo': '#DB6B7B',
        'yellow-very-melo': '#fffff5',
        'greenny':'#7CFFC4',
        'greenny-dark':'#63A475',
      }
    },
    container: {
      center: true,
      screens: {
        sm: '620px',
        md: '720px',
        lg: '1290px',
        xl: '1350px'
      }
    },
    fontSize: {
      xs: '8px',
      sm: '14px',
      md: '18px',
      lg: '20px',
      xl: '22px',
      "2xl": '24px',
      "3xl": '30px'
    }
  },
  plugins: [flowbite.plugin()],
}
export default config
