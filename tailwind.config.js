module.exports = {
  variants: {
    textColor: ["responsive", "hover", "focus", "focus-within"],
  },
  theme: {
    extend: {
      colors: {
        "black-main": "#181818",
        "black-light": "#262626",
        "white-subtle": "#FCFCFC",
      },
    },
    textColor: (theme) => ({
      ...theme("colors"),
      primary: "#FCFCFC",
      secondary: "#8f8f8f",
    }),
    placeholderColor: (theme) => ({
      ...theme("colors"),
      primary: "#FCFCFC",
      secondary: "#8f8f8f",
    }),
  },
  purge: {
    enabled: process.env.NODE_ENV === "production",
    content: [
      "./pages/**/*.{js,jsx,ts,tsx}",
      "./components/**/*.{js,jsx,ts,tsx}",
    ],
    defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
  },
};
