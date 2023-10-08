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
          className="bg-neutral-200 w-72 md:w-80 sm:w-80 h-72 md:h-80 sm:h-80 dark:bg-neutral-800 rounded-xl shadow-lg"
        />
      </div>

      <div className="absolute bottom-8 left-4 backdrop-blur-2xl bg-white/50 dark:bg-black/50 rounded-full py-2 px-6 line-clamp-1 truncate text-left text-base md:text-base sm:text-lg mt-1">
        <h1 className="font-medium">{name}</h1>
        <p className="opacity-75 -mt-1">{ar}</p>
      </div>
      <br />
    </div>
  );
}
