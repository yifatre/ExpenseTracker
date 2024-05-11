import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        outDir: '../ExpenseTrackerBack/public',
        emptyOutDir: true,
    },
    assetsInclude:['**/*.svg'],
    base: './'
})
