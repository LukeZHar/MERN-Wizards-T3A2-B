import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, //describe and expect without importing
    environment: "jsdom", //better testing in browser
    setupFiles: "src/setupTest.js" //test confi before running tests
  }
})
