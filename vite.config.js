<<<<<<< HEAD
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
=======
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
>>>>>>> d00bea93501d9efa4ba1013cbe2152e3f4853576
