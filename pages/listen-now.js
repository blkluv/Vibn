import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { SongIdsContext } from "@/components/layout/SongIdsContext";
import axios from "axios";
import site from "@/lib/site.config";

import Huge from "@/components/ui/headings/Huge";
import Medium from "@/components/ui/headings/Medium";
import Horizon from "@/components/layout/HorizonScroll";
import Container from "@/components/layout/Container";
import PlCard from "@/components/ui/cards/PlCard";
import SoCard from "@/components/ui/cards/SoCard";

export default function ListenNow() {
  const router = useRouter();
  const [playlist, setPlaylist] = useState([]);
  const [songs, setSongs] = useState([]);
  const [fm, setFm] = useState([]);
  const [songId, setSongId] = useState([]);
  const [songDetails, setSongDetails] = useState([]);

  const fetchNewPl = async () => {
    try {
      const response = await axios.get(
        `${site.api}/recommend/resource?cookie=${cookie}`
      );
      const data = response.data;
      const plData = data.recommend;
      setPlaylist(plData);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchNewSongs = async () => {
    try {
      const response = await axios.get(
        `${site.api}/recommend/songs?cookie=${cookie}`
      );
      const data = response.data.data;
      const songData = data.dailySongs;
      setSongs(songData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNewPl();
    fetchNewSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const response = await axios.get(
        `${site.api}/personal_fm?cookie=${cookie}`
      );

      if (response.data.code === 200) {
        const data = response.data;
        setFm(data.data);
        setSongId(data.data.map((song) => song.id));
        fetchSongDetails(data.data.map((song) => song.id));
      } else {
        console.log("获取私人FM失败！");
      }
    } catch (error) {
      console.error(error);
      // 处理错误情况
    }
  };

  const { songIds, currentSongIndex, addToPlaylist } =
    useContext(SongIdsContext);

  const fetchSongDetails = async (songId) => {
    try {
      const response = await fetch(
        `${site.api}/song/detail?ids=${songId.join(",")}`
      );
      const data = await response.json();
      if (data && data.code === 200) {
        setSongDetails(data.songs);
      }
    } catch (error) {
      console.log("An error occurred while fetching song details:", error);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, [songIds[currentSongIndex]]);

  const userDataStr = localStorage.getItem("userData");
  const cookie = localStorage.getItem("cookie");
  const userData = JSON.parse(userDataStr);
  return (
    <Container title="现在就听">
      {userData && (
        <>
          <Huge>现在就听</Huge>
          {playlist.length > 0 && <Medium>每日推荐歌单</Medium>}
          <Horizon>
            {playlist &&
              playlist.length > 0 &&
              playlist.map((pl, index) => (
                <PlCard
                  key={pl.id}
                  index={index}
                  picUrl={pl.picUrl}
                  name={pl.name}
                  id={pl.id}
                  copywriter={pl.copywriter}
                  signature={pl.creator.signature}
                />
              ))}
          </Horizon>
          <br />
          {songs.length > 0 && <Medium>每日推荐歌曲</Medium>}
          <Horizon>
            {songs &&
              songs.map((track, index) => (
                <SoCard
                  key={track.id}
                  index={index}
                  id={track.id}
                  name={track.name}
                  duration={track.durationTime}
                  ar={track.ar.map((artist) => artist.name).join(" / ")}
                  arid={track.ar[0].id}
                  picUrl={track.al.picUrl}
                  reason={track.reason}
                />
              ))}
          </Horizon>
          <br />
          {songDetails.length > 0 && <Medium>每日私人漫游</Medium>}
          <Horizon>
            {songDetails &&
              songDetails.map((track, index) => (
                <SoCard
                  key={track.id}
                  index={index}
                  id={track.id}
                  arid={track.ar[0].id}
                  name={track.name}
                  duration={track.dt}
                  ar={track.ar.map((artist) => artist.name).join(" / ")}
                  picUrl={track.al.picUrl}
                />
              ))}
          </Horizon>
        </>
      )}

      {!userData && <div>请先登录</div>}
    </Container>
  );
}
