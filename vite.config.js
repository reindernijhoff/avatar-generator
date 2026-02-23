import {defineConfig} from 'vite'
import {resolve} from 'path'
import dts from "vite-plugin-dts";

export default defineConfig({
  target: 'esnext',
  plugins: [
    dts({
      include: ['src/**/*'],
      exclude: ['**/*.spec.ts', '**/*.test.ts'],
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
      external: ['canvas', '@napi-rs/canvas', 'react', 'react/jsx-runtime'],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    },
  }
})