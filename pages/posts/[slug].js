import { MDXRemote } from "next-mdx-remote";
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

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

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
  wordCount,
  readingTime,
  frontMatter,
  prevPost,
  nextPost,
  tableOfContents,
}) {
  return (
    <Layout title={`${frontMatter.title}`} navtitle={frontMatter.title}>
      <Link
        href="/"
        className="text-sm mb-8 opacity-75 flex flex-row space-x-0.5 rounded-xl w-auto px-4 md:px-4 sm:px-0 py-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 mt-0.5 mr-1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
          />
        </svg>
        <span className="">返回"所有文章"</span>
      </Link>

      <h1 className="px-4 md:px-4 sm:px-0 mt-8 font-semibold text-3xl">
        {">"} {frontMatter.title}
      </h1>

      <p className="flex flex-row justify-between no-underline font-normal text-sm opacity-75 px-4 md:px-4 sm:px-0 mt-2">
        <div className="flex flex-col md:flex-row sm:flex-row">
          <span>
            {moment(frontMatter.date).format("最初发表于YYYY年MM月DD日")}
          </span>
          <span className="hidden md:block sm:block ml-0.5 mr-0.5"> · </span>
          <span className="opacity-75">
            {moment(frontMatter.update).format("更新于YYYY年MM月DD日")}
          </span>
        </div>
        <div className="flex flex-col md:flex-row sm:flex-row text-right">
          <span>总计{wordCount}字</span>
          <span className="hidden md:block sm:block ml-0.5 mr-0.5"> · </span>
          <span>大约需要{moment(readingTime).format("m")}分钟阅读</span>
        </div>
      </p>

      <main className="mt-8 px-4 md:px-4 sm:px-0 font-normal prose dark:prose-invert">
        <MDXRemote {...source} components={components} />
      </main>

      <footer className="mt-12 px-4 md:px-4 sm:px-0">
        <div className="flex flex-row justify-between">
          <div>
            {prevPost && (
              <div className="cursor-pointer">
                <Link
                  className="no-underline flex flex-col "
                  href={`/posts/${prevPost.slug}`}
                >
                  <span className="px-1.5 text-sm opacity-75">上一篇</span>
                  <span className="flex flex-row mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 mt-1 mr-1.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                      />
                    </svg>{" "}
                    <span>{prevPost.title}</span>
                  </span>
                </Link>
              </div>
            )}
          </div>
          <div>
            {nextPost && (
              <div className="cursor-pointer flex justify-end">
                <Link
                  className="no-underline flex flex-col"
                  href={`/posts/${nextPost.slug}`}
                >
                  <span className="px-1.5 text-sm opacity-75">下一篇</span>
                  <span className="flex flex-row mt-1">
                    <span> {nextPost.title} </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 ml-1 mt-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3"
                      />
                    </svg>
                  </span>
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
  const { mdxSource, data, postFilePath } = await getPostBySlug(params.slug); // 使用修改后的 getPostBySlug 函数获取 mdxSource、data 和 postFilePath
  const wordCount = data.wordCount; // 获取文字数
  const readingTime = data.readTime; // 获取阅读时间

  const prevPost = getPreviousPostBySlug(params.slug);
  const nextPost = getNextPostBySlug(params.slug);

  const tableOfContents = mdxSource.toc ? mdxSource.toc.items : [];

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      prevPost,
      nextPost,
      wordCount,
      readingTime,
      tableOfContents,
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
