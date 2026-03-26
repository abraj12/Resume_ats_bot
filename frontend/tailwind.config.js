/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 18px 60px rgba(56, 189, 248, 0.22)",
        soft: "0 10px 30px rgba(15, 23, 42, 0.12)"
      },
      backgroundImage: {
        "grid-light": "linear-gradient(rgba(15, 23, 42, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.06) 1px, transparent 1px)",
        "grid-dark": "linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px)"
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        pulsebar: "pulsebar 1.8s ease-in-out infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" }
        },
        pulsebar: {
          "0%, 100%": { opacity: "0.4", transform: "scaleX(0.92)" },
          "50%": { opacity: "1", transform: "scaleX(1)" }
        }
      }
    }
  },
  plugins: []
};
