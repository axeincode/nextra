import { useRouter } from 'next/router'
import type { Mock } from 'vitest'
import { collectPostsAndNavs } from '../src/utils/collect'
import {
  articleOpts,
  config,
  indexOpts,
  postsOpts
} from './__fixture__/page-map'

vi.mock('next/router', () => ({
  useRouter: vi.fn()
}))

describe('collect', () => {
  it('page', () => {
    ;(useRouter as Mock).mockReturnValue({ route: '/' })
    expect(collectPostsAndNavs({ opts: indexOpts, config }))
      .toMatchInlineSnapshot(`
        {
          "navPages": [
            {
              "active": false,
              "frontMatter": {
                "date": "2020-01-03T00:00:00.000Z",
                "title": "Random Thoughts",
                "type": "posts",
              },
              "name": "index",
              "route": "/posts",
            },
            {
              "active": true,
              "frontMatter": {
                "date": "2020-01-01T00:00:00.000Z",
                "title": "About",
                "type": "page",
              },
              "name": "index",
              "route": "/",
            },
          ],
          "posts": [
            {
              "frontMatter": {
                "author": "Shu",
                "date": "2016/5/21",
                "description": "At the time when I was getting into web development, I had the chance to read one of the most inspiring book about the web, Aaron Swartz's A Programmable Web. And it completely changed my mind.",
                "tag": "web development",
                "title": "Notes on A Programmable Web by Aaron Swartz",
              },
              "name": "aaron-swartz-a-programmable-web",
              "route": "/posts/aaron-swartz-a-programmable-web",
            },
          ],
        }
      `)
  })
  it('posts', () => {
    ;(useRouter as Mock).mockReturnValue({ route: '/posts' })
    expect(collectPostsAndNavs({ opts: postsOpts, config }))
      .toMatchInlineSnapshot(`
        {
          "navPages": [
            {
              "active": true,
              "frontMatter": {
                "date": "2020-01-03T00:00:00.000Z",
                "title": "Random Thoughts",
                "type": "posts",
              },
              "name": "index",
              "route": "/posts",
            },
            {
              "active": false,
              "frontMatter": {
                "date": "2020-01-01T00:00:00.000Z",
                "title": "About",
                "type": "page",
              },
              "name": "index",
              "route": "/",
            },
          ],
          "posts": [
            {
              "frontMatter": {
                "author": "Shu",
                "date": "2016/5/21",
                "description": "At the time when I was getting into web development, I had the chance to read one of the most inspiring book about the web, Aaron Swartz's A Programmable Web. And it completely changed my mind.",
                "tag": "web development",
                "title": "Notes on A Programmable Web by Aaron Swartz",
              },
              "name": "aaron-swartz-a-programmable-web",
              "route": "/posts/aaron-swartz-a-programmable-web",
            },
          ],
        }
      `)
  })
  it('article', () => {
    ;(useRouter as Mock).mockReturnValue({
      route: '/posts/aaron-swartz-a-programmable-web'
    })
    expect(collectPostsAndNavs({ opts: articleOpts, config }))
      .toMatchInlineSnapshot(`
        {
          "navPages": [
            {
              "active": false,
              "frontMatter": {
                "date": "2020-01-03T00:00:00.000Z",
                "title": "Random Thoughts",
                "type": "posts",
              },
              "name": "index",
              "route": "/posts",
            },
            {
              "active": false,
              "frontMatter": {
                "date": "2020-01-01T00:00:00.000Z",
                "title": "About",
                "type": "page",
              },
              "name": "index",
              "route": "/",
            },
          ],
          "posts": [
            {
              "frontMatter": {
                "author": "Shu",
                "date": "2016/5/21",
                "description": "At the time when I was getting into web development, I had the chance to read one of the most inspiring book about the web, Aaron Swartz's A Programmable Web. And it completely changed my mind.",
                "tag": "web development",
                "title": "Notes on A Programmable Web by Aaron Swartz",
              },
              "name": "aaron-swartz-a-programmable-web",
              "route": "/posts/aaron-swartz-a-programmable-web",
            },
          ],
        }
      `)
  })
})
