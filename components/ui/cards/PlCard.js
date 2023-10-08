import { LazyLoadImage } from "react-lazy-load-image-component";
import { useRouter } from "next/router";

export default function PlCard({ picUrl, id, name, index }) {
  const router = useRouter();
  return (
    <div
      key={index}
      className="relative cursor-pointer"
      onClick={() => router.push(`/playlist?id=${id}`)}
    >
      <div className="w-72 md:w-[22rem] sm:w-96 h-72 md:h-[22rem] sm:h-96 rounded-lg bg-neutral-200 dark:bg-neutral-800">
        <LazyLoadImage
          effect="opacity"
          src={`${picUrl}?param=384y384`}
          className="bg-neutral-200 dark:bg-neutral-800 w-72 md:w-[22rem] sm:w-96 h-72 md:h-[22rem] sm:h-96 rounded-xl shadow-lg "
        />
      </div>

      <div className="absolute bottom-8 left-4 backdrop-blur-2xl bg-white/50 dark:bg-black/50 rounded-full py-2 px-6 line-clamp-1 text-left text-base md:text-base sm:text-lg mt-1">
        <h1 className="font-medium">{name}</h1>
      </div>
      <br />
    </div>
  );
}
