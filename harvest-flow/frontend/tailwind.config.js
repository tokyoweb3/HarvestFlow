/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      desktop: "1200px",
    },
    fontWeight: {
      normal: "400",
      medium: "500",
    },
    extend: {
      fontFamily: {
        sans: ['"Function Pro"', "sans-serif"],
        noto: ['"Noto Sans JP"', "sans-serif"],
      },
      fontSize: {
        header: ["15px", "15px"],
        heading1: ["54px", "60px"],
        heading2: ["40px", "48px"],
        heading3: ["32px", "40px"],
        heading4: ["26px", "30px"],
        heading4Smaller: ["24px", "28px"],
        heading5Larger: ["22px", "32px"],
        heading5: ["22px", "28px"],
        bodyLarge: ["18px", "26px"],
        body16: ["16px", "24px"],
        bodyJapanese: ["15px", "34px"],
        body: ["15px", "23px"],
        bodySmaller: ["13px", "23px"],
        caption: ["12px", "14px"],
        captionSmall: ["10px", "12px"],
      },
      colors: {
        primary: "#E6B95F",
        secondary: "#325AB4",
        tertiary: "#CADBE8",
        grey: "#B2B2B2",
        greyLight: "#E0E0E0",
        greySuperLight: "#E7EFF7",
      },
      animation: {
        fade: "fadeIn .5s ease-in-out",
        fadeOut: "fadeOut .5s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        fadeOut: {
          to: { opacity: 0 },
          from: { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
