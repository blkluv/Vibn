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
      <div className="rounded-xl w-40 md:w-40 sm:w-48">
        <LazyLoadImage
          effect="opacity"
          src={`${picUrl}?param=192y192`}
          className="bg-neutral-200 dark:bg-neutral-800 rounded-xl w-40 h-40 md:w-40 md:h-40 sm:w-48 sm:h-48"
        />
      </div>

      <div className="mt-1 w-40 md:w-40 sm:w-48">
        <h1 className="font-medium rounded-md p-1 text-lg">
          <span className="line-clamp-1">{name}</span> 
          <p className="opacity-75 line-clamp-1">{ar}</p>
        </h1>
      </div>
      <br />
    </div>
  );
}
