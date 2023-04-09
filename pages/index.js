import { useState } from 'react';
import Layout from '../components/Layout'
import { getAllFilesFrontMatter } from '../lib/mdx';
import BlogPost from '../components/BlogPost';
import Link from 'next/link';
import ActivityCard from '../components/ActivityCard';
import ThemeToogler from '../components/ThemeToogler';

function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}


const Home = ({ posts }) => {
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

            <h1 className='serif'>Geng Yue</h1>

            <p className='mt-8'>I'm a 16yo senior high student from <a href="http://www.ytyz.net/">Yantai No.1 Middle School</a>. I love singing, dancing, ropping and playing basketball.</p>

            <p className='mt-8'>Meanwhile I'm a iker, always looking for another opportunity to express.</p>

            <h1 className='text-sm sm:text-base opacity-75 mt-12'>Now</h1>

            <p className='mt-8'>Rotting in the libray, like in a jail.</p>

            <div className='flex flex-row justify-between'>
                <h1 className='text-sm sm:text-base opacity-75 mt-12'>Collection</h1>
                <Link className='text-sm sm:text-base opacity-75 mt-12' href="/collection">View all →</Link>
            </div>

            <div className='snap-x flex flex-row space-x-4 overflow-x-auto mt-8'>
                <img src="/collection/jj.jpg" className='rounded-lg' />
                <img src="/collection/wgj.jpeg" className='rounded-lg' />
                <img src="/collection/cmf.jpg" className='rounded-lg' />
            </div>

            <div className='flex flex-row justify-between'>
                <h1 className='text-sm sm:text-base opacity-75 mt-12'>Writing</h1>
                <Link className='text-sm sm:text-base opacity-75 mt-12' href="/writing">View all →</Link>
            </div>

            <div className='mt-6 flex flex-col space-y-6 space-x-0'>
                <div className='flex flex-col space-y-6 w-full'>
                    {filteredBlogPosts.map((frontMatter) => (
                        <>
                            {frontMatter.year === '2023' && (
                                <BlogPost
                                    key={frontMatter.title} {...frontMatter}
                                />
                            )}
                        </>
                    ))}
                </div>
            </div>


            <div className='flex flex-row justify-between'>
                <h1 className='text-sm sm:text-base opacity-75 mt-12'>Contact</h1>
            </div>

            <p className='mt-8'>I'm currently looking for <span className='serif'>no</span> opportunity. But I'm happy if you can contact me throughout the way below.</p>

            <div className='mt-8 text-base sm:text-lg flex flex-col sm:flex-row space-y-2 sm:space-y-0 space-x-0 sm:space-x-2'>
                <div className='w-full sm:w-1/2'>
                    GitHub
                </div>

                <div className='w-full'>
                    <a className='opacity-75 no-no-underline' href="https://kgithub.com/Cloudflare233">@Cloudflare233</a>
                </div>
            </div>

            <div className='mt-4 text-base sm:text-lg flex flex-col sm:flex-row space-y-2 sm:space-y-0 space-x-0 sm:space-x-2'>
                <div className='w-full sm:w-1/2'>
                    QQ
                </div>

                <div className='w-full'>
                    <a className='opacity-75 no-no-underline'>@3041299667</a>
                </div>
            </div>

            <div className='mt-4 text-base sm:text-lg flex flex-col sm:flex-row space-y-2 sm:space-y-0 space-x-0 sm:space-x-2'>
                <div className='w-full sm:w-1/2'>
                    E-Mail
                </div>

                <div className='w-full'>
                    <a className='opacity-75 no-underline' href="mailto:Cloudflare233@yandex.com">Cloudflare233@yandex.com</a>
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
