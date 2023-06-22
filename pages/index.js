import fs from 'fs'
import matter from 'gray-matter'
import Link from 'next/link'
import path from 'path'
import Layout from '../components/Layout'
import { postFilePaths, POSTS_PATH } from '../utils/mdxUtils'
import moment from 'moment/moment'
import { Tab } from '@headlessui/react'

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Index({ posts }) {
  return (
    <Layout
      title="Geng Yue · Home">

      <img
        src="/static/author.webp"
        className="mt-10 rounded-full w-40 h-32"
      />

      <h1
        className='ml-2 mt-8 text-4xl sm:text-5xl font-semibold'
      >
        Geng Yue
      </h1>

      <p className='ml-1 mt-6 opacity-75'>
        A senior grade 1 student from <a href="http://www.ytyz.net">Yantai No.1 Middle School of Shandong</a>. He/him lives in
        Yantai, Shandong and is also a self-taught developer(may be ~).
      </p>

      <p className='ml-1 mt-4 opacity-75'>
        Currently working on building <a href="https://github.com/Cloudflare233/ikermusic">IKER Music</a>.
      </p>

      <Tab.Group>
        <Tab.List className="my-8 flex flex-row space-x-2">
          <Tab selected
            className="ui-not-selected:opacity-75 ui-selected:opacity-100 px-2 rounded-md ui-selected:bg-zinc-200 dark:bg-zinc-800"
          >
            Timeline
          </Tab>
          <Tab
            className="ui-not-selected:opacity-75 ui-selected:opacity-100 px-2 rounded-md ui-selected:bg-zinc-200 dark:bg-zinc-800"
          >
            Design Guideline
          </Tab>
          <Tab
            className="ui-not-selected:opacity-75 ui-selected:opacity-100 px-2 rounded-md ui-selected:bg-zinc-200 dark:bg-zinc-800"
          >
            Contact</Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            {posts.map((post) => (
              <div
                key={post.filePath}
                className="cursor-pointer border-l-4 dark:border-l-zinc-700 px-4 py-2"
              >
                <Link
                  as={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}
                  href={`/posts/[slug]`}
                  legacyBehavior
                >
                  <div>
                    <span className="hover:rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all duration-300 px-1 py-1 opacity-100 font-medium">{post.data.title} →</span>
                    {post.data.desc && (
                      <p className="mt-3 opacity-60">
                        {post.data.desc}
                      </p>
                    )}
                    <div className='mt-4 flex flex-row space-x-2'>
                      <div className='opacity-75 bg-zinc-200 dark:bg-zinc-800 rounded-md px-1'>{post.data.tag}</div>
                      {post.data.date && (
                        <p className='opacity-75 bg-zinc-200 dark:bg-zinc-800 rounded-md px-1'>
                          {moment(post.data.date).format('MMMM DD, YYYY')}
                        </p>
                      )}
                    </div>
                    <hr className='my-4 border-zinc-300 dark:border-zinc-700' />
                  </div>
                </Link>
              </div>
            ))}
          </Tab.Panel>
          <Tab.Panel>WIP...</Tab.Panel>
          <Tab.Panel>WIP...</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>


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
