import Container from "@/components/layout/Container";
import InvertButton from "@/components/ui/buttons/InvertButton";
import CoverImg from "@/components/ui/imgs/CoverImg";
import Huge from "@/components/ui/headings/Huge";

import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import site from "@/lib/site.config";
import Medium from "@/components/ui/headings/Medium";
import PlCard from "@/components/ui/cards/PlCard";
import Horizon from "@/components/layout/HorizonScroll";
import CollectButton from "@/components/ui/buttons/collectButton";
import Column from "@/components/layout/Column";

export default function Dashboard() {
  const [userDetail, setUserDetail] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const userDataStr = localStorage.getItem("userData");
  const userData = JSON.parse(userDataStr);
  const cookie = localStorage.getItem("cookie");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${site.api}/user/detail?uid=${userData.data.account.id}`
        );
        const userDetails = response.data;
        console.log(response.data);
        setUserDetail(userDetails);

        const playlistResponse = await axios.get(
          `${site.api}/user/playlist?uid=${userData.data.account.id}`
        );
        const playlistData = playlistResponse.data;
        setPlaylists(playlistData.playlist);
      } catch (error) {
        console.error(error);
        // 处理错误
      }
    }

    fetchData(); // 调用 fetchData 函数来获取用户详情和歌单数据
  }, []); // 空数组作为依赖项，确保只在组件挂载后调用一次

  const handleSignin = async () => {
    try {
      const response = await axios.get(
        `${site.api}/daily_signin?cookie=${cookie}`
      );
      console.log("签到成功", response.data);
      alert("签到成功，经验 + 3.请勿重复签到！");
      // 处理签到结果
      // ...
    } catch (error) {
      console.error("签到失败", error);
      alert("签到失败，需要登录.请勿重复签到！");
    }
  };

  const router = useRouter();

  const logout = () => {
    // 清除本地存储的 cookie 和用户数据
    localStorage.removeItem("cookie");
    localStorage.removeItem("userData");
    router.reload();
  };
  return (
    <Container title="Dashboard">
       <Huge>{userDetail !== null && userDetail.profile.nickname}'s Dashboard</Huge>
      <br />
      {playlists.length > 0 && <Medium>Created Playlists</Medium>}
      <Column>
        {playlists.length > 0 &&
          playlists.map((pl, index) => (
            <PlCard
              key={pl.id}
              index={index}
              picUrl={pl.coverImgUrl}
              name={pl.name}
              id={pl.id}
              signature={pl.creator.signature}
            />
          ))}
      </Column>
    </Container>
  );
}
