import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import {
  getNextPostBySlug,
  getPostBySlug,
  getPreviousPostBySlug,
  postFilePaths,
} from "../../utils/mdxUtils";
import moment from "moment";
import rehypePrism from "@mapbox/rehype-prism";
import remarkGfm from "remark-gfm";
import remarkAutolinkHeadings from "remark-autolink-headings";

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  // It also works with dynamically-imported components, which is especially
  // useful for conditionally loading components for certain routes.
  // See the notes in README.md for more details.
  Image: dynamic(() => import("@/components/Image")),
  Head,
};

export default function PostPage({
  source,
  headings,
  frontMatter,
  prevPost,
  nextPost,
}) {
  return (
    <Layout title={`${frontMatter.title}`} desc={frontMatter.title}>
      <Link href="/" className="mb-8 hover:bg-zinc-100 dark:hover:bg-zinc-950 rounded-xl px-2 py-2">
        {'<'} 回到主页
      </Link>

      <h1 className="px-4 md:px-0 sm:px-0 mt-8 font-semibold text-3xl">
        {">"} {frontMatter.title}
      </h1>

      <time className="px-4 md:px-0 sm:px-0 text-sm opacity-75">
        {moment(frontMatter.date).format("最初发表于YYYY年MM月DD日")}
      </time>

      <main className="mt-8 px-4 md:px-0 sm:px-0 font-normal prose dark:prose-invert">
        <MDXRemote {...source} components={components} />
      </main>

      <footer className="mt-12 px-4 md:px-0 sm:px-0">
        <div className="flex flex-col md:flex-row sm:flex-row space-y-4 md:space-y-0 sm:space-y-0 justify-between">
          <div>
            {prevPost && (
              <div className="cursor-pointer">
                <Link
                  className="no-underline flex flex-col "
                  href={`/posts/${prevPost.slug}`}
                >
                  <span className="px-1.5 text-sm opacity-75">上一篇</span>
                  <span className="">← {prevPost.title}</span>
                </Link>
              </div>
            )}
          </div>
          <div>
            {nextPost && (
              <div className="cursor-pointer">
                <Link
                  className="no-underline flex flex-col "
                  href={`/posts/${nextPost.slug}`}
                >
                  <span className="px-1.5 text-sm opacity-75">下一篇</span>
                  <span className="">{nextPost.title} →</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </footer>
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const { mdxSource, data } = await getPostBySlug(params.slug);
  const prevPost = getPreviousPostBySlug(params.slug);
  const nextPost = getNextPostBySlug(params.slug);

  const headings = [];
  if (mdxSource.scope && mdxSource.scope.headings) {
    mdxSource.scope.headings.forEach((heading) => {
      if (heading.depth === 2) {
        headings.push({ title: heading.value, id: heading.slug });
      }
    });
  }

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      headings,
      prevPost,
      nextPost,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ""))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
