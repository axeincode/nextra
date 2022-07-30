import React, { PropsWithChildren } from 'react'
import { ThemeProviderProps } from 'next-themes/dist/types'

export interface DocsThemeConfig {
  projectLink?: string
  github?: string
  projectLinkIcon?:
    | React.ReactNode
    | React.FC<PropsWithChildren<{ locale: string }>>
  docsRepositoryBase?: string
  titleSuffix?:
    | string
    // Can't be React component, otherwise will get Warning: A title element received an array with more than 1 element as children.
    | ((props: {
        locale: string
        config: DocsThemeConfig
        title: string
        meta: Meta
      }) => string)
  nextLinks?: boolean
  prevLinks?: boolean
  search?: boolean
  darkMode?: boolean
  nextThemes?: Pick<
    ThemeProviderProps,
    'defaultTheme' | 'storageKey' | 'forcedTheme'
  >
  defaultMenuCollapsed?: boolean
  font?: boolean
  footer?: boolean
  footerText?:
    | React.ReactNode
    | React.FC<
        PropsWithChildren<{
          locale: string
        }>
      >
  footerEditLink?:
    | React.ReactNode
    | React.FC<
        PropsWithChildren<{
          locale: string
        }>
      >
  logo?:
    | React.ReactNode
    | React.FC<
        PropsWithChildren<{
          locale: string
        }>
      >
  head?:
    | React.ReactNode
    | React.FC<
        PropsWithChildren<{
          locale: string
          config: DocsThemeConfig
          title: string
          meta: Meta
        }>
      >
  direction?: 'ltr' | 'rtl'
  i18n?: { locale: string; text: string; direction: string }[]
  floatTOC?: boolean
  unstable_faviconGlyph?: string
  feedbackLink?:
    | React.ReactNode
    | React.FC<
        PropsWithChildren<{
          locale: string
        }>
      >
  feedbackLabels?: string
  customSearch?: React.ReactNode | false
  // Can't be React component
  searchPlaceholder?: string | ((props: { locale: string }) => string)
  projectChatLink?: string
  projectChatLinkIcon?: React.FC<PropsWithChildren<{ locale: string }>>
  sidebarSubtitle?: React.FC<PropsWithChildren<{ title: string }>>
  banner?: React.FC<PropsWithChildren<{ locale: string }>>
  bannerKey?: string
  gitTimestamp?:
    | string
    | React.FC<PropsWithChildren<{ locale: string; timestamp: Date }>>
  tocExtraContent?: React.FC<PropsWithChildren<{ locale: string }>>
  unstable_searchResultEmpty?:
    | React.ReactNode
    | React.FC<
        PropsWithChildren<{
          locale: string
        }>
      >
}

export type PageTheme = {
  navbar: boolean
  sidebar: boolean
  toc: boolean
  pagination: boolean
  footer: boolean
  layout: 'default' | 'full' | 'raw'
  typesetting: 'default' | 'article'
  breadcrumb: boolean
}

type Meta = Record<string, any>
