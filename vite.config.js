import {defineConfig} from 'vite'
import {resolve} from 'path'
import dts from 'vite-plugin-dts'
import {fileURLToPath} from 'url'
import {dirname} from 'path'

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
            entry: {
                'index': resolve(__dirname, 'src/index.ts'),
                'react/index': resolve(__dirname, 'src/react/index.ts'),
            },
            formats: ['es'],
        },
        rollupOptions: {
            external: ['canvas', 'react', 'react/jsx-runtime'],
            output: {
                format: 'es',
                entryFileNames: '[name].js',
                preserveModules: true,
                preserveModulesRoot: 'src',
            },
        },
    }
})