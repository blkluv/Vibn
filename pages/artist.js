import Container from "@/components/layout/Container";

import axios from "axios";
import { useState, useEffect } from "react";
import site from "@/lib/site.config";
import { useRouter } from "next/router";
import HugeImg from "@/components/ui/imgs/HugeImg";
import Medium from "@/components/ui/headings/Medium";
import Huge from "@/components/ui/headings/Huge";
import Horizon from "@/components/layout/HorizonScroll";
import SoCard from "@/components/ui/cards/SoCard";
import Column from "@/components/layout/Column";
import SmSoCard from "@/components/ui/cards/SmSoCard";
import MvCard from "@/components/ui/cards/MvCard";
import AlCard from "@/components/ui/cards/AlCard";
import ArCard from "@/components/ui/cards/ArCard";

export default function Artist() {
  const [arData, setArData] = useState(null);
  const [arSongs, setArSongs] = useState(null);
  const [arMVs, setArMVs] = useState(null);
  const [arAlbums, setArAlbums] = useState(null);
  const [similarArtists, setSimilarArtists] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const cookie = localStorage.getItem("cookie");

  useEffect(() => {
    if (id) {
      const getArDetail = async () => {
        try {
          setIsLoading(true);
          const arDataResponse = await axios.get(
            `${site.api}/artist/detail?id=${id}`
          );
          if (arDataResponse.data.code === 200) {
            setArData(arDataResponse.data.data.artist);
          }
        } catch (error) {
          console.error("An error occurred while fetching Ar data:", error);
        }
      };

      const getArSongs = async () => {
        try {
          const arSongsResponse = await axios.get(
            `${site.api}/artist/top/song?id=${id}`
          );
          if (arSongsResponse.data.code === 200) {
            setArSongs(arSongsResponse.data.songs);
          }
        } catch (error) {
          console.error("An error occurred while fetching ArSongs:", error);
        }
      };

      const getArMVs = async () => {
        try {
          const arMVsResponse = await axios.get(
            `${site.api}/artist/mv?id=${id}`
          );
          if (arMVsResponse.data.code === 200) {
            setArMVs(arMVsResponse.data.mvs);
          }
        } catch (error) {
          console.error("An error occurred while fetching ArMVs:", error);
        }
      };

      const getArAlbums = async () => {
        try {
          const arAlbumsResponse = await axios.get(
            `${site.api}/artist/album?id=${id}&limit=5`
          );
          if (arAlbumsResponse.data.code === 200) {
            setArAlbums(arAlbumsResponse.data.hotAlbums);
          }
        } catch (error) {
          console.error("An error occurred while fetching ArAlbums:", error);
        }
      };

      const getSimilarArtists = async () => {
        try {
          const similarArtistsResponse = await axios.get(
            `${site.api}/simi/artist?id=${id}&cookie=${cookie}`
          );
          if (similarArtistsResponse.data.code === 200) {
            setSimilarArtists(similarArtistsResponse.data.artists);
          }
        } catch (error) {
          console.error(
            "An error occurred while fetching SimilarArtists:",
            error
          );
        } finally {
          setIsLoading(false);
          console.log(arData);
        }
      };

      getArDetail();
      getArSongs();
      getArMVs();
      getArAlbums();
      getSimilarArtists();
    }

    return () => {
      // 清理函数
    };
  }, [id]);
  return (
    <Container title={arData && arData.name}>
      {arData && (
        <>
          <div className="relative">
            <div className="bg-neutral-200 dark:bg-neutral-800 rounded-xl w-full md:w-full sm:w-[64rem]">
              <HugeImg picUrl={arData.cover} />
            </div>

            <div className="absolute bottom-0 left-0 backdrop-blur-2xl bg-white/50 dark:bg-black/50 rounded-b-xl w-full md:w-full sm:w-[64rem] py-2 md:py-4 sm:py-8 px-6 md:px-8 sm:px-10 line-clamp-2">
              <Huge>{arData.name}</Huge>
              <div className="opacity-75 mt-1">
                <Medium>{arData.alias[0]}</Medium>
              </div>
            </div>
          </div>
          <p className="bg-neutral-200 dark:bg-neutral-800 rounded-xl opacity-75 my-8 px-6 py-4 w-full md:w-full sm:w-[64rem]">
            {arData.briefDesc}
          </p>

          {arSongs !== null && arSongs.slice(0, 10) && (
            <Medium>你喜爱的歌手的代表作</Medium>
          )}
          <Horizon>
            {arSongs !== null &&
              arSongs.slice(0, 10) &&
              arSongs
                .slice(0, 10)
                .map((track, index) => (
                  <SoCard
                    key={track.id}
                    index={index}
                    id={track.id}
                    name={track.name}
                    duration={track.dt}
                    ar={track.ar.map((artist) => artist.name).join(" / ")}
                    arid={track.ar[0].id}
                    picUrl={track.al.picUrl}
                  />
                ))}
          </Horizon>
          <br />
          {arSongs !== null && arSongs.slice(10, 50) && (
            <Medium>同样精彩，不要错过</Medium>
          )}
          <Column>
            {arSongs !== null &&
              arSongs.slice(10, 50) &&
              arSongs
                .slice(10, 50)
                .map((track, index) => (
                  <SmSoCard
                    key={track.id}
                    index={index}
                    id={track.id}
                    name={track.name}
                    duration={track.dt}
                    ar={track.ar.map((artist) => artist.name).join(" / ")}
                    arid={track.ar[0].id}
                    picUrl={track.al.picUrl}
                  />
                ))}
          </Column>
          <br />
          {arMVs !== null && arMVs && <Medium>精彩MV不要错过~</Medium>}
          <Horizon>
            {arMVs &&
              arMVs.map((track, index) => (
                <MvCard
                  key={track.id}
                  index={index}
                  id={track.id}
                  name={track.name}
                  picUrl={track.imgurl}
                  ar={Array.from(track.artist)
                    .map((artist) => artist.name)
                    .join(" / ")}
                />
              ))}
          </Horizon>
          <br />
          {arAlbums !== null && arAlbums && (
            <Medium>看看有没有你珍藏的专辑~</Medium>
          )}
          <Horizon>
            {arAlbums &&
              arAlbums.map((al, index) => (
                <AlCard
                  key={al.id}
                  index={index}
                  picUrl={al.picUrl}
                  name={al.name}
                  id={al.id}
                />
              ))}
          </Horizon>
          <br />
          {similarArtists !== null && similarArtists && (
            <Medium>相似歌手，一次看个够</Medium>
          )}
          <Horizon>
            {similarArtists &&
              similarArtists.map((artist, index) => (
                <ArCard
                  key={artist.id}
                  picUrl={artist.picUrl}
                  name={artist.name}
                  id={artist.id}
                  index={index}
                />
              ))}
          </Horizon>
        </>
      )}
    </Container>
  );
}
