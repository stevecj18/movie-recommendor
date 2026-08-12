import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages project site URL: https://stevecj18.github.io/movie-recommendor/
export default defineConfig({
  base: '/movie-recommendor/',
  plugins: [react()],
})
