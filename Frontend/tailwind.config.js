import { heroui } from "@heroui/theme"
import plugin from "tailwindcss/plugin"

/*
 * Theme de Viajecitos — fuente única de colores, fuentes, tamaños y efectos.
 * - primary / secondary viven en el theme de HeroUI (abajo, en plugins) para que
 *   los componentes de HeroUI y las utilidades de Tailwind usen el mismo color:
 *   bg-primary, text-primary, <Button color="primary" />, etc.
 * - El resto de los tokens propios van en theme.extend.
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "#ebebeb",   // fondo del body
          alt: "#efefef",       // bordes suaves de cards
        },
        ink: "#20222d",         // fondo del footer
        muted: "#808080",       // textos secundarios (descripciones)
        sky: "#9fe9ff",         // títulos del slider de anuncios
        accent: {
          blue: "#25aae1",
          mint: "#40e495",
          green: "#30dd8a",
          emerald: "#2bb673",
          deep: "#30a071",
        },
      },
      fontFamily: {
        sans: ['"Maven Pro"', "Arial", "sans-serif"],
        logo: ["Italianno", "cursive"],
        display: ["Gabarito", "sans-serif"],
      },
      fontSize: {
        hero: "3.125rem",       // título del HeroBanner
        logo: "4rem",           // logo "Viajecitos" del navbar
      },
      maxWidth: {
        site: "1100px",         // ancho máximo del contenido
      },
      boxShadow: {
        card: "1px 1px 20px 1px #80808047",
        cart: "0 3px 15px rgba(0, 0, 0, 0.2)",
        accent: "0 4px 15px 0 rgba(49, 196, 190, 0.75)",
      },
      textShadow: {
        DEFAULT: "1px 0 3px #000",
        lg: "2px 0 3px #000",
        primary: "1px 2px 3px #dc143c",
      },
      backgroundImage: {
        form: "url('/backgrounds/form_bg.jpg')",
        "nav-gradient": "linear-gradient(61deg, #ffffff 0%, #dc146b 35%, #dc143c 100%)",
        "accent-gradient": "linear-gradient(to right, #25aae1, #40e495, #30dd8a, #2bb673)",
      },
      backgroundSize: {
        "300%": "300% 100%",
      },
      keyframes: {
        slideInDown: {
          from: { transform: "translate3d(0, -100%, 0)", visibility: "visible" },
          to: { transform: "translate3d(0, 0, 0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "slide-in-down": "slideInDown 1s both",
        "fade-in": "fadeIn 0.5s both",
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: { DEFAULT: "#dc143c", foreground: "#ffffff" },
            secondary: { DEFAULT: "#dc146b", foreground: "#ffffff" },
          },
        },
      },
    }),
    // Utilidad text-shadow (Tailwind 3 no la trae): text-shadow, text-shadow-lg, text-shadow-primary
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        { "text-shadow": (value) => ({ textShadow: value }) },
        { values: theme("textShadow") }
      )
    }),
  ],
}
