import Head from "next/head";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import moment from "moment";
import Container from "@/components/layout/Container";

export default function Home({ posts }) {
  return (
    <Container posts={posts}>
      <p>
        I'm currently a senior grade 2 student of{" "}
        <a href="http://www.ytyz.net/">Yantai No.1 Middle School of Shandong</a>
        . My best days are full of design, craft and code. I love listening to
        music.{" "}
        <a href="https://music.gengyue.eu.org/playlist?id=3048186533">
          Classic songs
        </a>{" "}
        are my best.
      </p>

      <p>
        I've crafted and mantained{" "}
        <a href="https://music.gengyue.eu.org/">DM Music</a>
        in my spare time. More thing named DM is planned.
      </p>
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
