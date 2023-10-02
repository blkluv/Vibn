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
      className="cursor-pointer mb-8 w-full md:w-full sm:w-3/4 border-t py-8  border-neutral-200 dark:border-neutral-800"
    >
      <div className="flex flex-row space-x-6">
        <div className="w-16">
          <img
            src="/favicon.ico"
            className="w-16 h-16 border border-neutral-200 dark:border-neutral-800 rounded-full"
          />
          <p className="w-16" />
        </div>
        <div>
          <div className="flex flex-row space-x-6">
            <h1 className="font-semibold">Geng Yue</h1>
            <div className="-mt-5 flex flex-row space-x-6">
              <Small>{moment(date).format("MMM DD, YYYY")}</Small>
            </div>
          </div>
          <p className="line-clamp-[12] sm:line-clamp-[9] hover:line-clamp-[13] sm:hover:line-clamp-[10] transition-all duration-500 prose prose-lg md:prose-xl sm:prose-xl dark:prose-invert leading-relaxed relative">
            <p className="opacity-75 -mb-8">{shortdesc}</p>
            <div className="-mt-12">
              <MDXRemote {...content} />
            </div>

            <div className="bg-gradient-to-t from-white to-white/0 dark:from-black dark:to-black/0 py-10 bottom-0 absolute w-full" />
          </p>
        </div>
      </div>
    </div>
  );
}
