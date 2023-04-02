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
    const [opacity, setOpacity] = useState('false');
    const [searchValue, setSearchValue] = useState('');
    const [all, setAll] = useState(false);
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

            <h1>About</h1>

            <p className='mt-6 opacity-75 text-[1rem]'>I'm a senior grade 1 student from Yantai No.1 Middle School. Meanwhile, a iker. A.k.a. Cloudflare233 online.
                I love writing, talking and dreaming. Fulfilling my dream with all my effort. Mostly interested in math. </p>

            <p className='mt-6 opacity-75 text-[1rem]'>I'm currently working on finishing my schoolwork in the school library. Lie down on the bed, listening to music. Playing with soft toys. Admiring ker.
                Still designing and coding, in consquence, building a better web.</p>

            <h1 className='mt-16'>Contact</h1>

            <div className='mt-12 inter flex flex-col sm:flex-row space-y-2 sm:space-y-0 space-x-0 sm:space-x-2'>
                <div className='w-full sm:w-1/4 opacity-50'>
                    GitHub
                </div>

                <div className='w-full'>
                    <a className='opacity-75 text-[1rem] underline' href="https://github.com/Cloudflare233">@Cloudflare233</a>
                </div>
            </div>

            <div className='mt-4 inter flex flex-col sm:flex-row space-y-2 sm:space-y-0 space-x-0 sm:space-x-2'>
                <div className='w-full sm:w-1/4 opacity-50'>
                    QQ
                </div>

                <div className='w-full'>
                    <a className='opacity-75 text-[1rem] underline'>@3041299667</a>
                </div>
            </div>

            <div className='mt-4 inter flex flex-col sm:flex-row space-y-2 sm:space-y-0 space-x-0 sm:space-x-2'>
                <div className='w-full sm:w-1/4 opacity-50'>
                    E-Mail
                </div>

                <div className='w-full'>
                    <a className='opacity-75 text-[1rem] underline' href="mailto:Cloudflare233@yandex.com">Cloudflare233@yandex.com</a>
                </div>
            </div>

            <h1 className='mt-16'>Select Writing</h1>

            <div className='mt-12 inter flex flex-col sm:flex-row space-y-6 sm:space-y-0 space-x-0 sm:space-x-4'>
                <div className='opacity-50 w-full sm:w-1/4 '>
                    2023
                </div>

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

            <div className='mt-12 inter flex flex-col sm:flex-row space-y-6 sm:space-y-0 space-x-0 sm:space-x-4'>
                <div className='opacity-50 w-full sm:w-1/4 '>
                    2022
                </div>

                <div className='flex flex-col space-y-6 w-full'>
                    {filteredBlogPosts.map((frontMatter) => (
                        <>
                            {frontMatter.year === '2022' && (
                                <BlogPost
                                    key={frontMatter.title} {...frontMatter}
                                />
                            )}
                        </>
                    ))}
                </div>
            </div>


            <h1 className='mt-16'>Putrid Experience</h1>

            <div className='mt-12 inter flex flex-col sm:flex-row space-y-6 sm:space-y-0 space-x-0 sm:space-x-4'>
                <div className='opacity-50 w-full sm:w-1/4 '>
                    2022-Now
                </div>

                <div className=''>
                    <h2>Yantai No.1 Middle School</h2>

                    <p className='opacity-75 mt-4'>This is the place where I'm currently studying in. If you can reach the campus, get me in Class 2, senior grade 1!</p>
                </div>
            </div>

            <div className='mt-12 inter flex flex-col sm:flex-row space-y-6 sm:space-y-0 space-x-0 sm:space-x-4'>
                <div className='opacity-50 w-full sm:w-1/4 '>
                    2018-2022
                </div>

                <div className=''>
                    <h2>Yantai Zhifu Middle School</h2>

                    <p className='opacity-75 mt-4'>This is the place where I studied there for 4 years. It had been a terrible experience.</p>
                </div>
            </div>

            <div className='mt-12 inter flex flex-col sm:flex-row space-y-6 sm:space-y-0 space-x-0 sm:space-x-4'>
                <div className='opacity-50 w-full sm:w-1/4 '>
                    2013-2018
                </div>

                <div className=''>
                    <h2>Putaoshan Primary School</h2>

                    <p className='opacity-75 mt-4'>This is the primary school! Happy childhood! I really miss the familiar campus.</p>
                </div>
            </div>

            <div className='mt-12 inter flex flex-col sm:flex-row space-y-6 sm:space-y-0 space-x-0 sm:space-x-4'>
                <div className='opacity-50 w-full sm:w-1/4 '>
                    2007-2013
                </div>

                <div className=''>
                    <h2>Born & Learn</h2>

                    <p className='opacity-75 mt-4'>I did all the normal human did before, I can never end up as a donkey, right?</p>
                </div>
            </div>

        </Layout >
    )
}

Home.theme = 'dark'
export default Home

export async function getStaticProps() {
    const posts = await getAllFilesFrontMatter('blog');

    return { props: { posts } };
}
