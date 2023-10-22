import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { SongIdsContext } from "@/components/layout/SongIdsContext";
import axios from "axios";
import site from "@/lib/site.config";

import Container from "@/components/layout/Container";
import CoverImg from "@/components/ui/imgs/CoverImg";
import Huge from "@/components/ui/headings/Huge";
import PlayAll from "@/components/ui/buttons/playAll";
import Medium from "@/components/ui/headings/Medium";
import SoCard from "@/components/ui/cards/SoCard";
import Horizon from "@/components/layout/HorizonScroll";
import SmSoCard from "@/components/ui/cards/SmSoCard";
import Column from "@/components/layout/Column";
import CollectButton from "@/components/ui/buttons/collectButton";

export default function Playlist() {
  const router = useRouter();
  const id = router.query.id || null;
  const [playlistDetail, setPlaylistDetail] = useState(null);
  const [playlistTrack, setPlaylistTrack] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // 搜索关键词状态
  const [isFavorited, setIsFavorited] = useState(false);

  const filteredTracks = playlistTrack
    ? playlistTrack.filter((track) =>
        track.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const checkIsFavorited = async () => {
    try {
      const response = await axios.get(`${site.api}/playlist/detail/dynamic`, {
        params: {
          id: id,
          cookie: cookie,
        },
      });

      setIsFavorited(response.data.subscribed);
    } catch (error) {
      // 处理错误
      console.error(error);
    }
  };

  const getPlaylistDetail = async () => {
    try {
      const response = await axios.get(`${site.api}/playlist/detail`, {
        params: {
          id: id,
        },
      });

      setPlaylistDetail(response.data.playlist);
    } catch (error) {
      // 处理错误
      console.error(error);
    }
  };

  const getPlaylistTracks = async () => {
    try {
      const response = await axios.get(`${site.api}/playlist/track/all`, {
        params: {
          id: id,
          limit: 1000,
        },
      });

      setPlaylistTrack(response.data.songs);
    } catch (error) {
      // 处理错误
      console.error(error);
    }
  };

  useEffect(() => {
    if (id !== null) {
      checkIsFavorited();
      getPlaylistDetail();
      getPlaylistTracks();
    }
  }, [id]);

  const cookie = localStorage.getItem("cookie");

  async function handleFavoritePlaylist(type, id) {
    try {
      const response = await axios.get(
        `${site.api}/playlist/subscribe?t=${type}&id=${id}&cookie=${cookie}`
      );
      // 根据返回的响应结果更新收藏状态
      setIsFavorited(type === 1);
    } catch (error) {
      console.error(error);
    }
  }

  const { songIds, addAllToPlaylist, addToPlaylist } =
    useContext(SongIdsContext);

  const handleAddToPlaylist = (trackId) => {
    addToPlaylist(trackId);
  };

  const handlePlayAll = () => {
    const trackIds = playlistTrack.map((track) => track.id);
    addAllToPlaylist(trackIds); // 将所有歌曲ID传递给 addAllToPlaylist 函数
  };
  return (
    <Container title={playlistDetail !== null && playlistDetail.name}>
      <div className="mt-4 flex flex-col md:flex-row sm:flex-row space-x-0 md:space-x-12 sm:space-x-12">
        <div className="w-80">
          <CoverImg
            picUrl={playlistDetail !== null && playlistDetail.coverImgUrl}
          />
        </div>

        <div className="mt-4 relative w-full md:w-48 sm:w-[24rem] ">
          <Huge>{playlistDetail !== null && playlistDetail.name}</Huge>
          <p className="mt-6 line-clamp-[10] md:line-clamp-4 sm:line-clamp-[8] mb-24 md:mb-0 sm:mb-0">
            {playlistDetail !== null && playlistDetail.description}
            {playlistDetail !== null &&
              playlistDetail.description === null &&
              "No Description Could Be Displayed"}
          </p>

          <div className="absolute bottom-0 flex flex-row space-x-4">
            <PlayAll onClick={handlePlayAll} />
            <CollectButton
              onClick={() => handleFavoritePlaylist(isFavorited ? 2 : 1, id)}
              isFavorited={isFavorited}
            />
          </div>
        </div>
      </div>
      <br />
      {filteredTracks.length > 0 && <Medium>Priority</Medium>}
      <Column>
        {filteredTracks.length > 0 &&
          filteredTracks
            .slice(0, 10)
            .map((track, index) => (
              <SoCard
                key={track.id}
                picUrl={track.al.picUrl}
                index={index}
                duration={track.dt}
                id={track.id}
                arid={track.ar[0].id}
                ar={track.ar.map((artist) => artist.name).join(" / ")}
                name={track.name}
              />
            ))}
      </Column>
      <br />
      {filteredTracks.slice(10, 9999).length > 0 && (
        <Medium>Don't Miss the Rest Part</Medium>
      )}
      <Column>
        {filteredTracks.slice(10, 9999).length > 0 &&
          filteredTracks
            .slice(10, 9999)
            .map((track, index) => (
              <SoCard
                key={track.id}
                picUrl={track.al.picUrl}
                index={index}
                duration={track.dt}
                id={track.id}
                arid={track.ar[0].id}
                ar={track.ar.map((artist) => artist.name).join(" / ")}
                name={track.name}
              />
            ))}
      </Column>
    </Container>
  );
}
