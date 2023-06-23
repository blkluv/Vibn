import { MDXRemote } from 'next-mdx-remote'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/Layout'
import {
  getNextPostBySlug,
  getPostBySlug,
  getPreviousPostBySlug,
  postFilePaths,
} from '../../utils/mdxUtils';
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

export default function PostPage({ source, frontMatter, prevPost, nextPost }) {
  return (
    <Layout
      title={`${frontMatter.title} · Posted`}
    >
      <br />
      <br />

      <Link href="/" className='opacity-75 py-1 mt-6'>
        ← Back to "Home"
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
      <hr className='border-zinc-200 dark:border-zinc-800' />
      <main className='overflow-x-auto max-w-3xl mt-6 mb-6 flex flex-col prose'>
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
      <hr className='mt-8 border-zinc-200 dark:border-zinc-800' />
      <footer className='mt-6'>
        <div className='flex flex-row justify-between'>
          <div>
            {prevPost && (
              <div className='flex flex-col opacity-75'>
                <span className='px-1.5 text-sm opacity-75'>
                  Previous
                </span>
                <Link className="no-underline" href={`/posts/${prevPost.slug}`}>
                  ← {prevPost.title}
                </Link>
              </div>
            )}
          </div>
          <div>
            {nextPost && (
              <div className='flex flex-col opacity-75'>
                <span className='px-1.5 text-sm opacity-75'>
                  Next
                </span>
                <Link className="no-underline" href={`/posts/${nextPost.slug}`}>
                  {nextPost.title} →
                </Link>
              </div>
            )}
          </div>
        </div>
      </footer>

    </Layout >
  )
}

export const getStaticProps = async ({ params }) => {
  const { mdxSource, data } = await getPostBySlug(params.slug);
  const prevPost = getPreviousPostBySlug(params.slug);
  const nextPost = getNextPostBySlug(params.slug);

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      prevPost,
      nextPost,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

