/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  purge:{
    options: {
      content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
      safelist: ['bg-emerald-200', 'bg-purple-200', 'bg-red-200', 'bg-blue-200', 'bg-yellow-200', 'bg-cyan-200', 'bg-green-200', 'bg-gray-200', 'bg-yellow-200', 'bg-pink-200', 'bg-amber-200', 'bg-orange-200', 'bg-violet-200', 'bg-stone-200', 'bg-sky-200', 'bg-slate-200', 'bg-indigo-200', 'bg-black-200'],
    },
  },
  theme: {
    extend: {

      fontFamily: {
        'mali': ['Mali', 'cursive'],
      },
    },
  },
  plugins: [],
}

