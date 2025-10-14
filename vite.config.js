import {defineConfig} from 'vite'
import {resolve} from 'path'
import dts from 'vite-plugin-dts'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
    plugins: [
        dts({
            insertTypesEntry: true,
            include: ['src/**/*'],
            outDir: 'dist',
            rollupTypes: true
        })
    ],
    build: {
        target: 'esnext',
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            formats: ['es', 'umd'],
            name: 'EigenAvatarGenerator',
            fileName: (format) => {
                if (format === 'umd') return 'eigen-avatar-generator.umd.cjs'
                return 'eigen-avatar-generator.js'
            }
        },
        rollupOptions: {
            external: ['canvas'],
            output: [
                {
                    format: 'es',
                    entryFileNames: '[name].js',
                    preserveModules: true,
                    preserveModulesRoot: 'src',
                },
                {
                    format: 'umd',
                    name: 'EigenAvatarGenerator',
                    entryFileNames: 'eigen-avatar-generator.umd.cjs',
                    globals: {
                        canvas: 'canvas',
                    },
                },
            ],
        },
    }
})