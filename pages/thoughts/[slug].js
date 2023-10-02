import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import Container from "@/components/layout/Container";
import moment from "moment";
import Huge from "@/components/ui/headings/Huge";
import Medium from "@/components/ui/headings/Medium";

export default function BlogPost({ mdxSource, frontMatter, posts }) {
  return (
    <Container posts={posts} title={frontMatter.title}>
      <Huge>{frontMatter.title}</Huge>

      <p className="mt-6 font-medium opacity-75">
        {frontMatter.shortdesc}
      </p>
      <div className="mt-8 prose prose-lg md:prose-xl sm:prose-xl dark:prose-invert leading-relaxed">
        <MDXRemote {...mdxSource} />
      </div>
    </Container>
  );
}

export const getStaticPaths = async () => {
  const postsDirectory = path.join(process.cwd(), "thoughts");
  const filenames = fs.readdirSync(postsDirectory);

  const paths = filenames.map((filename) => ({
    params: {
      slug: filename.replace(".mdx", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const postsDirectory = path.join(process.cwd(), "thoughts");
  const filePath = path.join(postsDirectory, `${params.slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);
  const mdxSource = await serialize(content);
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
    props: { posts, mdxSource, frontMatter: data },
  };
};
