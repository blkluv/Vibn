import { useRouter } from "next/router";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function ArCard({ picUrl, name, id, index }) {
  const router = useRouter();
  return (
    <div
      key={index}
      onClick={() => router.push(`/artist?id=${id}`)}
      className="relative cursor-pointer"
    >
      <div className="w-40 h-40 bg-neutral-200 dark:bg-neutral-800 rounded-xl">
        <LazyLoadImage
          effect="opacity"
          src={`${picUrl}?param=160y160`}
          className="bg-neutral-200 dark:bg-neutral-800 rounded-xl w-40 h-40"
        />
      </div>

      <div className="text-sm mt-2 w-40">
        <h1 className="text-center font-medium rounded-md px-2.5 py-1 bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
          <span className="line-clamp-1">{name}</span>
        </h1>
      </div>
      <br />
    </div>
  );
}
