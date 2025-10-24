/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(220,13%,4%)",
        foreground: "hsl(220,8%,91%)",
        card: "hsl(220,13%,7%)",
        "card-foreground": "hsl(220,8%,91%)",
        primary: "hsl(188,95%,44%)",
        "primary-foreground": "hsl(220,13%,4%)",
        secondary: "hsl(215,25%,11%)",
        "secondary-foreground": "hsl(220,8%,91%)",
        muted: "hsl(215,25%,11%)",
        "muted-foreground": "hsl(220,9%,61%)",
        accent: "hsl(188,95%,44%)",
        "accent-foreground": "hsl(220,13%,4%)",
        border: "hsl(215,16%,12%)",
        input: "hsl(215,16%,12%)",
        ring: "hsl(188,95%,44%)"
      },
      fontFamily: {
        sans: ["Inter", "Segoe UI", "Arial", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem"
      }
    }
  },
  plugins: []
};
