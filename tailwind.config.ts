import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

const config = {
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
      screens: {
        "2xl": "1400px",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        "sidebar-background": "hsla(262, 86%, 46%, 0.03)",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "input-border": "#F7F2FE",
        "tab-item-gray": "#828282",
        "secondary-text": "#6E6E6E",
        "checkbox-gray": "#787878",
        "leadlly-red": "#ff2e2e",
        "leadlly-yellow": "#ff9900",
        "leadlly-green": "#0fd679",
        "leadlly-cyan": "#72EFDD",
        "leadlly-chart-yellow": "#FFDA57",
        "dark-primary": "#3D3548",
        "dark-primary-active": "#5B5661",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "collapsible-down": {
          from: { height: "0" },
          to: { height: "var(--radix-collapsible-content-height)" },
        },
        "collapsible-up": {
          from: { height: "var(--radix-collapsible-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "collapsible-down": "collapsible-down 0.2s ease-out",
        "collapsible-up": "collapsible-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
      fontSize: {
        "page-title": ["40px", "52px"],
      },
      width: {
        sidebar: "261px",
      },
      height: {
        "main-height": "calc(100dvh - 24px)",
      },
      boxShadow: {
        custom: "0px 17px 37px 0px rgba(165, 92, 255, 0.0)",
        dialog: "0 0 21.5px 2px rgba(0, 0, 0, 0.29)",
        tracker_subject_overview:
          "2px 1px 10.5px 0 rgba(151, 83, 245, 0.18), inset 0 0 32px -7px rgba(151, 83, 245, 0.18)",
        question: " 0px 0px 26.7px -10px #00000033",
        "custom-back": "inset 1.68px 3.37px 5.31px 0 rgba(0, 0, 0, 0.1)",
        section: " 0px 1px 24.8px -9px #00000038",
        card: "0px 1.15px 21.31px 0px #FF990012",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
