export default {
  index: {
    type: 'page',
    title: 'Nextra',
    display: 'hidden',
    theme: {
      layout: 'raw'
    }
  },
  docs: {
    type: 'page',
    title: 'Documentation'
  },
  version: {
    type: 'menu',
    title: 'Version',
    items: {
      2: {
        title: 'Nextra v2 Docs ↗',
        href: 'https://nextra-v2-oe0zrpzjp-shud.vercel.app',
        newWindow: true
      }
    }
  },
  about: {
    type: 'page',
    title: 'About',
    theme: {
      typesetting: 'article'
    }
  },
  showcase: {
    type: 'page',
    title: 'Showcase',
    theme: {
      typesetting: 'article',
      layout: 'full',
      timestamp: false
    }
  },
  sponsors: {
    type: 'page',
    title: 'Sponsors',
    theme: {
      typesetting: 'article',
      timestamp: false
    }
  },
  404: {
    type: 'page',
    theme: {
      timestamp: false,
      typesetting: 'article'
    }
  }
}
