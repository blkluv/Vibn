import Layout from "../components/Layout";

import { getPosts } from "../utils/mdxUtils";
import moment from "moment/moment";
import Link from "next/link";

export default function getPost({ posts }) {
  return (
    <Layout title="Geng Yue · Writing">
      <h2>writing</h2>

      {posts.map((post) => (
        <div key={post.filePath} className="mb-0">
          <Link
            as={`/posts/${post.filePath.replace(/\.mdx?$/, "")}`}
            href={`/posts/[slug]`}
            className="no-underline"
          >
            <button className="flex flex-col rounded-md transition-all duration-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:px-4 py-2">
              <h5 className="">{post.data.title}</h5>
              <time className="-mt-1 opacity-75">
                {moment(post.data.date).format("MMMM DD, YYYY")} ({moment(post.data.date).fromNow('')})
              </time>
            </button>
          </Link>
        </div>
      ))}
    </Layout>
  );
}

export function getStaticProps() {
  const posts = getPosts();

  return { props: { posts } };
}
