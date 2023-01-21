import { defineConfig } from 'tsup'
import fs from 'node:fs/promises'
import path from 'node:path'

import tsconfig from './tsconfig.json'

const { target } = tsconfig.compilerOptions

const esmOptions = defineConfig({
  format: 'esm',
  dts: true,
  target,
  bundle: true,
  splitting: false,
  external: ['shiki', './__temp__', 'webpack'],
  esbuildPlugins: [
    // https://github.com/evanw/esbuild/issues/622#issuecomment-769462611
    {
      name: 'add-mjs',
      setup(build) {
        build.onResolve({ filter: /.*/ }, async args => {
          if (
            args.importer &&
            args.path.startsWith('.') &&
            !args.path.endsWith('.json')
          ) {
            let isDir: boolean
            try {
              isDir = (
                await fs.stat(path.join(args.resolveDir, args.path))
              ).isDirectory()
            } catch {
              isDir = false
            }

            if (isDir) {
              // it's a directory
              return { path: args.path + '/index.mjs', external: true }
            }
            return { path: args.path + '.mjs', external: true }
          }
        })
      }
    }
  ]
})

export default defineConfig([
  {
    name: 'nextra',
    entry: ['src/index.js', 'src/__temp__.js'],
    format: 'cjs',
    dts: false,
    target
  },
  {
    name: 'nextra-esm',
    entry: [
      'src/**/*.ts',
      'src/**/*.tsx',
      '!src/compile.ts',
      '!src/mdx-plugins/remark-replace-imports.ts'
    ],
    ...esmOptions
  },
  {
    name: 'nextra-esm-import.meta',
    entry: ['src/compile.ts', 'src/mdx-plugins/remark-replace-imports.ts'],
    ...esmOptions,
    // import.meta is available only from es2020
    target: 'es2020'
  },
  {
    entry: ['src/types.ts'],
    name: 'nextra-types',
    dts: {
      only: true
    }
  }
])
