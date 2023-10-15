import { LazyLoadImage } from "react-lazy-load-image-component";
import { useContext } from "react";
import { SongIdsContext } from "@/components/layout/SongIdsContext";

export default function SmSoCard({ picUrl, name, id, index, ar, allowDel }) {
  const { addToPlaylist, removeFromPlaylist } = useContext(SongIdsContext);
  const handleAddToPlaylist = (trackId) => {
    addToPlaylist(trackId);
  };
  const handleRemoveFromPlaylist = (trackId, event) => {
    event.stopPropagation(); // 阻止事件向上传递
    removeFromPlaylist(trackId);
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
        className="bg-neutral-200 dark:bg-neutral-800 rounded-xl  w-12 h-12 md:w-14 md:h-14 sm:w-16 sm:h-16"
      />
      <div className="text-base md:text-lg sm:text-lg">
        <h1 className="mt-0.5 font-medium truncate w-48 md:w-72 sm:w-80 text-left">
          {name}
        </h1>
        <p className="opacity-75 truncate w-48 md:w-72 sm:w-80 text-left">
          {ar}
        </p>
      </div>
      {allowDel === "enabled" && (
        <button onClick={(event) => handleRemoveFromPlaylist(id, event)}>移除</button>
      )}
    </div>
  );
}
