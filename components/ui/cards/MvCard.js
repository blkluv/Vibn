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
      <div className="rounded-xl w-40 md:w-[11rem] sm:w-72">
        <LazyLoadImage
          effect="opacity"
          src={`${picUrl}?param=576y320`}
          className="bg-neutral-200 dark:bg-neutral-800 rounded-xl w-40 md:w-[11rem] sm:w-72 h-32 md:h-36 sm:h-40"
        />
      </div>

      <div className="text-sm mt-2 w-40 md:w-[11rem] sm:w-72">
        <h1 className="font-medium rounded-md p-1 text-lg">
          <span className="line-clamp-1">{name}</span> 
          <p className="opacity-75 line-clamp-1">{ar}</p>
        </h1>
      </div>
      <br />
    </div>
  );
}
