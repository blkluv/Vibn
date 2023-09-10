import Head from "next/head";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { motion } from "framer-motion";
import { InView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import moment from "moment";

export default function Home({ posts }) {
  const [selectedPost, setSelectedPost] = useState(posts[0]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedPost]);

  return (
    <div className="max-w-xl mx-auto px-6 py-40">
      <Head>
        {selectedPost && <title>{selectedPost.data.title} · Geng Yue</title>}
      </Head>

      {selectedPost && (
        <InView>
          {({ inView, ref }) => (
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-black rounded-sm w-8 h-1 mb-12"></div>
              <div>
                <h1 className="mb-6">{selectedPost.data.title}</h1>
                <b className="text-neutral-700">
                  {selectedPost.data.shortdesc}
                </b>

                <article className="mt-24 article">
                  <MDXRemote {...selectedPost.content} />
                </article>
              </div>
            </motion.div>
          )}
        </InView>
      )}

      <div className="mt-24 rounded-xl bg-neutral-200 px-6 py-4">
        <h1 className="font-semibold mb-1 text-neutral-500">About Me</h1>
        <b className="text-neutral-700">
          I'm currently a senior grade 2 student of Yantai No.1 Middle School of
          Shandong. Interested in web design. Creator of{" "}
          <a className="underline" href="https://music.gengyue.eu.org/">
            DM Music
          </a>
          .
        </b>

        <h1 className="font-semibold mt-6 mb-1 text-neutral-500">Archived</h1>
        {posts.map((post) => (
          <div className="mb-1">
            <b
              className={`mb-1 flex justify-between ${
                post === selectedPost
                  ? "text-neutral-800 cursor-not-allowed font-bold"
                  : "text-neutral-700 hover:text-neutral-800 cursor-pointer"
              }`}
              key={post.slug}
              onClick={() => setSelectedPost(post)}
            >
              <span className="w-[60%]">{post.data.title}</span>
              <span className="text-neutral-500 text-lg font-medium align-middle">
                {moment(post.data.date).format("MMM DD,YYYY")}
              </span>
            </b>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync("blog");
  const posts = await Promise.all(
    files.map(async (filename) => {
      const filePath = path.join("blog", filename);
      const fileContents = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContents);

      return {
        slug: filename.replace(".mdx", ""),
        data,
        content: await serialize(content),
      };
    })
  );

  posts.sort((a, b) => new Date(b.data.date) - new Date(a.data.date));

  return {
    props: {
      posts,
    },
  };
}
