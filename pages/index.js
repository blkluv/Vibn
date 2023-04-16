import { useState } from 'react';
import Layout from '../components/Layout'
import { getAllFilesFrontMatter } from '../lib/mdx';
import BlogPost from '../components/BlogPost';
import Link from 'next/link';

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
            title="耿越の神奇空间"
        >

            <div className='flex flex-col sm:flex-row space-x-0 sm:space-x-12 space-y-8 sm:space-y-0'>
                <img src="/me.png" className='hover:invert border border-teal-800' />

                <div className=''>
                    <h1 className='text-teal-600'>数学方舟已经停止抵抗</h1>

                    <p className='mt-8'>贱河起义军领袖马丁·路德·崔已经宣布胆怯的数学方舟再也不能承受贱河起义军压倒性的力量所带来的举舟上下的压力。数学方舟选择弃舟逃离，并已开始流亡。他的主要部队已经停止抵抗，而贱河起义军现在已经控制了他的方舟。</p>

                    <p className='mt-4'>虽然对抗贵江<sup>1</sup>的战争依然在别处继续，但这对于贱河人来说是一个伟大的胜利。</p>

                    <p className='mt-4 opacity-75 text-xs sm:text-sm'>1. 在这里非指人名</p>

                    <p className='mt-6 opacity-75 text-xs sm:text-sm'>快速链接</p>
                    
                    <Link href="/about">
                    <button className='text-center mt-2 border px-4 py-0.5 border-teal-800 text-teal-600'>该世界观是什么？</button>
                    </Link>

                    <Link href="/war">
                        <button className='text-center mt-2 border px-4 py-0.5 border-teal-800 text-teal-600'>江河战争的真实照片</button>
                    </Link>

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
