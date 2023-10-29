import { LazyLoadImage } from "react-lazy-load-image-component";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";

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
      <div className="w-40 md:w-[11rem] sm:w-72 rounded-xl">
        <LazyLoadImage
          effect="opacity"
          src={`${picUrl}?param=288y288`}
          className="bg-neutral-200 dark:bg-neutral-800 w-40 md:w-[11rem] sm:w-72 h-40 md:h-[11rem] sm:h-72 rounded-xl "
        />
        <div className="absolute top-1 left-1 flex flex-row bg-neutral-200/75 dark:bg-neutral-800/75 backdrop-blur-lg rounded-md px-1 py-1 text-sm text-neutral-800 dark:text-neutral-200">
          <Icon icon="teenyicons:play-small-solid" className="w-5 h-5" />
          <div className="">{playCount}</div>
        </div>
      </div>

      <div className="mt-1 w-40 md:w-[11rem] sm:w-72">
        <h1 className="font-medium rounded-md p-1 text-lg">
          <span className="line-clamp-1">{name}</span>
        </h1>
      </div>
      <br />
    </div>
  );
}
