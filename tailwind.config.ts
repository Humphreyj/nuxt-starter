import type { Config } from 'tailwindcss'
export default <Partial<Config>>{
  content: ['./app/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primaryText: '#edf0f4',
        headerBg: '#334155',
      },
      fontFamily: {
        logo: ['Albert Sans', 'sans-serif'],
        display: ['DM Sans', 'sans-serif'],
        content: ['Nunito Sans', 'serif'],
      },
    },
  },
  darkMode: ['class'],
  plugins: [],
}
