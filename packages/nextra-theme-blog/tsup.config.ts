import { defineConfig } from 'tsup'
import tsconfig from './tsconfig.json'

export default defineConfig({
  entry: ['src/index.tsx', 'src/cusdis.tsx'],
  format: 'esm',
  dts: true,
  name: 'nextra-theme-blog',
  outExtension: () => ({ js: '.js' }),
  target: tsconfig.compilerOptions.target
})
