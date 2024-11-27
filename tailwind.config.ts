import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{},
      fontFamily: {},
      screens: {
        'xlfull': {'max': '1440px'},
        'lgfull': {'max': '1200px'},
        'mdfull': {'max': '992px'},
        'smfull': {'max': '768px'},
        'xsfull': {'max': '576px'},
        'xxsfull': {'max': '390px'},
        'xl': {'max': '1440px', 'min': '1201px'},
        'lg': {'max': '1200px', 'min': '993px'},
        'md': {'max': '992px', 'min': '768px'},
        'sm': {'max': '768px', 'min': '576px'},
      }
    },
  },
  plugins: [],
};
export default config;
