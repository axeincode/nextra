import fs from 'node:fs/promises'
import path from 'node:path'
import { compileMdx } from '../src/compile'
import { it, describe, expect } from 'vitest'
import { CWD } from '../src/constants'

type Name =
  | 'code-h1.mdx'
  | 'code-with-text-h1.mdx'
  | 'dynamic-h1.mdx'
  | 'no-h1.mdx'
  | 'static-h1.mdx'

function loadFixture(name: Name) {
  const filePath = path.join(CWD, '__test__', 'fixture', 'headings', name)
  return fs.readFile(filePath, 'utf8')
}

const mdxOptions = {
  jsx: true,
  outputFormat: 'program' as const
}

describe('process heading', () => {
  it('code-h1', async () => {
    const data = await loadFixture('code-h1.mdx')
    const result = await compileMdx(data, { mdxOptions })
    expect(result).toMatchSnapshot()
  })
  it('code-with-text-h1', async () => {
    const data = await loadFixture('code-with-text-h1.mdx')
    const result = await compileMdx(data, { mdxOptions })
    expect(result).toMatchSnapshot()
  })
  it('static-h1', async () => {
    const data = await loadFixture('static-h1.mdx')
    const result = await compileMdx(data, { mdxOptions })
    expect(result).toMatchSnapshot()
  })
  it('dynamic-h1', async () => {
    const data = await loadFixture('dynamic-h1.mdx')
    const result = await compileMdx(data, { mdxOptions })
    expect(result).toMatchSnapshot()
  })
  it('no-h1', async () => {
    const data = await loadFixture('no-h1.mdx')
    const result = await compileMdx(data, { mdxOptions })
    expect(result).toMatchSnapshot()
  })

  describe('Code block', () => {
    describe('filename', () => {
      it('attach with "codeHighlight: true"', async () => {
        const { result } = await compileMdx('```js filename="test.js"\n```', {
          mdxOptions,
          codeHighlight: true
        })
        expect(result).toMatch(
          '<_components.pre data-language="js" data-theme="default" filename="test.js">'
        )
      })

      it('attach with "codeHighlight: false"', async () => {
        const { result } = await compileMdx('```js filename="test.js"\n```', {
          mdxOptions,
          codeHighlight: false
        })
        expect(result).toMatch('<_components.pre filename="test.js">')
      })

      it('not highlight filename as substring', async () => {
        const { result } = await compileMdx(
          '```js filename="/foo/"\nfoo\n```',
          {
            mdxOptions,
            codeHighlight: true // processed only by rehype-pretty-code
          }
        )
        expect(result).not.toMatch(
          'className="highlighted">{"foo"}</_components.span>'
        )
        expect(result).toMatch('}}>{"foo"}</_components.span>')
      })
    })

    describe('Copy code button', () => {
      for (const codeHighlight of [true, false]) {
        describe(`codeHighlight: ${codeHighlight}`, () => {
          it(`attach with "copy"`, async () => {
            const { result } = await compileMdx('```js copy\n```', {
              mdxOptions,
              codeHighlight
            })
            expect(result).toMatch('hasCopyCode>')
          })

          it(`attach with "defaultShowCopyCode: true"`, async () => {
            const { result } = await compileMdx('```js\n```', {
              mdxOptions,
              defaultShowCopyCode: true,
              codeHighlight
            })
            expect(result).toMatch('hasCopyCode>')
          })

          it(`not attach with "defaultShowCopyCode: true" and "copy=false"`, async () => {
            const { result } = await compileMdx('```js copy=false\n```', {
              mdxOptions,
              defaultShowCopyCode: true,
              codeHighlight
            })
            expect(result).not.toMatch('hasCopyCode>')
          })
        })
      }
    })

    it('code block without language has "text" language', async () => {
      const { result } = await compileMdx('```\n```', { mdxOptions })
      expect(result).toMatch('<_components.code className="language-text" />')
    })
  })
})
