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
      <div className="bg-neutral-200 dark:bg-neutral-800 rounded-xl  w-80 md:w-96 sm:w-[27.5rem] h-48 md:h-56 sm:h-64">
        <LazyLoadImage
          effect="opacity"
          src={`${picUrl}?param=440y256`}
          className="bg-neutral-200 dark:bg-neutral-800 rounded-xl  w-80 md:w-96 sm:w-[27.5rem] h-48 md:h-56 sm:h-64"
        />
      </div>

      <div className="absolute bottom-6 left-0 backdrop-blur-2xl bg-white/50 dark:bg-black/50 rounded-b-xl w-full py-2.5 px-4 md:px-5 sm:px-6 line-clamp-2 truncate text-left text-base md:text-base sm:text-lg mt-1">
        <h1 className="font-medium">{name}</h1>
        <p className="opacity-75 -mt-1">{ar}</p>
      </div>
      <br />
    </div>
  );
}
