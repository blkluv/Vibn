import moment from "moment";
import { useRouter } from "next/router";

export default function BlogPost({ title, slug, length, date, index }) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(`/blog/${slug}`)}
      className="bg-white dark:bg-black rounded-xl hover:bg-neutral-300 dark:hover:bg-neutral-700 hover:text-neutral-700 dark:hover:text-neutral-300 py-2 flex flex-row space-x-4 w-full"
    >
      <div className="px-4 w-8">{length - index}</div>
      <div className="flex flex-row justify-between w-full overflow-x-auto truncate">
        <h1>{title}</h1>
        <div>
          <span className="opacity-75 mr-2">
            {moment(date).format("MMM DD, YYYY")}
          </span>
        </div>
      </div>
    </button>
  );
}
