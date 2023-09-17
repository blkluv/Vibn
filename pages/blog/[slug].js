import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import Container from "@/components/layout/Container";
import moment from "moment";

export default function BlogPost({ mdxSource, frontMatter, posts }) {
  return (
    <Container posts={posts}>
      <h1>{frontMatter.title}</h1>
      <p>{moment(frontMatter.date).format('MMM DD, YYYY')}</p>
      <div className="prose leading-normal">
        <MDXRemote {...mdxSource} />
      </div>
    </Container>
  );
}

export const getStaticPaths = async () => {
  const postsDirectory = path.join(process.cwd(), "blog");
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
  const postsDirectory = path.join(process.cwd(), "blog");
  const filePath = path.join(postsDirectory, `${params.slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);
  const mdxSource = await serialize(content);
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
    props: { posts, mdxSource, frontMatter: data },
  };
};
