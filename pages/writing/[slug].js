import Layout from '../../components/Layout';
import { getFiles, getFileBySlug } from '../../lib/mdx';
import { MDXRemote } from "next-mdx-remote";
import Head from 'next/head';
import Image from '../../components/Image'
import { MathJaxProvider, MathJaxNode } from '@yozora/react-mathjax'
import Link from 'next/link';
import moment from 'moment'
import Date from '../../components/Date';

const components = {
    // It also works with dynamically-imported components, which is especially
    // useful for conditionally loading components for certain routes.
    // See the notes in README.md for more details.
    Head,
    Image,
    MathJaxNode
};

const Writing = ({ mdxSource, frontMatter }) => {
    const year = frontMatter.year;
    const date = frontMatter.date;
    const time = year + date;
    return (
        <Layout
            title={frontMatter.title}
        >

            <h1 className='mx-auto px-0 md:px-6 sohne max-w-[67.5rem] uppercase text-5xl md:text-7xl sm:text-8xl'>
                {frontMatter.title}
            </h1>

            <div className='mt-4 md:mt-6 sm:mt-8 flex flex-col md:flex-row sm:flex-row justify-between space-x-0 md:space-x-8 sm:space-x-12'>

                <div className='mt-6 ml-0 sm:ml-12 order-1 md:order-2 sm:order-1 w-full md:w-1/6 sm:w-1/6 mb-6'>

                    <Link className="border-none text-xl mt-8" href="/writing">
                        <i className="border-none">← Writing</i>
                    </Link>

                    <p className='uppercase mt-6 nav-spacing text-xs'>
                        Published on
                    </p>

                    <div className='inter text-sm md:text-base sm:text-base uppercase nav-spacing'
                    >{moment(time).format('MMMM DD, YYYY')}
                    </div>

                    <p className='uppercase mt-6 nav-spacing text-xs'>
                        description
                    </p>
                    <div className="inter text-sm md:text-base sm:text-base uppercase">
                        {frontMatter.description}
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
                <div className='order-2 md:order-1 sm:order-2 w-full md:w-2/3 sm:w-2/3 mb-6'>
                    <div className="mt-10 text-base md:text-lg sm:text-lg">
					<img src={frontMatter.img} />
                        <MathJaxProvider>
                            <MDXRemote
                                {...mdxSource}
                                components={{
                                    ...components,
                                }}
                            />
                        </MathJaxProvider>
                    </div>
                </div>

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
    );
}

export default Writing

export async function getStaticPaths() {
    const posts = await getFiles('blog');

    return {
        paths: posts.map((p) => ({
            params: {
                slug: p.replace(/\.mdx/, '')
            }
        })),
        fallback: false
    };
}

export async function getStaticProps({ params }) {
    const post = await getFileBySlug('blog', params.slug);

    return { props: { ...post } };
}