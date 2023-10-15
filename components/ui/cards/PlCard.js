import { LazyLoadImage } from "react-lazy-load-image-component";
import { useRouter } from "next/router";

export default function PlCard({ picUrl, id, name, index, signature, playCount }) {
  const router = useRouter();
  return (
    <div
      key={index}
      className="relative cursor-pointer"
      onClick={() => router.push(`/playlist?id=${id}`)}
    >
      <div className="w-72 md:w-[22rem] sm:w-96 h-72 md:h-[22rem] sm:h-96 rounded-xl bg-neutral-200 dark:bg-neutral-800">
        <LazyLoadImage
          effect="opacity"
          src={`${picUrl}?param=384y384`}
          className="bg-neutral-200 dark:bg-neutral-800 w-72 md:w-[22rem] sm:w-96 h-72 md:h-[22rem] sm:h-96 rounded-xl "
        />
      </div>

      <div className="absolute bottom-6 left-0 w-full backdrop-blur-2xl bg-white/50 dark:bg-black/50 rounded-b-xl py-2.5 px-6 text-left text-base md:text-base sm:text-lg mt-1">
        <h1 className="font-medium line-clamp-1">{name}</h1>
        <p className="opacity-75 line-clamp-1">{signature} {playCount === 'enabled' && '次播放'}</p>
      </div>
      <br />
    </div>
  );
}
