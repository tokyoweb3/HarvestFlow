/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontWeight: {
      normal: "400",
      medium: "500",
    },
    extend: {
      fontFamily: {
        sans: ['"Function Pro"', "sans-serif"],
      },
      fontSize: {
        header: ["15px", "15px"],
        heading1: ["54px", "60px"],
        heading2: ["40px", "48px"],
        heading3: ["32px", "40px"],
        heading4: ["24px", "28px"],
        heading5: ["20px", "28px"],
        bodyLarge: ["18px", "26px"],
        body: ["15px", "18px"],
        caption: ["12px", "14px"],
        captionSmall: ["10px", "12px"],
      },
      colors: {
        primary: "#E6B95F",
        secondary: "#325AB4",
        grey: "#B2B2B2",
      },
    },
  },
  plugins: [],
};
