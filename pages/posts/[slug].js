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
      title={`${frontMatter.title} · Timeline`}
    >
      <br />
      <br />

      <Link href="/#timeline" className='opacity-75 py-1 mt-6'>
        ← Back to timeline
      </Link>
      <h1 className='font-medium mt-8'>Details: {frontMatter.title}</h1>
      <div className='mt-4 flex flex-row space-x-2'>
        <div className='opacity-75 bg-zinc-200 dark:bg-zinc-800 rounded-md px-1'>{frontMatter.tag}</div>
        {frontMatter.date && (
          <p className='opacity-75 bg-zinc-200 dark:bg-zinc-800 rounded-md px-1'>
            {moment(frontMatter.date).format('MMMM DD, YYYY')}
          </p>
        )}
      </div>

      {frontMatter.desc && (
        <p className="mt-6 mb-5 opacity-75">
          <span className='dark:text-white rounded-md opacity-75 mr-2'>
            Desc
          </span>
          <span className='mt-2'>{frontMatter.desc}</span>
        </p>
      )}
      <hr className='border-zinc-300 dark:border-zinc-700' />
      <main className='max-w-3xl mt-6 mb-6 flex flex-col prose'>
        <span className='rounded-md dark:text-white/75 opacity-75 mr-2'>
          Content
        </span>
        <MDXRemote {...source} components={components} />
        {frontMatter.img && (
          <>
            <span className='dark:text-white/75 rounded-md opacity-75 mr-2'>
              Related Photo
            </span>
            <img src={frontMatter.img} className='mt-4 rounded-md' />
          </>
        )}

      </main>

    </Layout >
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
