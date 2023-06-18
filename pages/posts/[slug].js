import fs from 'fs'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'
import path from 'path'
import CustomLink from '../../components/CustomLink'
import Layout from '../../components/Layout'
import { postFilePaths, POSTS_PATH } from '../../utils/mdxUtils'
import moment from 'moment'

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  // It also works with dynamically-imported components, which is especially
  // useful for conditionally loading components for certain routes.
  // See the notes in README.md for more details.
  TestComponent: dynamic(() => import('../../components/TestComponent')),
  Head,
}

export default function PostPage({ source, frontMatter }) {
  return (
    <Layout
      title={`${frontMatter.title} · 文章`}
    >
      <div className="max-w-3xl py-6">
        <h1 className='font-bold text-3xl md:text-4xl sm:text-5xl'>{frontMatter.title}</h1>
        <p className='opacity-75 text-base md:text-lg sm:text-xl font-medium my-6'>
          发表于 {moment(frontMatter.date).format('YYYY年MM月DD日')}
        </p>
        {frontMatter.desc&& (
          <p className="mt-2 mb-5 text-base md:text-lg sm:text-xl">{frontMatter.desc}</p>
        )}
      </div>
      <hr />
      <main className='max-w-3xl mt-6 mb-6 text-base md:text-lg sm:text-xl prose prose-p:text-black prose-p:text-lg'>
        <MDXRemote {...source} components={components} />
      </main>

    </Layout>
  )
}

export const getStaticProps = async ({ params }) => {
  const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`)
  const source = fs.readFileSync(postFilePath)

  const { content, data } = matter(source)

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  })

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  }
}

export const getStaticPaths = async () => {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }))

  return {
    paths,
    fallback: false,
  }
}
