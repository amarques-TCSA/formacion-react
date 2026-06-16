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
  optimizeDeps: {
    noDiscovery: true,
    exclude: ['jsnlog', 'api-sitna'],
  },
  resolve: {
      alias: [
          { find: '@', replacement: path.resolve(__dirname, 'src') },
          { find: 'jsnlog', replacement: path.resolve(__dirname, 'src/shared/utils/jsnlog-shim.ts') },
        { find: 'api-sitna', replacement: path.resolve(__dirname, 'src/shared/utils/api-sitna-shim.ts') },
      ]
  },
  server: {
    proxy: {
      '^/api': 'http://example.com/'
    },
  },
})
