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
}) {
  return (
    <Layout title={`${frontMatter.title}`} desc={frontMatter.title}>
      <Link
        href="/"
        className="text-sm mb-8 opacity-75 flex flex-row space-x-0.5 rounded-xl w-auto px-2 md:px-2 sm:px-0 py-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="16"
          height="16"
          class="main-grid-item-icon"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
        <span className="-mt-0.5">返回"所有文章"</span>
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
          <span>大约需要{moment(readingTime).format('m')}分钟阅读</span>
        </div>
      </p>

      <main className="mt-8 px-4 md:px-4 sm:px-0 font-normal prose dark:prose-invert">
        <MDXRemote {...source} components={components} />
      </main>

      <footer className="mt-12 px-4 md:px-4 sm:px-0">
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
  const { mdxSource, data, postFilePath } = await getPostBySlug(params.slug); // 使用修改后的 getPostBySlug 函数获取 mdxSource、data 和 postFilePath
  const wordCount = data.wordCount; // 获取文字数
  const readingTime = data.readTime; // 获取阅读时间

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
      wordCount,
      readingTime,
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
