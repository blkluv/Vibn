import Layout from "../components/Layout";

import { getPosts } from "../utils/mdxUtils";
import moment from "moment/moment";
import Link from "next/link";

export default function getPost({ posts }) {
  return (
    <Layout title="Blog · Geng Yue " subtitle="Blog">
      <h1 className="font-medium text-3xl md:text-5xl sm:text-7xl mt-24 mb-24">
        Blog about everything
        <br />
        <span className="bg-black dark:bg-white text-white dark:text-black">
          except sexual
        </span>
      </h1>

      <div className="mt-16 border-t border-black dark:border-white">
        {posts.map((post) => (
          <div key={post.filePath} className="mb-0">
            <Link
              as={`/posts/${post.filePath.replace(/\.mdx?$/, "")}`}
              href={`/posts/[slug]`}
            >
              <button className="flex flex-col py-6 w-full border-b border-black dark:border-white">
                <h1 className="font-medium text-2xl md:text-4xl sm:text-6xl">
                  {post.data.title}
                </h1>

                <p className="mt-2 md:mt-4 sm:mt-6 font-normal text-base md:text-lg sm:text-xl opacity-80">
                  {moment(post.data.date).format('dddd MMMM DD , YYYY')} ({moment(post.data.date).fromNow()})
                </p>
              </button>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export function getStaticProps() {
  const posts = getPosts();

  return { props: { posts } };
}
