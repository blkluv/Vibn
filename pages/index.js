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
            title="IKER -世界领先的IKER组织"
        >
            <img src="/static/foreground.png" className='z-0 w-full h-screen' />


            <div className='absolute top-16 inset-x-0'>
                <h1 className='mt-32 font-bold text-4xl text-center'>
                    特别活动 2023
                </h1>

                <p className='text-center font-medium text-lg opacity-75 mt-8'>
                    2023年7月至8月下旬举行
                </p>
            </div>


            <div className='mt-4'>

                <img src="/static/background.png" className='z-0 w-full h-screen' />

                <div className='-mt-[36rem] md:-mt-[56rem] sm:-mt-[48rem] absolute inset-x-0'>

                    <h1 className='mx-auto mt-32 font-bold text-4xl md:text-6xl sm:text-6xl text-center'>
                        世上最大IKER组织
                    </h1>

                    <p className='px-10 max-w-xl mx-auto font-medium text-lg md:text-xl sm:text-xl opacity-75 mt-12'>
                        能拿不丢登方舟，不听忠告海中游。
                        IKER是世界上最大的有组织的IKER组织（废话。
                        受到世界上超过114个国家和地区人民的喜爱（悲
                    </p>

                    <div className='mt-24 md:mt-48 sm:mt-56 center px-12 max-w-lg mx-auto flex flex-col md:flex-row sm:flex-row'>
                        <button className='w-full md:w-auto sm:w-auto text-center center text-white mt-10 mb-2 rounded-md bg-black/75 backdrop-blur-lg px-16 py-2'>
                            快速开始
                        </button>
                        <button className='w-full md:w-auto sm:w-auto text-center center rounded-md mt-0 md:mt-10 sm:mt-10 mb-2 bg-white/40 backdrop-blur-lg px-16 py-2'>
                            了解更多
                        </button>
                    </div>
                </div>

            </div>

            <div className='mt-4'>

                <img src="/static/rate.png" className='z-0 w-full h-screen' />

                <div className='-mt-[36rem] md:-mt-[56rem] sm:-mt-[48rem] absolute inset-x-0'>

                    <h1 className='mx-auto mt-32 font-bold text-4xl md:text-6xl sm:text-6xl text-center'>
                        Tim Cook曾说
                    </h1>

                    <p className='px-10 max-w-xl mx-auto font-medium text-lg md:text-xl sm:text-xl opacity-75 mt-12'>
                        “如果让我先知道IKER组织，我就不会接手苹果公司了。我一定会到IKER组织去工作，那里的机会比在苹果多。
                        朋友们，我是IKER。我认为IKER组织有着巨大的潜力。”
                    </p>

                    <div className='mt-24 md:mt-48 sm:mt-56 center px-12 max-w-lg mx-auto flex flex-col md:flex-row sm:flex-row'>
                        <button className='w-full md:w-auto sm:w-auto text-center center text-white mt-10 mb-2 rounded-md bg-black/75 backdrop-blur-lg px-16 py-2'>
                            工作机会
                        </button>
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
