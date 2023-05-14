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

            <Link href="/writing">
                <p className="flex flex-row">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-arrow-left-to-line opacity-80 mt-0.5 mr-1 w-5 h-5"><line x1="7" x2="21" y1="12" y2="12"></line><polyline points="13 6 7 12 13 18"></polyline><path d="M3 19V5"></path></svg>
                    <i>Writing</i>
                </p>
            </Link>

            <h1 className='no-spacing'>{frontMatter.title}</h1>

            <p className='no-spacing opacity-50 text-zinc-500'>{moment(time).format('MMMM DD, YYYY')}</p>



                <div className="mt-10">
                    <MathJaxProvider>
                        <MDXRemote
                            {...mdxSource}
                            components={{
                                ...components,
                            }}
                        />
                    </MathJaxProvider>
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