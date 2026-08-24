// tailwind.config.js
import { heroui } from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'form': "url('/backgrounds/form_bg.jpg')",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()]
}
