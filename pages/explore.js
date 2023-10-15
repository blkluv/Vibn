import Container from "@/components/layout/Container";
import Horizon from "@/components/layout/HorizonScroll";
import AlCard from "@/components/ui/cards/AlCard";
import ArCard from "@/components/ui/cards/ArCard";
import MvCard from "@/components/ui/cards/MvCard";
import PlCard from "@/components/ui/cards/PlCard";
import SoCard from "@/components/ui/cards/SoCard";
import Huge from "@/components/ui/headings/Huge";
import Medium from "@/components/ui/headings/Medium";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import site from "@/lib/site.config";

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
          `${site.api}/personalized`
        );
        const dataHighQualityPlaylists =
          await responseHighQualityPlaylists.json();
        if (dataHighQualityPlaylists && dataHighQualityPlaylists.code === 200) {
          setPlaylists(dataHighQualityPlaylists.result);
        }
        const responseNewSongs = await fetch(
          `${site.api}/personalized/newsong?`
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
        const responseNewAl = await fetch(`${site.api}/album/newest`);
        const dataNewAl = await responseNewAl.json();
        const alData = dataNewAl.albums;
        setNewAl(alData);
        console.log(alData)

        const responseNewMV = await fetch(
          `${site.api}/personalized/mv`
        );
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
    <Container title="探索">
      <Huge>探索</Huge>
      {playlists.length > 0 && <Medium>推荐歌单</Medium>}
      <Horizon>
        {playlists.length > 0 &&
          playlists.map((pl, index) => (
            <PlCard
              key={pl.id}
              index={index}
              picUrl={pl.picUrl}
              name={pl.name}
              id={pl.id}
              playCount="enabled"
              signature={pl.playCount}
            />
          ))}
      </Horizon>
      <br />
      {songDetails.length > 0 && <Medium>新歌速递</Medium>}
      <Horizon>
        {songDetails &&
          songDetails
            .slice(0, 12)
            .map((track, index) => (
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
      </Horizon>
      <br />
      {newAl.length > 0 && <Medium>新碟上架</Medium>}
      <Horizon>
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
      </Horizon>
      <br />
      {newAr.length > 0 && <Medium>热门歌手</Medium>}
      <Horizon>
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
      </Horizon>
      <br />
      {newMv.length > 0 && <Medium>推荐MV</Medium>}
      <Horizon>
        {newMv &&
          newMv.map((track, index) => (
            <MvCard
              key={index}
              index={index}
              picUrl={track.picUrl}
              name={track.name}
              id={track.id}
              ar={track.artists.map((artist) => artist.name).join(" / ")}
            />
          ))}
      </Horizon>
    </Container>
  );
}
