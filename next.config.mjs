import nextMDX from '@next/mdx'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGfm from 'remark-gfm'
import remarkSlug from 'remark-slug'
import rehypePrism from 'rehype-prism'

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm, remarkSlug],
    rehypePlugins: [
      rehypePrism,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["anchor"],
          },
        },
      ],
    ],
  },
})
export default withMDX({
  pageExtensions: ['js', 'jsx', 'md', 'mdx']
})