import Container from "@/components/layout/Container";
import Horizon from "@/components/layout/HorizonScroll";
import AlCard from "@/components/ui/cards/AlCard";
import ArCard from "@/components/ui/cards/ArCard";
import MvCard from "@/components/ui/cards/MvCard";
import PlCard from "@/components/ui/cards/PlCard";
import SoCard from "@/components/ui/cards/SoCard";
import Huge from "@/components/ui/headings/Huge";
import Medium from "@/components/ui/headings/Medium";
import { Icon } from "@iconify/react";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import site from "@/lib/site.config";
import Column from "@/components/layout/Column";

export default function Home() {
  const router = useRouter();
  const [playlists, setPlaylists] = useState([]);
  const [newMv, setNewMv] = useState([]);
  const [newSongs, setNewSongs] = useState([]);
  const [songIds, setSongIds] = useState([]);
  const [songDetails, setSongDetails] = useState([]);
  const [newAl, setNewAl] = useState([]);
  const [newAr, setNewAr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaylistLoading, setIsPlaylistLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const responseHighQualityPlaylists = await fetch(
          `${site.api}/personalized?limit=30`
        );
        const dataHighQualityPlaylists =
          await responseHighQualityPlaylists.json();
        if (dataHighQualityPlaylists && dataHighQualityPlaylists.code === 200) {
          setPlaylists(dataHighQualityPlaylists.result);
        }
        const responseNewSongs = await fetch(
          `${site.api}/personalized/newsong?limit=30`
        );
        const dataNewSongs = await responseNewSongs.json();
        if (dataNewSongs && dataNewSongs.code === 200) {
          setNewSongs(dataNewSongs.result);
          setSongIds(dataNewSongs.result.map((song) => song.id));
          const responseSongDetails = await fetch(
            `${site.api}/song/detail?ids=${dataNewSongs.result
              .map((song) => song.id)
              .join(",")}`
          );
          const dataSongDetails = await responseSongDetails.json();
          if (dataSongDetails && dataSongDetails.code === 200) {
            setSongDetails(dataSongDetails.songs);
          }
        }
        const responseNewAl = await fetch(`${site.api}/album/newest?limit=30`);
        const dataNewAl = await responseNewAl.json();
        const alData = dataNewAl.albums;
        setNewAl(alData);

        const responseNewMV = await fetch(`${site.api}/personalized/mv`);
        const dataNewMV = await responseNewMV.json();
        if (dataNewMV && dataNewMV.code === 200) {
          setNewMv(dataNewMV.result);
        }

        const responseNewAr = await fetch(`${site.api}/top/artists`);
        const dataNewAr = await responseNewAr.json();
        if (dataNewAr && dataNewAr.code === 200) {
          setNewAr(dataNewAr.artists);
        }
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Container title="浏览">
      {playlists.length > 0 && <Medium>推荐歌单</Medium>}
      <Column mdCols={4} smCols={2} cols={4}>
        {playlists.length > 0 &&
          playlists.map((pl, index) => (
            <PlCard
              key={pl.id}
              index={index}
              picUrl={pl.picUrl}
              name={pl.name}
              id={pl.id}
              playCount={pl.playCount}
            />
          ))}
      </Column>
      <br />
      {songDetails.length > 0 && <Medium>新歌速递</Medium>}
      <Column mdCols={4} smCols={2} cols={6}>
        {songDetails &&
          songDetails.map((track, index) => (
            <SoCard
              key={track.id}
              index={index}
              id={track.id}
              name={track.name}
              duration={track.durationTime}
              ar={track.ar.map((artist) => artist.name).join(" / ")}
              picUrl={track.al.picUrl}
              arid={track.ar[0].id}
            />
          ))}
      </Column>
      <br />
      {newAl.length > 0 && <Medium>新碟上架</Medium>}
      <Column mdCols={4} smCols={2} cols={6}>
        {newAl &&
          newAl.map((al, index) => (
            <AlCard
              key={index}
              index={index}
              picUrl={al.picUrl}
              name={al.name}
              ar={al.artists.map((artist) => artist.name).join(" / ")}
              id={al.id}
            />
          ))}
      </Column>
      <br />
      {newAr.length > 0 && <Medium>热门歌手</Medium>}
      <Column mdCols={4} smCols={2} cols={6}>
        {newAr &&
          newAr.map((ar, index) => (
            <ArCard
              key={index}
              index={index}
              picUrl={ar.picUrl}
              name={ar.name}
              id={ar.id}
            />
          ))}
      </Column>
      <br />
      {isLoading && <div className="flex flex-row space-x-2"><Icon icon="svg-spinners:bars-rotate-fade" className="mt-1" loop={true} /> <span>仍在加载...</span></div>}
    </Container>
  );
}
