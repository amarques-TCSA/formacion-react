import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { mockDevServerPlugin } from 'vite-plugin-mock-dev-server'
import * as path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mockDevServerPlugin(),
  ],
  resolve: {
      alias: [
          { find: '@', replacement: path.resolve(__dirname, 'src') },
      ]
  },
  server: {
    proxy: {
      '^/api': 'http://example.com/'
    },
  },
})
