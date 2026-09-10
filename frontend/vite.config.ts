import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages project site: https://Msiddhesh008.github.io/prasthara/
export default defineConfig({
  base: '/prasthara/',
  plugins: [react()],
})
