module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: "objektiv-mk3",
      display: "objektiv-mk3",
      body: '"objektiv-mk3"',
    },
    extend: {
      colors: {
        navy: {
          50: "#d2d3d7",
          100: "#a5a7ae",
          200: "#797b86",
          300: "#4c4f5d",
          400: "#1f2335",
          500: "#191c2a",
          600: "#131520",
          700: "#0c0e15",
          800: "#06070b",
          900: "#000000",
        },
        navyLight: {
          50: "#c3c6d1",
          100: "#9ca0b2",
          200: "#747993",
          300: "#606683",
          400: "#384064",
          500: "#2d3350",
          600: "#2d3350",
          700: "#161a28",
          800: "#0b0d14",
          900: "#000000",
        },
      },
    },
  },
  plugins: [],
};
