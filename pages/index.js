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
            title="iker"
        >

            <h1 className='mt-16 max-w-4xl mx-auto text-center text-6xl md:text-9xl sm:text-9xl font-bold'>
               没有谁能够阻挡,我们iker的向往
            </h1>

            <div className='font-medium max-w-md mt-24 mx-auto flex space-y-4 space-x-0 md:space-y-0 sm:space-y-0 md:space-x-4 sm:space-x-4 flex-col md:flex-row sm:flex-row'>
                <button className='w-full md:w-1/2 sm:w-1/2 px-12 py-3 sm:py-4 bg-black text-white rounded-lg text-lg border border-black'>快速上手</button>
                <button className='w-full md:w-1/2 sm:w-1/2 px-12 py-3 sm:py-4 bg-white text-black rounded-lg text-lg border border-black'>我们是谁？</button>
            </div>

        </Layout >
    )
}


export default Home

export async function getStaticProps() {
    const posts = await getAllFilesFrontMatter('blog');

    return { props: { posts } };
}
