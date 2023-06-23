import Link from 'next/link'
import Layout from '../components/Layout'
import { getPosts } from '../utils/mdxUtils';
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
        Currently working on building <a href="https://github.com/Cloudflare233/ikermusic">IKER Music</a>. You can contact me through <a href="mailto:Cloudflare233@yandex.com">E-mail</a>.
      </p>

      <Tab.Group>
        <Tab.List className="sticky top-0 py-2.5 z-[114514] bg-white dark:bg-zinc-950 my-8 flex flex-row space-x-2">
          <Tab selected
            className="ui-not-selected:opacity-75 ui-selected:opacity-100 px-2 rounded-md ui-selected:bg-zinc-200 dark:ui-selected:bg-zinc-800"
          >
            Posted
          </Tab>
          <Tab
            className="ui-not-selected:opacity-75 ui-selected:opacity-100 px-2 rounded-md ui-selected:bg-zinc-200 dark:ui-selected:bg-zinc-800"
          >
            Design Guideline
          </Tab>
          <Tab
            className="ui-not-selected:opacity-75 ui-selected:opacity-100 px-2 rounded-md ui-selected:bg-zinc-200 dark:ui-selected:bg-zinc-800"
          >
            Works</Tab>
        </Tab.List>
        <Tab.Panels className="focus:outline-none">
          <Tab.Panel>
            {posts.map((post) => (
              <div
                key={post.filePath}
                className="flex flex-col space-y-4 md:space-y-0 sm:space-y-0 md:flex-row sm:flex-row space-x-0 md:space-x-4 sm:space-x-4 cursor-pointer px-2 py-2"
              >
                <img
                  src={post.data.coverImg}
                  className="rounded-md justify-center align-middle inline-center w-full md:w-1/5 sm:w-1/6 h-2/3"
                />
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
                    <hr className='my-4 border-zinc-200 dark:border-zinc-800' />
                  </div>
                </Link>
              </div>
            ))}
          </Tab.Panel>
          <Tab.Panel>

            <h1 className='mt-8 ml-2 font-medium'>The Design Guideline</h1>

            <p className='opacity-75 mt-8 px-2'>
              Good design must be reliable, responsible, user-friendly. With limited animations, good userinterface and better user experience.
              Here is the stage I view my idea about design and find inspirations to build, for what? A better Web.
            </p>

            <p className='mt-6 px-2 opacity-75'>
              It is well-known that website design must be simple, reachable and followed "User First". The following I'll show how these things
              working on my website.
            </p>

            <div className='flex flex-col md:flex-row sm:flex-row space-x-0 md:space-x-4 sm:space-x-4 justify-between'>

              <div>

                <h1 className='mt-8 ml-2 font-medium'>Colors</h1>

                <div className='mt-6 flex flex-row space-x-4 overflow-x-auto'>
                  <div className='flex flex-col justify-center bg-white border rounded-full w-24 h-24'>
                    <p className='text-black text-center opacity-75'>White #fff</p>
                  </div>

                  <div className='flex flex-col justify-center bg-zinc-200 border rounded-full w-24 h-24'>
                    <p className='text-black text-center opacity-75'>Zinc rgb(228 228 231)</p>
                  </div>

                  <div className='flex flex-col justify-center bg-zinc-300 border rounded-full w-24 h-24'>
                    <p className='text-black text-center opacity-75'>Zinc rgb(212 212 216)</p>
                  </div>
                </div>

                <div className='mt-6 flex flex-row space-x-4 overflow-x-auto'>
                  <div className='flex flex-col justify-center bg-zinc-700 border rounded-full w-24 h-24'>
                    <p className='text-white text-center opacity-75'>Zinc rgb(63 63 70)</p>
                  </div>

                  <div className='flex flex-col justify-center bg-zinc-800 border rounded-full w-24 h-24'>
                    <p className='text-white text-center opacity-75'>Zinc rgb(39 39 42)</p>
                  </div>

                  <div className='flex flex-col justify-center bg-black border rounded-full w-24 h-24'>
                    <p className='text-white text-center opacity-75'>Black #000</p>
                  </div>
                </div>

              </div>

              <div>

                <h1 className='mt-8 ml-2 font-medium'>Typography</h1>

                <h1 className='opacity-75 mt-6 px-2'>ABCDEFGHIJKLMNOPQRSTUVWXYZ</h1>

                <p className='opacity-75 mt-4 px-2'>abcdefghijklmnopqrstuvwxyz</p>

                <p className='opacity-75 mt-4 px-2'>0123456789</p>

                <p className='opacity-75 mt-4 px-2'>The quick brown fox jumps over a lazy dog</p>

              </div>

            </div>

            <h1 className='mt-8 ml-2 font-medium'>Colophon</h1>

            <p className='opacity-75 px-2 flex flex-row space-x-2 mt-6'>
              <span className='opacity-75'>Font</span>
              <span>Syne Variable</span>
            </p>

            <p className='opacity-75 px-2 flex flex-row space-x-2 mt-4'>
              <span className='opacity-75'>Framework</span>
              <span>Next.js by Vercel</span>
            </p>

            <p className='opacity-75 px-2 flex flex-row space-x-2 mt-4'>
              <span className='opacity-75'>Styles</span>
              <span>TailwindCSS</span>
            </p>

            <p className='opacity-75 px-2 flex flex-row space-x-2 mt-4'>
              <span className='opacity-75'>Deployed on</span>
              <span>Vercel</span>
            </p>

            <br />

            <a className="opacity-75 font-medium px-2 mt-8" href="https://github.com/Cloudflare233/www">All the best parts are open-sourced →</a>

          </Tab.Panel>
          <Tab.Panel>WIP...</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>


    </Layout>
  )
}

export function getStaticProps() {
  const posts = getPosts();

  return { props: { posts } };
}
