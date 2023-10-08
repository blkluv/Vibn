import { LazyLoadImage } from "react-lazy-load-image-component";
import { useContext } from "react";
import { SongIdsContext } from "@/components/layout/SongIdsContext";

export default function SoCard({ picUrl, name, id, index, ar }) {
  const { addToPlaylist } = useContext(SongIdsContext);
  const handleAddToPlaylist = (trackId) => {
    addToPlaylist(trackId);
  };
  return (
    <div
      onClick={() => handleAddToPlaylist(id)}
      key={index}
      className="cursor-pointer relative"
    >
      <div className="bg-neutral-200 dark:bg-neutral-800 rounded-xl shadow-lg w-36 h-36 md:w-48 md:h-48 sm:w-56 sm:h-56">
        <LazyLoadImage
          effect="opacity"
          src={`${picUrl}?param=224y224`}
          className="bg-neutral-200 dark:bg-neutral-800 rounded-xl shadow-lg w-36 h-36 md:w-48 md:h-48 sm:w-56 sm:h-56"
        />
      </div>

      <div className="absolute bottom-6 left-0 backdrop-blur-2xl bg-white/50 dark:bg-black/50 rounded-b-xl w-full py-2 px-4 md:px-5 sm:px-6 line-clamp-2 truncate text-left text-base md:text-base sm:text-lg mt-1">
        <h1 className="font-medium">{name}</h1>
        <p className="opacity-75 -mt-1">{ar}</p>
      </div>
      <br />
    </div>
  );
}
