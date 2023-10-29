import React, { useState, useEffect, useContext } from "react";
import { Icon } from "@iconify/react";
import { SongIdsContext } from "@/components/layout/SongIdsContext";
import Head from "next/head";
import { useRouter } from "next/router";
import Container from "@/components/layout/Container";
import Medium from "@/components/ui/headings/Medium";
import Input from "@/components/ui/contents/Input";
import SoCard from "@/components/ui/cards/SoCard";
import ArCard from "@/components/ui/cards/ArCard";
import PlCard from "@/components/ui/cards/PlCard";
import AlCard from "@/components/ui/cards/AlCard";
import MvCard from "@/components/ui/cards/MvCard";
import Huge from "@/components/ui/headings/Huge";
import Horizon from "@/components/layout/HorizonScroll";

import site from "@/lib/site.config";
import Column from "@/components/layout/Column";

const MusicSearch = () => {
  const router = useRouter();
  const keywords = router.query.keywords || null;
  const [keyword, setKeyword] = useState("");
  const [word, setWord] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [songDetail, setSongDetail] = useState([]);
  const [artistDetail, setArtistDetail] = useState([]);
  const [playlistDetail, setPlaylistDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hotSearchList, setHotSearchList] = useState([]);
  const [albumDetail, setAlbumDetail] = useState([]);
  const [videoDetail, setVideoDetail] = useState([]);
  const [mvDetail, setMvDetail] = useState([]);

  useEffect(() => {
    const fetchHotSearchList = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${site.api}/search/hot/detail`);
        const data = await response.json();
        if (data && data.code === 200) {
          setHotSearchList(data.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(
          "An error occurred while fetching hot search list:",
          error
        );
      }
    };

    fetchHotSearchList();
  }, []);

  useEffect(() => {
    const searchKeywords = localStorage.getItem("searchKeywords");

    if (searchKeywords) {
      setKeyword(searchKeywords);
      setWord(searchKeywords);
    }
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault(); // 阻止表单默认提交行为
    setIsLoading(true);
    setWord(keyword);
    router.push(`/search?keywords=${keyword}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (keywords) {
        try {
          setIsLoading(true);
          const [
            songResponse,
            artistResponse,
            playlistResponse,
            albumResponse,
            mvResponse,
            videoResponse,
          ] = await Promise.all([
            fetch(
              `${site.api}/search?keywords=${encodeURIComponent(keywords)}`
            ),
            fetch(
              `${site.api}/search?type=100&keywords=${encodeURIComponent(
                keywords
              )}`
            ),
            fetch(
              `${site.api}/search?type=1000&keywords=${encodeURIComponent(
                keywords
              )}`
            ),
            fetch(
              `${site.api}/search?type=10&keywords=${encodeURIComponent(
                keywords
              )}`
            ),
            fetch(
              `${site.api}/search?type=1004&keywords=${encodeURIComponent(
                keywords
              )}`
            ),
            fetch(
              `${site.api}/search?type=1014&keywords=${encodeURIComponent(
                keywords
              )}`
            ),
          ]);

          const songData = await songResponse.json();
          const artistData = await artistResponse.json();
          const playlistData = await playlistResponse.json();
          const albumData = await albumResponse.json();
          const mvData = await mvResponse.json();
          const videoData = await videoResponse.json();

          if (songData && songData.code === 200) {
            const songIds = songData.result.songs.map((song) => song.id);
            await fetchSongDetails(songIds);
          }

          if (artistData && artistData.code === 200) {
            setArtistDetail(artistData.result.artists);
          }

          if (playlistData && playlistData.code === 200) {
            setPlaylistDetail(playlistData.result.playlists);
          }

          if (albumData && albumData.code === 200) {
            setAlbumDetail(albumData.result.albums);
          }

          if (mvData && mvData.code === 200) {
            setMvDetail(mvData.result.mvs);
          }

          if (videoData && videoData.code === 200) {
            setVideoDetail(videoData.result.videos);
          }

          localStorage.setItem("searchKeywords", keywords); // 将搜索关键词保存在本地存储中
        } catch (error) {
          console.log("An error occurred while searching:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    const fetchSongDetails = async (songIds) => {
      try {
        const response = await fetch(
          `${site.api}/song/detail?ids=${songIds.join(",")}`
        );
        const data = await response.json();
        if (data && data.code === 200) {
          setSongDetail(data.songs);
        }
      } catch (error) {
        console.log("An error occurred while fetching song details:", error);
      }
    };

    fetchData();
  }, [keywords]);

  const {
    songIds,
    currentSongIndex,
    setCurrentSongIndex,
    addAllToPlaylist,
    addToPlaylist,
  } = useContext(SongIdsContext);

  const playingSongId = songIds[currentSongIndex];

  const handleAddToPlaylist = (trackId) => {
    addToPlaylist(trackId);
  };

  const handlePlayAll = () => {
    const trackIds = playlistTrack.map((track) => track.id);
    addAllToPlaylist(trackIds); // 将所有歌曲ID传递给 addAllToPlaylist 函数
  };

  return (
    <Container title="搜索">
        {isLoading && <div className="flex flex-row space-x-2"><Icon icon="svg-spinners:bars-rotate-fade" className="mt-1" loop={true} /> <span>仍在加载...</span></div>}
      <br />
      {songDetail.length > 0 && (
        <>
          {songDetail && !isLoading && <Medium id="song">单曲</Medium>}
          <Column cols={6} smCols={2} mdCols={4}>
            {songDetail &&
              !isLoading &&
              songDetail.map((track, index) => (
                <SoCard
                  key={track.id}
                  index={index}
                  id={track.id}
                  name={track.name}
                  ar={track.ar.map((artist) => artist.name).join(" / ")}
                  picUrl={track.al.picUrl}
                  duration={track.dt}
                />
              ))}
          </Column>
          <br />
          {songDetail && !isLoading && <Medium id="artist">艺术家</Medium>}
          <Column cols={6} smCols={2} mdCols={4}>
            {artistDetail &&
              !isLoading &&
              artistDetail.map((artist, index) => (
                <ArCard
                  key={artist.id}
                  index={index}
                  id={artist.id}
                  picUrl={artist.picUrl}
                  name={artist.name}
                />
              ))}
          </Column>
          <br />
          {songDetail && !isLoading && <Medium id="playlist">歌单</Medium>}
          <Column cols={4} smCols={2} mdCols={4}>
            {playlistDetail.length > 0 &&
              !isLoading &&
              playlistDetail.map((pl, index) => (
                <PlCard
                  key={pl.id}
                  index={index}
                  picUrl={pl.coverImgUrl}
                  name={pl.name}
                  id={pl.id}
                  playCount={pl.playCount}
                />
              ))}
          </Column>
          <br />
          {songDetail && !isLoading && <Medium id="album">专辑</Medium>}
          <Column cols={6} smCols={2} mdCols={4}>
            {albumDetail &&
              !isLoading &&
              albumDetail.map((al, index) => (
                <AlCard
                  key={al.id}
                  index={index}
                  picUrl={al.picUrl}
                  name={al.name}
                  ar={al.artists.map((artist) => artist.name).join(" / ")}
                  id={al.id}
                />
              ))}
          </Column>
          <br />
          {songDetail && !isLoading && <Medium id="mv">MV</Medium>}
          <Column>
            {mvDetail &&
              !isLoading &&
              mvDetail.map((track, index) => (
                <MvCard
                  key={track.id}
                  index={index}
                  id={track.id}
                  name={track.name}
                  ar={track.artists.map((artist) => artist.name).join(" / ")}
                  picUrl={track.cover}
                />
              ))}
          </Column>
        </>
      )}
    </Container>
  );
};

export default MusicSearch;
