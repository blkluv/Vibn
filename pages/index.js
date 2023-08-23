import { useTheme } from "next-themes";
import Head from "next/head";
import { useRouter } from "next/router";
import Lazyload from "react-lazy-load";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";

export default function Home({ posts }) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  return (
    <div className="max-w-2xl px-6 md:px-12 sm:px-20 py-32 border-l border-neutral-200 dark:border-neutral-800 ml-2.5 md:mx-auto sm:mx-auto min-h-screen">
      <Head>
        <title>GENG YUE - STUDENT, SELF-TAUGHT DEVELOPER</title>
      </Head>

      <h1>GENG YUE</h1>
      <p className="opacity-75 mt-1">STUDENT, SELF-TAUGHT DEVELOPER</p>

      <p className="mt-16 text-red-600 border border-red-600 selection:bg-red-600 dark:selection:bg-red-600 selection:text-white">
        I'm currently preparing for the National College Entrance Exam in 2025.
        To focus on my study, I'll limit my online time. And I maybe slow to
        respond.
      </p>

      {posts.map((post) => (
        <div key={post.slug} className="mt-16">
          <h1 className="uppercase">{post.data.title}</h1>
          <p className="opacity-75 mt-1 uppercase">{post.data.subtitle}</p>
          <article className="mt-12 article">
            <MDXRemote {...post.content} />
          </article>
        </div>
      ))}

      <button className="uppercase mt-12" onClick={() => router.push("/archive")}>
        Open the archive
      </button>

      <div className="mt-32">
        <h1>GENG YUE</h1>
        <p className="opacity-75 mt-1">STUDENT, SELF-TAUGHT DEVELOPER</p>
      </div>

      <div className="mt-16">
        <p>
          I'm now a senior grade 2 student of {""}
          <a href="http://www.ytyz.net/">
            Yantai No.1 Middle School of Shandong
          </a>{" "}
          and is also a self-taught developer. I'm not a good student, not a
          good developer, not writing good codes, not a good minimalist. BUT I
          always have dream. I want to build something, for there is something
          which I haven't gained. Like the saying "Because it is there!"
        </p>
      </div>

      <Lazyload offset={25}>
        <img
          src="/static/photo-1633685774305-eda735260df2.avif"
          className="mt-16"
        />
      </Lazyload>

      <div className="mt-32">
        <h1>GENG YUE</h1>
        <p className="opacity-75 mt-1">STUDENT, SELF-TAUGHT DEVELOPER</p>

        <div className="mt-12 flex flex-col space-y-6">
          <div>
            <p className="mb-1 text-xs opacity-75">Location</p>
            <span>Yantai City, PRC.</span>
          </div>

          <div>
            <p className="mb-1 text-xs opacity-75">QQ Number</p>
            <span>3041299667</span>
          </div>

          <div>
            <p className="mb-1 text-xs opacity-75">GitHub</p>
            <a href="https://github.com/Cloudflare233">@Cloudflare233</a>
          </div>

          <div>
            <p className="mb-1 text-xs opacity-75">E-mail</p>
            <a href="mailto:Cloudflare233@yandex.com">
              Cloudflare233@yandex.com
            </a>
          </div>
        </div>
        <div className="mt-32"></div>
        <p className="text-xs mb-1">
          <span className="opacity-75 mr-1">
            The default theme doesn't suit you?
          </span>
          <span
            className="cursor-pointer"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            Change Theme
          </span>
        </p>

        <p className="mb-1 text-xs opacity-75">
          Site last released Aug 22, 2023. © 2023 Geng Yue.
        </p>
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
