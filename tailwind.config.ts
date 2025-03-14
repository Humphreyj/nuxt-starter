import type { Config } from 'tailwindcss'
export default <Partial<Config>>{
  content: ['./app/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['DM Sans', 'sans-serif'],
        content: ['Nunito Sans', 'serif'],
      },
    },
  },
  darkMode: ['class'],
  plugins: [],
}
