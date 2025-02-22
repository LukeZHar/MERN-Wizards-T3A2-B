import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // to use describe adn expect without importing them.
    environment: "jsdom", // for better browser testing
    setupFiles: "src/setupTest.js", //test config before tests are run
  }
})
