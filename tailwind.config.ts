
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: '#000000',
        input: '#000000',
        ring: '#000000',
        background: '#FFFFFF',
        foreground: '#000000',
        primary: {
          DEFAULT: '#000000',
          foreground: '#FFFFFF'
        },
        secondary: {
          DEFAULT: '#F1F1F1',
          foreground: '#000000'
        },
        muted: {
          DEFAULT: '#ccc',
          foreground: '#000000'
        },
        accent: {
          DEFAULT: '#000000',
          foreground: '#FFFFFF'
        },
        destructive: {
          DEFAULT: '#000000',
          foreground: '#FFFFFF'
        },
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#000000'
        },
        popover: {
          DEFAULT: '#FFFFFF',
          foreground: '#000000'
        }
      },
      borderRadius: {
        lg: "0.75rem",
        md: "calc(0.75rem - 2px)",
        sm: "calc(0.75rem - 4px)"
      },
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
