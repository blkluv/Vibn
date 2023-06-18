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
      title="耿越の小站">

      <ul className='my-6'>
        {posts.map((post) => (
          <>
            <div
              key={post.filePath}
              className={cn('flex flex-col space-x-0 md:space-x-2 sm:space-x-4 md:flex-row sm:flex-row',
                post.data.focus === 'yes' ? 'block' : 'hidden'
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
          </>
        ))}

        <hr className='my-6' />

        {posts.map((post) => (
          <div key={post.filePath} className={cn('columns-1',
            post.data.focus === 'yes' ? 'hidden' : 'block'
          )}>
            <Link
              as={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}
              href={`/posts/[slug]`}
            >
              <div className='w-full flex flex-row space-x-4 md:space-x-6 sm:space-x-8 my-4 border-b'>
                <div className='w-1/2'>
                  <img src={post.data.img} />
                </div>
                <div className='flex flex-col -mt-2 md:-mt-12 sm:-mt-16 justify-center w-1/2'>
                  <p className='text-sm md:text-base sm:text-base text-red-600 font-medium'>
                    {post.data.tag}
                  </p>
                  <h1 className='w-full mt-1 text-lg md:text-3xl sm:text-4xl hover:underline hover:decoration-red-600 font-bold'>
                    {post.data.title}
                  </h1>
                  <p className='mt-1 text-sm md:text-base sm:text-base'>
                    {moment(post.data.date).format('发表于YYYY年MM月DD日')}
                  </p>
                </div>
              </div>
            </Link>
          </div>
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
