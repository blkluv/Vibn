import { MDXRemote } from "next-mdx-remote";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import BetaLayout from "../../components/BetaLayout";
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
  BlurImage: dynamic(() => import("@/components/Image")),
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
    <BetaLayout title={`${frontMatter.title}`}>

      <h1 className="font-medium text-2xl md:text-3xl sm:text-3xl">
        {frontMatter.title}
      </h1>

      <p className="flex flex-row justify-between no-underline font-normal text-base opacity-75 mt-2">
        <div className="flex flex-col md:flex-row sm:flex-row">
          <span>
            {moment(frontMatter.date).format("最初发表于YY/MM/DD")}
          </span>
        </div>
        <div className="flex flex-row text-right">
          <span>共{wordCount}字</span>
          <span className="ml-0.5 mr-0.5"> · </span>
          <span>约需{moment(readingTime).format("m")}分钟阅读</span>
        </div>
      </p>

      <main className="mt-8 font-normal prose prose-lg prose-neutral dark:prose-invert">
        <MDXRemote {...source} components={components} />
      </main>

      <footer className="mt-12 mb-12">
        <div className="flex flex-col space-y-4 md:space-y-0 sm:space-y-0 md:flex-row sm:flex-row justify-between">
          <div>
            {prevPost && (
              <div className="cursor-pointer bg-neutral-100 dark:bg-neutral-900 border-[1.5px] dark:border-neutral-800 rounded-xl px-6 py-2.5">
                <Link
                  className="no-underline flex flex-col "
                  href={`/posts/${prevPost.slug}`}
                >
                  <span className="px-1.5 text-base opacity-75 font-normal">上一篇</span>
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
                    <span className="text-lg font-medium">{prevPost.title}</span>
                  </span>
                </Link>
              </div>
            )}
          </div>
          <div>
            {nextPost && (
              <div className="cursor-pointer flex justify-end bg-neutral-100 dark:bg-neutral-900 border-[1.5px] dark:border-neutral-800 rounded-xl px-6 py-2.5">
                <Link
                  className="no-underline flex flex-col"
                  href={`/posts/${nextPost.slug}`}
                >
                  <span className="px-1.5 text-base opacity-75 font-normal">下一篇</span>
                  <span className="flex flex-row mt-1">
                    <span className="text-lg font-medium"> {nextPost.title} </span>
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
    </BetaLayout>
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
