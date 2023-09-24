import Head from "next/head";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import moment from "moment";
import Container from "@/components/layout/Container";
import BlogPost from "@/components/ui/BlogPost";

export default function Blog({ posts }) {
  return (
    <Container posts={posts} title="Blog">
      {posts.map((post, index) => {
        return (
          <BlogPost
            title={post.data.title}
            slug={post.slug}
            date={post.data.date}
            index={index}
            length={posts.length}
          />
        );
      })}
    </Container>
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
