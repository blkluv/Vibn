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
            title="Geng Yue"
        >

            <h1 className='font-medium'>Geng Yue</h1>

            <p>
                <i>Lying down</i>
            I'm a senior grade 1 student of <a href="http://www.ytyz.net/">Yantai No.1 Middle School of Shandong</a>.
                Most folks knew me as "The world's dullest person".
                I love talking, amusing and lying down.  </p>

            <p>
                Recently I've established <a href="https://ikermusic.netlify.app">IKER Music</a>, building IKER Translate.
            </p>

            <h1 className='font-medium'>Published</h1>

            <p>
                <Link href="/writing">Writing sometimes</Link>, I'm really love talking and expressing. But I'm a slow writer,
                I seldom write things and most of my articles are really rublish. But <i><Link href="/writing">A collection of my work</Link></i>
                is still saved <Link href="/writing">to be read</Link>.
            </p>

            <p>
                <Link href="/writing">See all my writings →</Link> If you've got really interest. Meanwhile, all the IKER-ORG articles will be
                displayed here. You can <i>feel free to access them</i>.
            </p>

            <h1 className='font-medium'>Established</h1>

            <p>IKER-ORG, which full name is <i>"The world's best & biggest iker organization"</i> was established on
                April 2023. Aiming to provide a comfortable & stable view for ikers, we are trying hard on solving
                technique problems and posting perfect contents.
            </p>

            <p>
                Our mission is to let all the ikers satisfied with our service. And most of them can fetch the posts or
                what they are interested in. All the things are bound to be <i>open-sourced</i>. You can easily <i>access all the
                things</i> on GitHub in the future.
            </p>

            <h1>Now</h1>

            <p>Investigating how to decide before doing things. Mostly interested in how to understand and calculate correctly. With difficulties ahead, how to skip it definitely. How to improve myself and be a better man.</p>

            <p>Enjoy watching cartoon shows, playing with toy donkey and pillow. </p>

            <p>Still <i>coding and designing websites</i>, looking up to GitHub for interesting codes. Living in Yantai City, Shandong to complete my senior high shoolwork. Investigating a way to deal with terrify teachers and how to play while studying.</p>

            <p>
                <span className='serif mr-1'>War is Peace, Freedom is Slavery, Ignorance is Strength.</span>
                <span>Under the spreading chestnut tress, I sold you and you sold me. There lie they, and here lie we. Under the spreading chestnut tree.</span>
            </p>

            <h1>Connect</h1>

            <p>If you are in Yantai City, let's talk a little. <a href="mailto:Cloudflare233@yandex.com">Cloudflare233@yandex.com</a>.</p>









        </Layout >
    )
}


export default Home

export async function getStaticProps() {
    const posts = await getAllFilesFrontMatter('blog');

    return { props: { posts } };
}
