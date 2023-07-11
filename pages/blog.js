import Layout from "../components/Layout";

import { getPosts } from "../utils/mdxUtils";
import moment from "moment/moment";
import Link from "next/link";

export default function getPost({ posts }) {
  return (
    <Layout title="Blog · Geng Yue ">
      <h1 className="font-medium text-3xl md:text-5xl sm:text-7xl mt-24 md:mt-36 sm:mt-48 mb-24">
        Blog about everything
        <br />
        <span className="bg-black dark:bg-white text-white dark:text-black">
          except sexual
        </span>
      </h1>

      <div className="mt-16 border-t border-black dark:border-white columns-1 md:columns-2 sm:columns-2">
        {posts.map((post) => (
          <div key={post.filePath} className="mb-0">
            <Link
              as={`/posts/${post.filePath.replace(/\.mdx?$/, "")}`}
              href={`/posts/[slug]`}
            >
              <button className="flex flex-col py-6 w-full border-b border-black dark:border-white">
                <h1 className="font-medium text-lg md:text-2xl sm:text-4xl">
                  {post.data.title}
                </h1>

                <p className="mt-2 font-normal text-base md:text-lg sm:text-xl opacity-80">
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
