import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        "lightest-sand": "#FAF3E0",
        "light-sand": "#F4E7D3",
        sand: "#E9D8B4",
        "dark-sand": "#D4C29A",
      },
    },
  },
  plugins: [],
} satisfies Config;
