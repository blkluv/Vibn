import Layout from "@/components/Layout";
import { getPosts } from "../utils/mdxUtils";
import moment from "moment/moment";
import Link from "next/link";
import { useState } from "react";

export default function Home({ posts }) {
  const [searchValue, setSearchValue] = useState("");
  const filteredBlogPosts = posts
    .sort(
      (a, b) =>
        Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
    )
    .filter((post) =>
      post.data.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  return (
    <Layout title="所有文章">
      <h1 className="font-semibold text-3xl mb-8">{">"} 所有文章</h1>

      {filteredBlogPosts.map((post) => {
        const [isHover, setIsHover] = useState(false);
        return (
          <div key={post.filePath} className="">
            <Link
              as={`/posts/${post.filePath.replace(/\.mdx?$/, "")}`}
              href={`/posts/[slug]`}
            >
              <button
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                className="flex flex-row justify-between w-full hover:bg-zinc-100 dark:hover:bg-zinc-950 rounded-xl px-4 md:px-6 sm:px-6 py-4"
              >
                <div className="w-full text-left flex flex-col">
                  <h1 className="font-medium text-lg md:text-xl sm:text-xl flex flex-row">
                    {post.data.title}{" "}
                    {isHover === true && (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          className="ml-2 main-grid-item-icon opacity-75"
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </>
                    )}
                  </h1>

                  <p className="no-underline font-normal text-sm opacity-75">
                    {moment(post.data.date).format("最初发表于YYYY年MM月DD日")}
                  </p>
                </div>
                <div className="w-1/4 flex flex-row justify-end align-middle mt-2.5"></div>
              </button>
            </Link>
          </div>
        );
      })}
    </Layout>
  );
}

export function getStaticProps() {
  const posts = getPosts();

  return { props: { posts } };
}
