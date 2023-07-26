import BetaLayout from "@/components/BetaLayout";
import { getPosts } from "../utils/mdxUtils";
import moment from "moment/moment";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Blog({ posts }) {
  const [searchValue, setSearchValue] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const filteredBlogPosts = posts
    .sort(
      (a, b) =>
        Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
    )
    .filter((post) =>
      post.data.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  return (
    <BetaLayout title="想法">
      <h1 className="text-2xl md:text-3xl sm:text-3xl leading-normal mb-8">
        偶尔<span className="opacity-75">写点什么</span>或
        <span className="opacity-75">发点牢骚</span>。
      </h1>

      <AnimatePresence>
        {filteredBlogPosts.map((post, index) => {
          const [isHover, setIsHover] = useState(false);

          useEffect(() => {
            setIsVisible(true);
          }, []);
          return (
            <motion.div
              key={post.filePath}
              className=""
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: isVisible ? 0 : -10, opacity: isVisible ? 1 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: index * 0.5, duration: 1.5 }}
            >
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
                            width="36"
                            height="36"
                            className="ml-2 main-grid-item-icon opacity-75 my-auto hidden md:block sm:block"
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

                  <p className="no-underline font-normal my-auto text-base md:text-lg sm:text-lg opacity-75">
                    需约
                    <span className="font-normal opacity-100">
                      {moment(post.data.readingTime).format("m")}
                    </span>
                    分钟
                  </p>
                </motion.button>
              </Link>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </BetaLayout>
  );
}

export function getStaticProps() {
  const posts = getPosts();

  return { props: { posts } };
}
