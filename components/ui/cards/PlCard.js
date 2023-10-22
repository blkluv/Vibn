import { LazyLoadImage } from "react-lazy-load-image-component";
import { useRouter } from "next/router";

export default function PlCard({
  picUrl,
  id,
  name,
  index,
  signature,
  playCount,
}) {
  const router = useRouter();
  return (
    <div
      key={index}
      className="relative cursor-pointer"
      onClick={() => router.push(`/playlist?id=${id}`)}
    >
      <div className="w-40 h-40 rounded-xl bg-neutral-200 dark:bg-neutral-800">
        <LazyLoadImage
          effect="opacity"
          src={`${picUrl}?param=160y160`}
          className="bg-neutral-200 dark:bg-neutral-800 w-40 h-40 rounded-xl "
        />
      </div>

      <div className="text-sm mt-2 w-40">
        <h1 className="font-medium rounded-md px-2.5 py-1 bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
          <span className="line-clamp-1">{name}</span>
        </h1>
      </div>
      <br />
    </div>
  );
}
