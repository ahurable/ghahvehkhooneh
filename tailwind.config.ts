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
        'brown-dark' : '#033B55',
        'brown-normal': '#033B55',
        'brown-light':'#022333',
        'pink-melo': '#FB8FD9',
        'yellow-very-melo': '#f6fff3',
        'greenny':'#FB8FA3',
        'greenny-dark':'#59707A',
        'baby-blue-light':'#E2ECF0'
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
