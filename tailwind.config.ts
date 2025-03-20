/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/App.vue',
    './src/components/*.{ts,js,vue}',
    './src/**/*.{ts,js,vue}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00548E',
        muted: '#f4f4f5',
        'muted-foreground': '#71717a',
      },
    },
  },
}
