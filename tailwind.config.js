/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        "custom-chart-1": "hsl(var(--custom-chart-1))",
        "custom-chart-2": "hsl(var(--custom-chart-2))",
        "custom-chart-foreground-1": "hsl(var(--custom-chart-foreground-1))",
        "custom-chart-foreground-2": "hsl(var(--custom-chart-foreground-2))",
      },
      backgroundImage: {
        "custom-chart-gradient-stroke":
          "linear-gradient(to right, hsl(var(--custom-chart-1)) 0%, hsl(var(--custom-chart-2)) 90%)",
        "custom-chart-gradient-foreground":
          "linear-gradient(to right, hsl(var(--custom-chart-foreground-1)) 0%, hsl(var(--custom-chart-foreground-2)) 90%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
