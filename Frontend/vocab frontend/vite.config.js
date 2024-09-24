import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import cypress from 'cypress'

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
})
