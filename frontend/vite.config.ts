import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // CSS küçültücü --no: 2321032056 değerini 2321030000'a yuvarlıyor; renk tonu bozuluyor.
  build: { cssMinify: false },
})
