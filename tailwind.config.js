/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F4F2EF",
        greenBrand: "#336021",
        blackBrand: "#272525",
        orangeBrand: "#E68C3A",
      },
      backgroundImage: {
        'growth': "url('/src/assets/images/Diary.png')",
        'growing': "url('/src/assets/images/Diary2.png')",
        'Herologo': "url('/src/assets/images/Hero.jpg')",
        'Gerologo': "url('/src/assets/images/HeroLogo.jpg')",
        'Herobg': "url('/src/assets/images/Herologo1.jpg')",
        'Mainbg': "url('/src/assets/images/Herologo2.jpg')",
        'Mainmain': "url('/src/assets/images/Herologo3.jpg')",
        'GGG': "url('/src/assets/images/GROWTH.jpg')",


      },
      fontFamily: {
        robotomono: ['"Roboto Mono"', 'monospace'],
        robotocondensed: ['"Roboto Condensed"', 'sans-serif'],
        montserrat: ["'Montserrat'", 'sans-serif'],
        Inter: ["'Inter'", 'sans-serif'],
        Merriwether: ["'Merriweather'", 'sans-serif'],
        Worksans: ["'Work Sans'", 'sans-serif'],


      },
    },
  },
  plugins: [],
};
