import { LazyLoadImage } from "react-lazy-load-image-component";
import { useContext } from "react";
import { SongIdsContext } from "@/components/layout/SongIdsContext";

export default function SmSoCard({ picUrl, name, id, index, ar }) {
  const { addToPlaylist } = useContext(SongIdsContext);
  const handleAddToPlaylist = (trackId) => {
    addToPlaylist(trackId);
  };
  return (
    <div
      onClick={() => handleAddToPlaylist(id)}
      key={index}
      className="cursor-pointer relative flex flex-row space-x-4 border-b border-neutral-200 dark:border-neutral-800 py-1 mb-2"
    >
      <LazyLoadImage
        effect="opacity"
        src={`${picUrl}?param=64y64`}
        className="bg-neutral-200 dark:bg-neutral-800 rounded-xl shadow-lg w-12 h-12 md:w-14 md:h-14 sm:w-16 sm:h-16"
      />
      <div className="">
        <h1 className="font-semibold mt-1 truncate w-36 md:w-48 sm:w-64 text-left text-sm md:text-base sm:text-base">{name}</h1>
        <p className="opacity-75 mt-1 truncate w-36 md:w-48 sm:w-64 text-left text-sm md:text-base sm:text-base">{ar}</p>
      </div>
    </div>
  );
}