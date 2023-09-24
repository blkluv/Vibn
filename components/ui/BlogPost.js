import moment from "moment";
import { useRouter } from "next/router";

export default function BlogPost({ title, slug, length, date, index }) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(`/blog/${slug}`)}
      className="bg-white dark:bg-black hover:opacity-75 py-2 flex flex-row space-x-4 w-full"
    >
      <div className="opacity-75 text-sm mt-1.5">{length - index}</div>
      <div className="flex flex-row justify-between w-full">
        <h1 className="w-2/3 md:w-5/6 sm:w-5/6 truncate text-left">{title}</h1>
        <div>
          <span className="opacity-75 mr-2 mt-1.5 text-sm">
            {moment(date).format("MMM DD, YYYY")}
          </span>
        </div>
      </div>
    </button>
  );
}
