import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

// Builds src/widget.tsx into a single self-contained dist/widget.js
// that WordPress (or any site) can embed via <script src=".../widget.js">.
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    emptyOutDir: false,
    cssCodeSplit: false,
    lib: {
      entry: resolve(__dirname, 'src/widget.tsx'),
      name: 'OndegROIWidget',
      formats: ['iife'],
      fileName: () => 'widget.js',
    },
    rollupOptions: {
      output: {
        // Keep everything in one file, no separate CSS/asset outputs.
        inlineDynamicImports: true,
      },
    },
  },
})
