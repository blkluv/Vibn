import Head from "next/head";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import moment from "moment";
import Container from "@/components/layout/Container";
import BlogPost from "@/components/ui/BlogPost";
import Huge from "@/components/ui/headings/Huge";

export default function Thoughts({ posts }) {
  return (
    <Container posts={posts} title="Thoughts">
      <Huge>Thoughts</Huge>
      <br />
      {posts.map((post, index) => {
        return (
          <BlogPost
            title={post.data.title}
            slug={post.slug}
            date={post.data.date}
            index={index}
            content={post.content}
            length={posts.length}
          />
        );
      })}
    </Container>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync("thoughts");
  const posts = await Promise.all(
    files.map(async (filename) => {
      const filePath = path.join("thoughts", filename);
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
