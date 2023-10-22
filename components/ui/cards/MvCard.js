import { useRouter } from "next/router";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function MvCard({ picUrl, name, id, index, ar }) {
  const router = useRouter();
  return (
    <div
      key={index}
      onClick={() => router.push(`/mv?id=${id}`)}
      className="relative cursor-pointer"
    >
      <div className="bg-neutral-200 dark:bg-neutral-800 rounded-xl w-40 h-24">
        <LazyLoadImage
          effect="opacity"
          src={`${picUrl}?param=320y192`}
          className="bg-neutral-200 dark:bg-neutral-800 rounded-xl w-40 h-24"
        />
      </div>

      <div className="text-sm mt-2 w-40">
        <h1 className="font-medium rounded-md px-2.5 py-1 bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
          <span className="line-clamp-1">{name}</span> 
          <p className="opacity-75 line-clamp-1">{ar}</p>
        </h1>
      </div>
      <br />
    </div>
  );
}
