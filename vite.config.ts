// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: `/MathBoard/`, // Altere aqui!
  plugins: [vue()],
})