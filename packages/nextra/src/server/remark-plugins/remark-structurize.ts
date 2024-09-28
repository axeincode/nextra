import type { Root } from 'mdast'
import type { Plugin } from 'unified'
import type { Search, StructurizedData } from '../../types'
import type { HProperties } from './remark-custom-heading-id'

type RootContent = Root['children'][number]

const CODE_TABLE_QUOTE_LIST = new Set<string>([
  'code',
  'table',
  'blockquote',
  'list',
  'mdxJsxFlowElement'
])

export const remarkStructurize: Plugin<[Search], Root> = options => {
  const opts = { codeblocks: true, ...(options as any) }
  const structurizedData: StructurizedData = Object.create(null)
  let activeSlug = ''
  let skip = false
  let content = ''

  return (tree, file) => {
    walk(tree)
    save()
    file.data.structurizedData = structurizedData
  }

  function save() {
    const cleanedContent = content
      .trim()
      // Strip out large words starting from 50 chars since it can provoke out-of-memory while
      // indexing them, I took 50 chars since largest word in English has 45 characters
      // https://github.com/shuding/nextra/issues/2077#issuecomment-1693671011
      .replaceAll(/\w{50,}/g, '')
      // Replace by new line or new lines
      .replaceAll(/\n+/g, '\n')
    if (activeSlug || cleanedContent) {
      structurizedData[activeSlug] = cleanedContent
    }
  }

  function walk(node: RootContent | Root): string {
    let result = ''
    const { type } = node

    if (type === 'heading') {
      skip = true
    }

    if (CODE_TABLE_QUOTE_LIST.has(type)) {
      result += '\n'
      if (!skip) content += '\n'
    }

    if ('children' in node) {
      for (const child of node.children) {
        result += walk(child)
      }
    } else if (
      (opts.codeblocks && type === 'code') ||
      type === 'text' ||
      type === 'inlineCode' ||
      type === 'tableCell'
    ) {
      // Inline code may have an `{:language}` suffix, trim this off if it exists.
      const value =
        type === 'inlineCode' ? node.value.replace(/\{:\w+}$/, '') : node.value
      result += value
      if (!skip) content += value
    }

    if (
      CODE_TABLE_QUOTE_LIST.has(type) ||
      ['listItem', 'break'].includes(type)
    ) {
      result += '\n'
      if (!skip) content += '\n'
    }

    if (type === 'tableCell') {
      result += '\t'
      if (!skip) content += '\t'
    } else if (type === 'heading') {
      skip = false
      if (node.depth > 1) {
        save()
        content = '' // reset content after h1 content
        const hProperties = node.data!.hProperties as HProperties
        activeSlug = hProperties.id + '#' + result
      }
    }
    return result
  }
}
