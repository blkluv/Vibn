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
      <div className="w-40 h-40 bg-neutral-200 dark:bg-neutral-800 rounded-xl">
        <LazyLoadImage
          effect="opacity"
          src={`${picUrl}?param=160y160`}
          className="w-40 h-40 bg-neutral-200  dark:bg-neutral-800 rounded-xl "
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
