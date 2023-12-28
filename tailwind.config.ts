import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brown-dark' : '#3F2211 ',
        'brown-normal': '#502b16'
      }
    },
    container: {
      center: true,
      screens: {
        sm: '100%',
        md: '720px',
        lg: '1250px'
      }
    },
    fontSize: {
      sm: '14px',
      md: '18px',
      lg: '20px',
      xl: '22px',
      "2xl": '24px',
      "3xl": '30px'
    }
  },
  plugins: [],
}
export default config
