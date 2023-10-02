import moment from "moment";
import { useRouter } from "next/router";
import Small from "./headings/Small";
import Medium from "./headings/Medium";
import { MDXRemote } from "next-mdx-remote";

export default function BlogPost({
  title,
  slug,
  length,
  date,
  content,
  shortdesc,
  index,
}) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/thoughts/${slug}`)}
      className="cursor-pointer mb-8 w-full md:w-full sm:w-3/4 rounded-xl border border-neutral-200 dark:border-neutral-800"
    >
      <div className="">
        <div className="px-6 flex flex-row space-x-4 border-b border-neutral-200 dark:border-neutral-800 py-6">
          <img src="/favicon.ico" className="w-12 h-12 border border-neutral-200 dark:border-neutral-800 rounded-full" />
          <div className="flex flex-col space-y-0">
            <h1 className="-mt-1 font-semibold">Geng Yue</h1>
            <Small>@Cloudflare233</Small>
          </div>
        </div>
        <p className="line-clamp-[8] px-12 py-8 my-4 prose prose-lg md:prose-xl sm:prose-xl dark:prose-invert leading-relaxed relative">
          <p className="opacity-75 mb-8">{shortdesc}</p>
          <MDXRemote {...content} />
          <div className="bg-gradient-to-t from-white to-white/0 dark:from-black dark:to-black/0 py-10 bottom-0 absolute w-full" />
        </p>
        <div className="border-t border-neutral-200 dark:border-neutral-800 px-6 py-4">
          <span className="opacity-75 text-base">
            Posted on {moment(date).format("MMM DD, YYYY")}
          </span>
        </div>
      </div>
    </div>
  );
}
