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
    <Container title="仪表盘">
      <div className="flex flex-col md:flex-row sm:flex-row space-x-0 md:space-x-12 sm:space-x-12">
        <CoverImg
          picUrl={userDetail !== null && userDetail.profile.avatarUrl}
        />
        <div className="mt-4 relative w-full md:w-48 sm:w-[30rem] ">
          <Huge>{userDetail !== null && userDetail.profile.nickname}</Huge>
          <div className="mt-6 line-clamp-[10] md:line-clamp-4 sm:line-clamp-[8]">
            <p>等级：Lv.{userDetail !== null && userDetail.level}</p>
            <p>
              个人简介： {userDetail !== null && userDetail.profile.signature}
            </p>
            <p>加入： {userDetail !== null && userDetail.createDays}天前</p>
            <p>累计听歌： {userDetail !== null && userDetail.listenSongs}首</p>
          </div>

          <div className="absolute bottom-0 hidden md:block sm:block">
            <InvertButton onClick={handleSignin}>签到</InvertButton>
          </div>
        </div>
      </div>
      <br />
      {playlists.length > 0 && <Medium>我创建的歌单</Medium>}
      <Horizon>
        {playlists.length > 0 &&
          playlists.map((pl, index) => (
            <PlCard
              key={pl.id}
              index={index}
              picUrl={pl.coverImgUrl}
              name={pl.name}
              id={pl.id}
            />
          ))}
      </Horizon>
    </Container>
  );
}
