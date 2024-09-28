export default {
  index: {
    title: 'Introduction',
    type: 'page',
    display: 'hidden'
  },
  docs: {
    type: 'page',
    title: 'Docs'
  },
  remote: {
    type: 'page',
    title: 'Remote',
    href: '/remote/4423220'
  },
  about: {
    type: 'menu',
    title: 'About',
    items: new Map([
      [
        'contributors',
        {
          title: 'Contributors',
          href: 'https://github.com/vercel/swr/graphs/contributors',
          newWindow: true
        }
      ],
      ['team', { title: 'Team' }],
      ['acknowledgement', { title: 'Acknowledgement' }],
      ['a-page', { title: 'A Page' }],
      ['changelog', { title: 'Changelog' }],
      [
        '123',
        {
          title: 'Last, key is number',
          href: 'https://google.com',
          newWindow: true
        }
      ]
    ])
  },
  examples: {
    type: 'page',
    title: 'Examples',
    theme: {
      layout: 'full'
    }
  },
  blog: {
    type: 'page',
    title: 'Blog',
    theme: {
      sidebar: false,
      toc: true,
      breadcrumb: false,
      typesetting: 'article'
    }
  },
  nextra_link: {
    type: 'page',
    title: 'Nextra ↗',
    href: 'https://github.com/shuding/nextra',
    newWindow: true
  }
}
