import fs from 'fs'
import matter from 'gray-matter'
import Link from 'next/link'
import path from 'path'
import Layout from '../components/Layout'
import { postFilePaths, POSTS_PATH } from '../utils/mdxUtils'
import moment from 'moment/moment'

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Index({ posts }) {
  return (
    <Layout
      title="Geng Yue · Home">

      <ul className='my-6'>
        {posts.map((post) => (
          <>
            <div
              key={post.filePath}
              className={cn('flex flex-col space-x-0 md:space-x-2 sm:space-x-4 md:flex-row sm:flex-row',
                post.data.focus === 'yes' ? '' : ''
              )}>
              <div className='w-full'>
                <p className='text-red-600 font-medium my-4'>共同关注</p>
                <Link
                  as={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}
                  href={`/posts/[slug]`}
                >
                  <h1 className='hover:underline hover:decoration-red-600 font-bold text-center text-3xl md:text-4xl sm:text-5xl'>
                    {post.data.title}
                  </h1>
                </Link>
                <img src={post.data.img} className='my-6 text-center center' />
              </div>
            </div>
            <li key={post.filePath} className='my-4'>
              <Link
                as={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}
                href={`/posts/[slug]`}
              >
                <h1 className='font-bold'>
                  {post.data.title}
                </h1>
              </Link>
              <p className='my-1 text-zinc-300 text-lg'>
                {post.data.description}
              </p>
            </li>
          </>
        ))}
      </ul>

    </Layout>
  )
}

export function getStaticProps() {
  const posts = postFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath))
    const { content, data } = matter(source)

    return {
      content,
      data,
      filePath,
    }
  })

  return { props: { posts } }
}
