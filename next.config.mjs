import nextMDX from "@next/mdx";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import remarkSlug from "remark-slug";

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm, remarkSlug],
    rehypePlugins: [
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
});
export default withMDX({
  env: {
    BUILD_TIME: process.env.BUILD_TIME,
  },
  pageExtensions: ["js", "jsx", "md", "mdx"],
});
