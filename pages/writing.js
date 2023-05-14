import Layout from "../components/Layout";
import { useState } from "react";
import BlogPost from "../components/BlogPost";
import { getAllFilesFrontMatter } from '../lib/mdx';
import Link from "next/link";
import ThemeToogler from "../components/ThemeToogler";

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

            <Link href="/">
                <p className="flex flex-row">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-arrow-left-to-line opacity-80 mt-0.5 mr-1 w-5 h-5"><line x1="7" x2="21" y1="12" y2="12"></line><polyline points="13 6 7 12 13 18"></polyline><path d="M3 19V5"></path></svg>
                    <i>Index</i>
                </p>
            </Link>

            <h1 className="inter my-8 mt-8 sm:-mt-[0.05rem]">Writing</h1>

            <div className="flex flex-row space-x-8 sm:space-x-16 border-t">
                <div className="mt-3 opacity-75">
                    <time>2023</time>
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

            <div className="flex flex-row space-x-8 sm:space-x-16 border-t dark:border-t-zinc-800">
                <div className="mt-3 opacity-75">
                    <time>2022</time>
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

        </Layout>
    )
}

export async function getStaticProps() {
    const posts = await getAllFilesFrontMatter('blog');

    return { props: { posts } };
}