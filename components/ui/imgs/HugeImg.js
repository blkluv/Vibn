import { LazyLoadImage } from "react-lazy-load-image-component";

export default function HugeImg({ picUrl }) {
  return (
    <LazyLoadImage
      effect="opacity"
      src={`${picUrl}?param=1920y1080`}
      className="bg-neutral-200 dark:bg-neutral-800 rounded-xl w-full h-auto"
    />
  );
}