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
    <Layout
      title={`${frontMatter.title} · Blog · Geng Yue`}
      desc={frontMatter.title}
    >
      <h1 className="hidden md:block sm:block font-medium ml-0 md:ml-0 sm:ml-64">
        {frontMatter.title}
      </h1>

      <time className="text-sm opacity-75 ml-0 md:ml-0 sm:ml-64">
        {moment(frontMatter.date).format("MMMM DD, YYYY")} (
        {moment(frontMatter.date).fromNow("")})
      </time>

      <main className="mt-16 font-normal prose dark:prose-invert">
        <MDXRemote {...source} components={components} />
      </main>
      <hr />
      <footer className="mt-6 max-w-2xl ml-0 md:ml-0 sm:ml-64">
        <div className="flex flex-row justify-between">
          <div>
            {prevPost && (
              <div className="cursor-pointer rounded-md transition-all duration-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:px-4 py-2 opacity-75">
                <Link
                  className="no-underline flex flex-col "
                  href={`/posts/${prevPost.slug}`}
                >
                  <span className="px-1.5 text-sm opacity-75">Previous</span>
                  <span className="">← {prevPost.title}</span>
                </Link>
              </div>
            )}
          </div>
          <div>
            {nextPost && (
              <div className="cursor-pointer rounded-md transition-all duration-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:px-4 py-2 opacity-75">
                <Link
                  className="no-underline flex flex-col "
                  href={`/posts/${nextPost.slug}`}
                >
                  <span className="px-1.5 text-sm opacity-75">Next</span>
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
