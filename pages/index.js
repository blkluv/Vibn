import Layout from "@/components/Layout";
import { getPosts } from "../utils/mdxUtils";
import moment from "moment/moment";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

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
      <h1 className="font-semibold text-3xl px-4 md:px-4 sm:px-0 mb-8">
        {">"} 所有文章
      </h1>

      {filteredBlogPosts.map((post, index) => {
        const [isHover, setIsHover] = useState(false);
        return (
          <motion.div key={post.filePath} className="">
            <Link
              as={`/posts/${post.filePath.replace(/\.mdx?$/, "")}`}
              href={`/posts/[slug]`}
            >
              <motion.button
                animate={{ opacity: isHover === true ? 0.75 : 1 }}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                className="flex flex-row justify-between w-full px-4 md:px-4 sm:px-0 py-4"
              >
                <div className="text-left flex flex-col">
                  <h1 className="font-semibold text-xl md:text-xl sm:text-xl flex flex-row">
                    <span className="opacity-75 text-sm mt-1.5 mr-1">{posts.length - index}.</span>
                    {post.data.title}{" "}
                    {isHover === true && (
                      <motion.div initial={{ x: -5 }} animate={{ x: 0 }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          className="ml-2 main-grid-item-icon opacity-75 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </motion.div>
                    )}
                  </h1>

                  <p className="no-underline font-normal flex flex-col md:flex-row sm:flex-row text-sm opacity-75 mt-1">
                    <span>
                      {moment(post.data.date).format(
                        "最初发表于YYYY年MM月DD日"
                      )}
                    </span>
                    <span className="hidden md:block sm:block ml-0.5 mr-0.5">
                      {" "}
                      ·{" "}
                    </span>
                    <span className="opacity-75">
                      {moment(post.data.update).format("更新于YYYY年MM月DD日")}
                    </span>
                  </p>
                </div>
              </motion.button>
            </Link>
          </motion.div>
        );
      })}
    </Layout>
  );
}

export function getStaticProps() {
  const posts = getPosts();

  return { props: { posts } };
}
