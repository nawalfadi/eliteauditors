import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import os from 'os'

// Cache outside OneDrive to avoid "Access is denied" on Windows
const cacheDir = path.join(os.tmpdir(), 'elite-auditor-vite', 'node_modules', '.vite')

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  cacheDir,
})
