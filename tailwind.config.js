/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        backgroundColor: "#191414",
        primaryButton: "#1DB954",
        primaryTextColor: "#FFFFFF",
        secondaryTextColor: "#B3B3B3",
        activeButton: "#1ED760"
      }
    },
  },
  plugins: [],
}