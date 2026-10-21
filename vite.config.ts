import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(import.meta.dirname, './src') },
      { find: /^lucide-react$/, replacement: path.resolve(import.meta.dirname, './src/components/icons/lucide.ts') },
      { find: /^simple-icons$/, replacement: path.resolve(import.meta.dirname, './src/data/simpleIcons.ts') },
    ],
  },
})