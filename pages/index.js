import { useState } from 'react';
import Layout from '../components/Layout'
import { getAllFilesFrontMatter } from '../lib/mdx';
import BlogPost from '../components/BlogPost';
import Link from 'next/link';
import moment from 'moment';
import Image from 'next/image'

function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}


const Home = ({ posts }) => {
    const time = moment().format("H")
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
        <Layout
            title="Geng Yue"
        >

            <h1 className='px-0 md:px-6 sohne max-w-[17.5rem] md:max-w-[67.5rem] sm:max-w-[67.5rem] uppercase text-4xl md:text-7xl sm:text-8xl'>Geng Yue is a senior grade 1 student at Yantai No.1 Middle School.</h1>

            <div className='mt-4 md:mt-6 sm:mt-8 flex flex-col md:flex-row sm:flex-row justify-between space-x-0 md:space-x-8 sm:space-x-12'>
                <div className='bg-[#EEE8AA] order-1 md:order-2 sm:order-1 w-full md:w-1/3 sm:w-1/3'>
                    <img src="/static/author.webp" className='mix-blend-multiply' />
                    <p className='mono text-xs -mt-4 flex sm:justify-start md:justify-start justify-end md:ml-6 sm:ml-12 mr-6'>A IMAGE OF HOMER SIMPSON</p>
                    <div className='hidden md:flex flex-row ml-8'>
                        <div className='w-1/2 sm:w-full'>
                            <h1 className='uppercase text-2xl nav-spacing'>Resource</h1>

                            <div className='flex flex-col space-y-1'>

                                <Link className="inter text-zinc-700 text-base md:text-lg sm:text-lg font-semibold border-none" href="/craft">
                                    Craft
                                </Link>

                                <Link className="inter text-zinc-700 text-base md:text-lg sm:text-lg font-semibold border-none" href="/design">
                                    Design
                                </Link>

                            </div>
                        </div>

                        <div className='w-1/2 sm:w-full'>
                            <h1 className='uppercase text-2xl nav-spacing'>Social</h1>

                            <div className='flex flex-col space-y-1'>

                                <Link className="inter text-zinc-700 text-base md:text-lg sm:text-lg font-semibold border-none" href="https://github.com/Cloudflare233">
                                    GitHub
                                </Link>

                                <Link className="inter text-zinc-700 text-base md:text-lg sm:text-lg font-semibold border-none" href="/twitter">
                                    Twitter
                                </Link>

                            </div>

                        </div>
                    </div>
                </div>
                <div className='order-2 md:order-1 sm:order-2 w-full md:w-2/3 sm:w-1/2'>
                    <p>
                        I'm particularly interested in crafting things, designing and coding.
                        Apart from I'm a normal senior grade 1 student, I'm also a self-taught developer.
                    </p>

                    <p>
                        I'm science geek who is ugly and awful. What I think the most important is amusement.
                        I really admire my math teacher who is widely known as "ker". I'm a iker consistently.
                        I talk about, write about and create things which are meaningless, I keep on working on
                        solving difficult questions. My partner is Next.js and Vercel▲.
                    </p>

                    <p>
                        Nowsaday I'm working on building iker-org and iker-translation. If you got any questions,
                        contact me through QQ or E-mail.
                    </p>

                    <p className='text-sm md:text-base sm:text-base opacity-75'>
                        Cloudflare233@yandex.com
                    </p>

                </div>

                <div className='flex flex-row sm:flex-col sm:justify-start justify-between space-y-0 sm:space-y-6 order-2 md:hidden sm:order-2 w-full md:w-1/2 sm:w-1/6'>
                    <div className='w-1/2 sm:w-full'>
                        <h1 className='uppercase text-2xl nav-spacing'>Resource</h1>

                        <div className='flex flex-col space-y-1'>

                            <Link className="inter text-zinc-700 text-base md:text-lg sm:text-lg font-semibold border-none" href="/craft">
                                Craft
                            </Link>

                            <Link className="inter text-zinc-700 text-base md:text-lg sm:text-lg font-semibold border-none" href="/design">
                                Design
                            </Link>

                        </div>
                    </div>

                    <div className='w-1/2 sm:w-full'>
                        <h1 className='uppercase text-2xl nav-spacing'>Social</h1>

                        <div className='flex flex-col space-y-1'>

                            <Link className="inter text-zinc-700 text-base md:text-lg sm:text-lg font-semibold border-none" href="https://github.com/Cloudflare233">
                                GitHub
                            </Link>

                            <Link className="inter text-zinc-700 text-base md:text-lg sm:text-lg font-semibold border-none" href="/twitter">
                                Twitter
                            </Link>

                        </div>

                    </div>
                </div>
            </div>

        </Layout >
    )
}


export default Home

export async function getStaticProps() {
    const posts = await getAllFilesFrontMatter('blog');

    return { props: { posts } };
}
