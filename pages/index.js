import fs from 'fs'
import matter from 'gray-matter'
import Link from 'next/link'
import path from 'path'
import Layout from '../components/Layout'
import { postFilePaths, POSTS_PATH } from '../utils/mdxUtils'
import moment from 'moment/moment'

export default function Index({ posts }) {
  return (
    <Layout
      title="Geng Yue · Home">

      <h1>About</h1>

      <p className='my-6 text-zinc-300 text-lg'>
        I'm a senior grade 1 student from <a href="http://www.ytyz.net/">Yantai No.1 Middle School of Shandong</a>.
        I'm also a self-taught developer and designer.
        I'm a lazy writer and writing meaningless rubbish.
        I'm also a minimalist and don't feel like troubles.
      </p>

      <p className='my-6 text-zinc-300 text-lg'>
        The past years got me thinking why I was born into this ugly world,
        why I strengthened all my effort to fight for myself and usually got nothing,
        what I did is just for the others?
      </p>

      <h1 className='mt-12'>Writing</h1>

      <ul className='my-6'>
        {posts.map((post) => (
          <li key={post.filePath} className='my-4'>
            <Link
              as={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}
              href={`/posts/[slug]`}
            >
              <h1>
                <a>{post.data.title}
                </a></h1>
            </Link>
            <p className='mt-0.5 text-zinc-300 italic'>Published on {moment(post.data.date).format('MMMM DD,YYYY')}</p>
            <p className='my-1 text-zinc-300 text-lg'>
              {post.data.description}
            </p>
          </li>
        ))}
      </ul>

      <h1 className='mt-12'>Contact</h1>

      <div className='mt-6 flex flex-row space-x-8'>
        <div className='text-zinc-500 w-1/3'>
          <h1>E-mail</h1>
        </div>
        <div className='w-2/3 text-left'>
          <a href="mailto:Cloudflare233@yandex.com">
            <h2 className='text-zinc-300'>Cloudflare233@yandex.com</h2>
          </a>
        </div>
      </div>

      <div className='my-3 flex flex-row space-x-8'>
        <div className='text-zinc-500 w-1/3'>
          <h1>GitHub</h1>
        </div>
        <div className='w-2/3 text-left'>
          <a href="https://github.com/Cloudflare233">
            <h2 className='text-zinc-300'>@Cloudflare233</h2>
          </a>
        </div>
      </div>

      <div className='my-3 flex flex-row space-x-8'>
        <div className='text-zinc-500 w-1/3'>
          <h1>QQ</h1>
        </div>
        <div className='w-2/3 text-left'>
          <a href="#">
            <h2 className='text-zinc-300'>@3041299667</h2>
          </a>
        </div>
      </div>

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
