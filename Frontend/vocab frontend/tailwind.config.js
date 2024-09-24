/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html',
    './src/**/*.{js,ts,jsx,tsx}',],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(274deg, rgba(254, 241, 241, 0.8) 13.43%, rgba(234, 239, 254, 0.8) 97.99%)',
        // 'background-gradient': `linear-gradient(0deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.03) 100%), linear-gradient(106deg, #1B47FF -11.63%, #7895FF 98%)`,
        'background-gradient': 'linear-gradient(0deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.03) 100%), linear-gradient(106deg, #1B47FF -11.63%, #7895FF 98%)'
      },
    },
  },
  plugins: [],
}

