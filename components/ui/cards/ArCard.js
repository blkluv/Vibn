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
      <div className="w-40 md:w-40 sm:w-48 rounded-xl">
        <LazyLoadImage
          effect="opacity"
          src={`${picUrl}?param=192y192`}
          className="bg-neutral-200 dark:bg-neutral-800 rounded-xl w-40 md:w-40 sm:w-48 h-40 md:h-40 sm:h-48"
        />
      </div>

      <div className="mt-2 w-40 md:w-40 sm:w-48">
        <h1 className="font-medium text-center rounded-md p-1 text-lg">
          <span className="line-clamp-1">{name}</span>
        </h1>
      </div>
      <br />
    </div>
  );
}
