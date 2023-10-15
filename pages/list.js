import Container from "@/components/layout/Container";
import Huge from "@/components/ui/headings/Huge";
import SmSoCard from "@/components/ui/cards/SmSoCard";

import { useState, useEffect, useContext } from "react";
import { SongIdsContext } from "@/components/layout/SongIdsContext";
import site from "@/lib/site.config";
import axios from "axios";
import PlayAll from "@/components/ui/buttons/playAll";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import Column from "@/components/layout/Column";

export default function List() {
  const [playlistDetails, setPlaylistDetails] = useState([]);
  const { getAllSongIds, removeAllFromPlaylist, addAllToPlaylist } =
    useContext(SongIdsContext);
  const playIds = getAllSongIds();

  const handleRemoveAll = () => {
    removeAllFromPlaylist();
  };

  useEffect(() => {
    const fetchPlaylistDetails = async () => {
      try {
        const response = await axios.get(`${site.api}/song/detail`, {
          params: {
            ids: playIds.join(","),
          },
        });
        setPlaylistDetails(response.data.songs);
      } catch (error) {
        console.error("Error fetching playlist details: ", error);
      }
    };

    if (playIds.length > 0) {
      fetchPlaylistDetails();
    }
  }, [playIds]);

  const handlePlayAll = () => {
    const trackIds = playlistDetails.map((track) => track.id);
    addAllToPlaylist(trackIds); // 将所有歌曲ID传递给 addAllToPlaylist 函数
  };
  return (
    <Container title="播放列表">
      <Huge>播放列表({playlistDetails.length})</Huge>

      <div className="flex flex-row space-x-6 mt-6">
        <PlayAll onClick={handlePlayAll} />
        <button
          className="rounded-lg border bg-neutral-100 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 px-10 py-2"
          onClick={handleRemoveAll}
        >
          删除全部
        </button>
      </div>

      <Column>
        {playlistDetails.length > 0 &&
          playlistDetails.map((track, index) => {
            return (
              <SmSoCard
                key={track.id}
                picUrl={track.al.picUrl}
                index={index}
                duration={track.dt}
                id={track.id}
                arid={track.ar[0].id}
                ar={track.ar.map((artist) => artist.name).join(" / ")}
                name={track.name}
                allowDel="enabled"
              />
            );
          })}
      </Column>
    </Container>
  );
}
