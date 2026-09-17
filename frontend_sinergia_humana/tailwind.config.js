/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          950: "#040914",
          900: "#070E24",
          850: "#0A1330",
          800: "#0D1B40",
          700: "#122455",
          600: "#183272",
          500: "#2049A0",
          400: "#3E6FD6",
          300: "#7FA6ED",
          200: "#B7CDF6",
          100: "#E3ECFC",
          50: "#F4F8FE",
        },
        accent: {
          50: "#ECFEFF",
          100: "#CFFAFE",
          200: "#A5F3FC",
          300: "#67E8F9",
          400: "#2DD4E8",
          500: "#06B6D4",
          600: "#0891B2",
          700: "#0E7490",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Sora", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 8px 30px -12px rgba(0, 0, 0, 0.5)",
        glow: "0 0 28px 0 rgba(45, 212, 232, 0.28)",
        "glow-strong": "0 0 44px 0 rgba(45, 212, 232, 0.4)",
        panel: "0 20px 60px -20px rgba(0, 0, 0, 0.65)",
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: {
          from: { opacity: 0, transform: "translateY(8px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.55 },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.4s ease-out",
        slideUp: "slideUp 0.4s ease-out",
        pulseSoft: "pulseSoft 2s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
      backgroundImage: {
        "grid-glow":
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
};
