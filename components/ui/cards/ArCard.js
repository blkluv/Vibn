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
      <div className="w-64 md:w-72 sm:w-80 h-64 md:h-72 sm:h-80 bg-neutral-200 dark:bg-neutral-800 rounded-xl">
        <LazyLoadImage
          effect="opacity"
          src={`${picUrl}?param=320y320`}
          className="bg-neutral-200 dark:bg-neutral-800 rounded-xl shadow-lg w-64 md:w-72 sm:w-80 h-64 md:h-72 sm:h-80"
        />
      </div>

      <div className="absolute bottom-8 left-4 backdrop-blur-2xl bg-white/50 dark:bg-black/50 rounded-full py-2 px-6 line-clamp-1 truncate text-left text-base md:text-base sm:text-lg mt-1">
        <h1 className="font-medium">{name}</h1>
      </div>
      <br />
    </div>
  );
}
