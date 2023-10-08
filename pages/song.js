import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import moment from "moment";
import { SongIdsContext } from "@/components/layout/SongIdsContext";
import Container from "@/components/layout/Container";
import site from "@/lib/site.config";
import CoverImg from "@/components/ui/imgs/CoverImg";
import PlayAll from "@/components/ui/buttons/playAll";
import CollectButton from "@/components/ui/buttons/collectButton";
import Huge from "@/components/ui/headings/Huge";
import Medium from "@/components/ui/headings/Medium";
import Horizon from "@/components/layout/HorizonScroll";
import SoCard from "@/components/ui/cards/SoCard";

export default function Song() {
  const [songDetails, setSongDetails] = useState([]);
  const [simiSongDetails, setSimiSongDetails] = useState([]);
  const router = useRouter();
  const id = router.query.id || null;
  const fetchSongDetails = async () => {
    try {
      const response = await fetch(`${site.api}/song/detail?ids=${id}`);
      const data = await response.json();
      if (data && data.code === 200) {
        setSongDetails(data.songs);
      }
    } catch (error) {
      console.log("An error occurred while fetching song details:", error);
    }
  };

  const fetchSimiSongDetails = async () => {
    try {
      const response = await fetch(`${site.api}/simi/song?id=${id}`);
      const data = await response.json();
      if (data && data.code === 200) {
        setSimiSongDetails(data.songs);
        console.log(simiSongDetails);
      }
    } catch (error) {
      console.log("An error occurred while fetching song details:", error);
    }
  };

  useEffect(() => {
    fetchSongDetails();
    fetchSimiSongDetails();
  }, [id]);

  const { addToPlaylist } = useContext(SongIdsContext);

  const handleAddToPlaylist = (trackId) => {
    addToPlaylist(trackId);
  };
  return (
    <Container
      title={songDetails.length > 0 && songDetails && songDetails[0].name}
    >
      {songDetails.length > 0 && songDetails && (
        <>
          <div className="flex flex-col md:flex-row sm:flex-row space-x-0 md:space-x-12 sm:space-x-12">
            <CoverImg
              picUrl={songDetails[0].al.picUrl && songDetails[0].al.picUrl}
            />
            <div className="mt-4 relative w-full md:w-48 sm:w-[30rem] ">
              <Huge>{songDetails !== null && songDetails[0].name}</Huge>

              <p
                className="mt-2 opacity-75 text-base md:text-lg sm:text-xl cursor-pointer"
                onClick={() =>
                  router.push(`/artist?id=${songDetails[0].ar[0].id}`)
                }
              >
                {songDetails[0].ar.map((artist) => artist.name).join(" / ")}
              </p>

              <div className="flex flex-col space-y-1 mt-6">
                <p className="opacity-50 text-sm">所属专辑</p>
                <p
                  className="text-base md:text-lg sm:text-xl cursor-pointer"
                  onClick={() =>
                    router.push(`/album?id=${songDetails[0].al.id}`)
                  }
                >
                  {songDetails[0].al.name}
                </p>
              </div>

              <div className="flex flex-col space-y-1 mt-4">
                <p className="opacity-50 text-sm">年份</p>
                <p className="text-base md:text-lg sm:text-xl">
                  {moment(songDetails[0].publishTime).format("YYYY年")}
                </p>
              </div>

              <div className="absolute bottom-0 flex flex-row space-x-4">
                <PlayAll
                  onClick={() => handleAddToPlaylist(songDetails[0].id)}
                />
                <CollectButton
                  onClick={() =>
                    open(
                      `https://music.163.com/song/media/outer/url?id=${songDetails[0].id}.mp3`
                    )
                  }
                />
              </div>
            </div>
          </div>

          <br />

          {simiSongDetails !== null && simiSongDetails && (
            <>
              <Medium>听听相似歌曲~ 接下来播放</Medium>
              <Horizon>
                {simiSongDetails !== null &&
                  simiSongDetails &&
                  simiSongDetails.map((track, index) => (
                    <SoCard
                      key={track.id}
                      index={index}
                      id={track.id}
                      name={track.name}
                      ar={track.artists.map((artist) => artist.name).join(" / ")}
                      picUrl={track.album.picUrl}
                      arid={track.artists[0].id}
                    />
                  ))}
              </Horizon>
            </>
          )}
        </>
      )}
    </Container>
  );
}
