import { LazyLoadImage } from "react-lazy-load-image-component";

export default function CoverImg({ picUrl }) {
  return (
    <LazyLoadImage
      effect="opacity"
      src={`${picUrl}?param=384y384`}
      className="bg-neutral-200 dark:bg-neutral-800 rounded-xl w-96 h-96"
    />
  );
}
