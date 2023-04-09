import Layout from "../components/Layout"
import Link from "next/link"
import { useState } from "react";
import { getAllFilesFrontMatter } from '../lib/mdx';
import BlogPost from '../components/BlogPost';

export default function Writing({posts}) {
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
            <Link href="/" className="opacity-75 text-sm sm:text-base">← Back to home</Link>

            <h1 className="mt-8 serif">Writing</h1>

            <p className="mt-8">Here are thoughts I had. Meaningless articles.</p>

            <div className='mt-12 flex flex-col space-y-6'>
                <div className='opacity-75 text-sm sm:text-base w-full sm:w-1/4 '>
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

            <div className="flex justify-center my-8 opacity-75">
                <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM12.5 8.625C13.1213 8.625 13.625 8.12132 13.625 7.5C13.625 6.87868 13.1213 6.375 12.5 6.375C11.8787 6.375 11.375 6.87868 11.375 7.5C11.375 8.12132 11.8787 8.625 12.5 8.625Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
            </div>

            <div className='mt-8 flex flex-col space-y-6'>
                <div className='opacity-75 text-sm sm:text-base w-full sm:w-1/4 '>
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


        </Layout>
    )
}

export async function getStaticProps() {
    const posts = await getAllFilesFrontMatter('blog');

    return { props: { posts } };
}