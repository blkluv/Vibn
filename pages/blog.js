import BetaLayout from "@/components/BetaLayout";
import { getPosts } from "../utils/mdxUtils";
import moment from "moment/moment";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Blog({ posts }) {
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
    <BetaLayout title="博客">
      <h1 className="text-2xl md:text-3xl sm:text-3xl leading-normal mb-8">
        偶尔<span className="opacity-75">写点什么</span>或
        <span className="opacity-75">发点牢骚</span>。
      </h1>

      {filteredBlogPosts.map((post, index) => {
        const [isHover, setIsHover] = useState(false);
        return (
          <motion.div key={post.filePath} className="">
            <Link
              as={`/posts/${post.filePath.replace(/\.mdx?$/, "")}`}
              href={`/posts/[slug]`}
              className="no-underline"
            >
              <motion.button
                animate={{ opacity: isHover === true ? 0.75 : 1 }}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                className="flex flex-row w-full justify-between py-2.5"
              >
                  <div>
                    <h1 className="font-medium text-2xl md:text-3xl sm:text-3xl flex flex-row">
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
                  </div>

                  <p className="no-underline font-medium my-auto text-base md:text-lg sm:text-lg opacity-75">
                    {moment(post.data.date).format("YY/MM/DD")}
                  </p>
              </motion.button>
            </Link>
          </motion.div>
        );
      })}
    </BetaLayout>
  );
}

export function getStaticProps() {
  const posts = getPosts();

  return { props: { posts } };
}
