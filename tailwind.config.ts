import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/content/**/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* INSIDERS Brand Palette */
        "insiders-pink": "#E02379",
        "insiders-magenta": "#B92786",
        "insiders-purple": "#AA298C",
        "insiders-cream": "#F8F2EB",
        "insiders-light-gray": "#EBEBEB",
        "insiders-gray": "#DEDEDE",
        "insiders-dark-gray": "#6D6E71",

        /* Template system colors (mapped to INSIDERS palette) */
        "black-2": "#6D6E71",
        "black-3": "#1C1C1C",
        "secondary-2": "#ffffffab",
        "white-2": "#6D6E71",
        "white-3": "#F8F2EB",
        "white-4": "#F8F2EB",
        "border-2": "var(--border2)",
        "border-3": "var(--border3)",
        "mint-green": "#F8F2EB",
        "off-white": "#F8F2EB",
        "soft-pink": "#f4e0e0",
        "pink-border": "#DEDEDE",
        "yellow-2": "#E02379",
        theme: "var(--theme)",
        primary: "var(--primary)",
        background: {
          DEFAULT: "var(--background)",
          fixed: {
            DEFAULT: "var(--background-fixed)",
            2: "var(--background-fixed2)",
          },
          2: "var(--background2)",
          3: "var(--background3)",
          4: "var(--background4)",
          5: "var(--background5)",
        },
        text: {
          DEFAULT: "var(--text)",
          fixed: {
            DEFAULT: "var(--text-fixed)",
            2: "var(--text-fixed2)",
            3: "var(--text-fixed3)",
            4: "var(--text-fixed4)",
          },
          2: "var(--text2)",
          3: "var(--text3)",
          4: "var(--text4)",
          5: "var(--text5)",
        },

        border: "var(--border)",
      },
      fontFamily: {
        primary: ["beatricetrial", "sans-serif"],
        heading: ["beatricetrial", "sans-serif"],
        getaway: ["getaway", "sans-serif"],
        instrument: ["Instrument Sans", "sans-serif"],
        beatricetrial: ["beatricetrial", "sans-serif"],
        plusjakartasans: ["beatricetrial", "sans-serif"],
        spacegrotesk: ["beatricetrial", "sans-serif"],
        teko: ["Instrument Sans", "sans-serif"],
        khand: ["Instrument Sans", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "gradient-shift": "gradient-shift 4s ease infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  variants: {
    extend: {
      maxWidth: ["responsive"],
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
