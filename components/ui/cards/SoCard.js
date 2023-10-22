import { LazyLoadImage } from "react-lazy-load-image-component";
import { useContext } from "react";
import { SongIdsContext } from "@/components/layout/SongIdsContext";
import cn from 'classnames'

export default function SoCard({ picUrl, name, id, index, ar }) {
  const { songIds, currentSongIndex, addToPlaylist } = useContext(SongIdsContext);
  const handleAddToPlaylist = (trackId) => {
    addToPlaylist(trackId);
  };
  return (
    <div
      onClick={() => handleAddToPlaylist(id)}
      key={index}
      className="cursor-pointer relative"
    >
      <div className="bg-neutral-200 dark:bg-neutral-800 rounded-xl w-40 h-40">
        <LazyLoadImage
          effect="opacity"
          src={`${picUrl}?param=160y160`}
          className="bg-neutral-200 dark:bg-neutral-800 rounded-xl w-40 h-40"
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
