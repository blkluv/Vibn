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
  const [albumDetail, setAlbumDetail] = useState(null);
  const [albumTrack, setAlbumTrack] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // 搜索关键词状态
  const [isFavorited, setIsFavorited] = useState(false);

  const checkIsFavorited = async () => {
    try {
      const response = await axios.get(`${site.api}/album/detail/dynamic`, {
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

  const getAlbumDetail = async () => {
    try {
      const response = await fetch(`${site.api}/album?id=${id}`);
      const data = await response.json();
      const songs = data.songs;
      setAlbumDetail(data);
      setAlbumTrack([songs]);
    } catch (error) {
      // 处理错误
      console.error(error);
    }
  };

  useEffect(() => {
    if (id !== null) {
      checkIsFavorited();
      getAlbumDetail();
    }
  }, [id]);

  const cookie = localStorage.getItem("cookie");

  async function handleFavoriteAlbum(type, id) {
    try {
      const response = await axios.get(
        `${site.api}/album/sub?t=${type}&id=${id}&cookie=${cookie}`
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
    const trackIds = albumTrack[0].map((track) => track.id);
    addAllToPlaylist(trackIds); // 将所有歌曲ID传递给 addAllToPlaylist 函数
  };
  return (
    <Container title={albumDetail !== null && albumDetail.album.name}>
      <div className="flex flex-col md:flex-row sm:flex-row space-x-0 md:space-x-12 sm:space-x-12">
        <CoverImg picUrl={albumDetail !== null && albumDetail.album.picUrl} />
        <div className="mt-4 relative w-full md:w-64 sm:w-[30rem] ">
          <Huge>{albumDetail !== null && albumDetail.album.name}</Huge>
          <p className="mt-6 text-sm line-clamp-[10] md:line-clamp-4 sm:line-clamp-[8] mb-24 md:mb-0 sm:mb-0">
            {albumDetail !== null && albumDetail.album.description}
          </p>

          <div className="absolute bottom-0 flex flex-row space-x-4">
            <PlayAll onClick={handlePlayAll} />
            <CollectButton
              onClick={() => handleFavoriteAlbum(isFavorited ? 0 : 1, id)}
              isFavorited={isFavorited}
            />
          </div>
        </div>
      </div>
      <br />
      <div className="columns-1 md:columns-2 sm:columns-2">
        {albumTrack &&
          albumTrack[0].map((track, index) => (
            <SmSoCard
              key={track.id}
              index={index}
              id={track.id}
              name={track.name}
              duration={track.dt}
              ar={track.ar.map((artist) => artist.name).join(" / ")}
              picUrl={track.al.picUrl}
              arid={track.ar[0].id}
            />
          ))}
      </div>
      <br />
    </Container>
  );
}
