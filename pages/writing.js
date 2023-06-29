import Layout from "../components/Layout";

import { getPosts } from "../utils/mdxUtils";
import moment from "moment/moment";
import Link from "next/link";

export default function getPost({ posts }) {
  return (
    <Layout title="Geng Yue · Writing">

      <h2>writing</h2>

      {posts.map((post) => (
        <div
          key={post.filePath}
         >
          <Link
            as={`/posts/${post.filePath.replace(/\.mdx?$/, "")}`}
            href={`/posts/[slug]`}
          >
            <button className="flex flex-col space-y-0.5">
                <h5 className="no-underline">{post.data.title}</h5>
                <time>{post.data.date}</time>
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
