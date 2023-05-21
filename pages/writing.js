import Layout from "../components/Layout";
import { useState } from "react";
import BlogPost from "../components/BlogPost";
import { getAllFilesFrontMatter } from '../lib/mdx';
import Link from "next/link";
import { Tab } from '@headlessui/react'
import { motion } from 'framer-motion'

function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Blog({ posts, slug }) {
    const [opacity, setOpacity] = useState('false');
    const [searchValue, setSearchValue] = useState('');
    const filteredBlogPosts = posts
        .sort(
            (a, b) =>
                Number(new Date(b.date)) - Number(new Date(a.date))
        )
        .filter((frontMatter) =>
            frontMatter.title.toLowerCase().includes(searchValue.toLowerCase())
        );
    return (
        <Layout title="Writing">

            <h1 className='mx-auto px-0 md:px-6 sohne max-w-[67.5rem] uppercase text-5xl md:text-7xl sm:text-8xl'>
                I write about design, technology or something interesting.
            </h1>

            <div className='mt-4 md:mt-6 sm:mt-8 flex flex-col md:flex-row sm:flex-row justify-between space-x-0 md:space-x-8 sm:space-x-12'>
                <Tab.Group>

                    <div className='mt-6 ml-0 sm:ml-12 order-1 md:order-2 sm:order-1 w-full md:w-1/6 sm:w-1/6 mb-6'>

                        <Link className="border-none text-xl mt-8" href="/">
                            <i className="border-none">← Index</i>
                        </Link>

                        <p className='mt-6 mono nav-spacing text-xs'>
                            FILTER BY YEAR
                        </p>
                        <div className="uppercase mono">
                            <Tab.List>
                                <Tab className="ui-selected:bg-black ui-selected:text-white">Year 2023</Tab>
                                <br />
                                <Tab className="ui-selected:bg-black ui-selected:text-white">Year 2022</Tab>
                            </Tab.List>
                        </div>

                        <div className='hidden md:flex flex-row mt-6'>
                            <div className='w-1/2 sm:w-full'>
                                <h1 className='uppercase text-2xl nav-spacing'>Navigation</h1>

                                <div className='flex flex-col space-y-1'>

                                    <Link className="inter text-zinc-950 text-base md:text-lg sm:text-lg font-semibold border-none" href="/writing">
                                        Writing
                                    </Link>

                                    <Link className="inter text-zinc-950 text-base md:text-lg sm:text-lg font-semibold border-none" href="/design">
                                        Design
                                    </Link>

                                </div>
                            </div>

                            <div className='w-1/2 sm:w-full'>
                                <h1 className='uppercase text-2xl nav-spacing'>Social</h1>

                                <div className='flex flex-col space-y-1'>

                                    <Link className="inter text-zinc-950 text-base md:text-lg sm:text-lg font-semibold border-none" href="https://github.com/Cloudflare233">
                                        GitHub
                                    </Link>

                                    <Link className="inter text-zinc-950 text-base md:text-lg sm:text-lg font-semibold border-none" href="/twitter">
                                        Twitter
                                    </Link>

                                </div>

                            </div>
                        </div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }} 
                        className='order-2 md:order-1 sm:order-2 w-full md:w-2/3 sm:w-2/3 mb-6'
                    >
                        <Tab.Panels>
                            <Tab.Panel>
                                <div className="border-t">
                                    <div className="mt-3 opacity-75 mono">
                                        <time className="uppercase mono">Written in 2023</time>
                                    </div>
                                    <div className={cn('w-full',
                                        opacity === 'true' ? 'text-zinc-400 dark:text-zinc-600  opacity-100' : 'opacity-80')}>
                                        {filteredBlogPosts.slice(0, 3).map((frontMatter) => (
                                            <>
                                                {frontMatter.year === '2023' && (
                                                    <div className="">
                                                        <BlogPost
                                                            onMouseEnter={() => setOpacity('true')}
                                                            onMouseLeave={() => setOpacity('false')}
                                                            key={frontMatter.title} {...frontMatter}
                                                        />
                                                    </div>
                                                )}
                                            </>
                                        ))}
                                        {filteredBlogPosts.slice(3, 999999).map((frontMatter) => (
                                            <>
                                                {frontMatter.year === '2023' && (
                                                    <div className="border-t dark:border-t-zinc-800">
                                                        <BlogPost
                                                            onMouseEnter={() => setOpacity('true')}
                                                            onMouseLeave={() => setOpacity('false')}
                                                            key={frontMatter.title} {...frontMatter}
                                                        />
                                                    </div>
                                                )}
                                            </>
                                        ))}
                                    </div>
                                </div>
                            </Tab.Panel>
                            <Tab.Panel>
                                <div className="border-t">
                                    <div className="mt-3 opacity-75 mono">
                                        <time className="uppercase mono">Written in 2022</time>
                                    </div>
                                    <div className={cn('w-full',
                                        opacity === 'true' ? 'text-zinc-400 dark:text-zinc-600 opacity-100' : 'opacity-80')}>
                                        {filteredBlogPosts.slice(0, 1).map((frontMatter) => (
                                            <>
                                                {frontMatter.year === '2022' && (
                                                    <div className="">
                                                        <BlogPost
                                                            onMouseEnter={() => setOpacity('true')}
                                                            onMouseLeave={() => setOpacity('false')}
                                                            key={frontMatter.title} {...frontMatter}
                                                        />
                                                    </div>
                                                )}
                                            </>
                                        ))}
                                        {filteredBlogPosts.slice(1, 999999).map((frontMatter) => (
                                            <>
                                                {frontMatter.year === '2022' && (
                                                    <div className="border-t dark:border-t-zinc-800">
                                                        <BlogPost
                                                            onMouseEnter={() => setOpacity('true')}
                                                            onMouseLeave={() => setOpacity('false')}
                                                            key={frontMatter.title} {...frontMatter}
                                                        />
                                                    </div>
                                                )}
                                            </>
                                        ))}
                                    </div>
                                </div>

                            </Tab.Panel>
                        </Tab.Panels>
                    </motion.div>
                </Tab.Group>

                <div className='flex flex-row sm:flex-col sm:justify-start justify-between space-y-0 sm:space-y-6 order-2 md:hidden sm:order-2 w-full md:w-1/2 sm:w-1/6'>
                    <div className='w-1/2 sm:w-full'>
                        <h1 className='uppercase text-2xl nav-spacing'>Navigation</h1>

                        <div className='flex flex-col space-y-1'>

                            <Link className="inter text-zinc-950 text-base md:text-lg sm:text-lg font-semibold border-none" href="/writing">
                                Writing
                            </Link>

                            <Link className="inter text-zinc-950 text-base md:text-lg sm:text-lg font-semibold border-none" href="/design">
                                Design
                            </Link>

                        </div>
                    </div>

                    <div className='w-1/2 sm:w-full'>
                        <h1 className='uppercase text-2xl nav-spacing'>Social</h1>

                        <div className='flex flex-col space-y-1'>

                            <Link className="inter text-zinc-950 text-base md:text-lg sm:text-lg font-semibold border-none" href="https://github.com/Cloudflare233">
                                GitHub
                            </Link>

                            <Link className="inter text-zinc-950 text-base md:text-lg sm:text-lg font-semibold border-none" href="/twitter">
                                Twitter
                            </Link>

                        </div>

                    </div>
                </div>
            </div>



        </Layout>
    )
}

export async function getStaticProps() {
    const posts = await getAllFilesFrontMatter('blog');

    return { props: { posts } };
}