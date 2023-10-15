import { LazyLoadImage } from "react-lazy-load-image-component";
import { useRouter } from "next/router";

export default function AlCard({ picUrl, name, id, index, ar }) {
  const router = useRouter();
  return (
    <div
      key={index}
      onClick={() => router.push(`/album?id=${id}`)}
      className="cursor-pointer relative"
    >
      <div className="w-72 md:w-80 sm:w-80 h-72 md:h-80 sm:h-80 bg-neutral-200 dark:bg-neutral-800 rounded-xl">
        <LazyLoadImage
          effect="opacity"
          src={`${picUrl}?param=320y320`}
          className="bg-neutral-200 w-72 md:w-80 sm:w-80 h-72 md:h-80 sm:h-80 dark:bg-neutral-800 rounded-xl "
        />
      </div>

      <div className="absolute bottom-6 w-full left-0 backdrop-blur-2xl bg-white/50 dark:bg-black/50 rounded-b-xl py-2.5 px-6 truncate text-left mt-1">
        <h1 className="text-lg md:text-lg sm:text-xl font-medium line-clamp-1">{name}</h1>
        <p className="text-base md:text-base sm:text-lg  opacity-75 line-clamp-1">{ar}</p>
      </div>
      <br />
    </div>
  );
}
