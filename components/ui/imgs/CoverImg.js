import { LazyLoadImage } from "react-lazy-load-image-component";

export default function CoverImg({ picUrl }) {
  return (
    <LazyLoadImage
      effect="opacity"
      src={`${picUrl}?param=288y288`}
      className="bg-neutral-200 dark:bg-neutral-800 rounded-xl w-72 h-72"
    />
  );
}
