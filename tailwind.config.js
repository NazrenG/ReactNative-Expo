/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        montserrat: "Montserrat-Regular",
        montserratMedium: "Montserrat-Medium",
        montserratItalic: "Montserrat-Italic",
        montserratBold: "Montserrat-Bold",
        montserratSemiBold: "Montserrat-SemiBold",
      },
    },
  },
  plugins: [],
};
