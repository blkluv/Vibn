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
            <div className="">

                <Link href="/" className='inter opacity-75 text-sm mb-8'>← Back to home</Link>


                <h1 className='mt-8 mb-6'>
                    {frontMatter.title}
                </h1>

                <time className='text-sm mt-6 mb-8 opacity-75 flex flex-row space-x-1'>
                    <span><Date dateString={time} /></span>
                    <span>·</span>
                    <span>{moment(parseInt(time), "YYYYMMDD").fromNow()}</span>
                    <span>·</span>
                    <span>{frontMatter.readingTime.text}</span>
                </time>

                <div className="mt-16 prose dark:prose-invert">
                    <blockquote>
                        {frontMatter.description}
                    </blockquote>
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
        </Layout>
    );
}

Writing.theme = 'light'

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