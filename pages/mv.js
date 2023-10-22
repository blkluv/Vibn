import Container from "@/components/layout/Container";

import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import Huge from "@/components/ui/headings/Huge";
import Medium from "@/components/ui/headings/Medium";
import Horizon from "@/components/layout/HorizonScroll";
import MvCard from "@/components/ui/cards/MvCard";

import site from "@/lib/site.config";

export default function Mv() {
  const [mvData, setMvData] = useState(null);
  const [mvUrl, setMvUrl] = useState(null);
  const [simiMv, setSimiMv] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const cookie = localStorage.getItem("cookie");

  const getMvData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${site.api}/mv/detail?mvid=${id}`
      );
      if (response.data.code === 200) {
        setMvData(response.data.data);
      }
    } catch (error) {
      console.log("An error occurred while fetching MV data:", error);
    }
  };

  const getMvUrl = async () => {
    try {
      const response = await axios.get(`${site.api}/mv/url?id=${id}`);
      if (response.data.code === 200) {
        setMvUrl(response.data.data.url);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("An error occurred while fetching MV URL:", error);
    }
  };

  const getSimiMv = async () => {
    try {
      const response = await axios.get(
        `${site.api}/simi/mv?mvid=${id}&cookie=${cookie}`
      );
      if (response.data.code === 200) {
        setSimiMv(response.data.mvs);
      }
    } catch (error) {
      console.log("An error occurred while fetching Similar MV:", error);
    }
  };

  useEffect(() => {
    getMvData();
    getMvUrl();
    getSimiMv();
  }, [id]);
  return (
    <Container title={mvData && mvData.name}>
      {mvUrl && mvData && (
        <div>
          <video controls src={mvUrl} className="rounded-xl w-full"></video>
          <div className="mt-6">
            <Huge>{mvData.name}</Huge>
            <div className="opacity-75 mt-2">
              <Medium>{mvData.artistName}</Medium>
            </div>
          </div>
        </div>
      )}
      <br />
      {simiMv !== null && simiMv && (
        <>
          <Medium>From the Same Artist</Medium>
          <Horizon>
          {simiMv !== null && simiMv &&
              simiMv.map((track, index) => (
                <MvCard
                  key={track.id}
                  index={index}
                  id={track.id}
                  name={track.name}
                  picUrl={track.cover}
                  ar={Array.from(track.artists)
                    .map((artist) => artist.name)
                    .join(" / ")}
                />
              ))}
          </Horizon>
        </>
      )}
    </Container>
  );
}
