import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NavButton from "../buttons/NavButton";
import { useTheme } from "next-themes";
import axios from "axios";
import Small from "../headings/Small";
import site from "@/lib/site.config";
import { Hash } from "@/components/icons/HashIcon";
import { Layers } from "@/components/icons/LayerIcon";
import { Globe } from "@/components/icons/GlobeIcon";
import { Sun } from "@/components/icons/SunIcon";
import { Moon } from "@/components/icons/MoonIcon";
import { Radio } from "@/components/icons/RadioIcon";
import { Search } from "@/components/icons/SearchIcon";
import { User } from "@/components/icons/UserIcon";

export default function NavContent() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [hotSearchList, setHotSearchList] = useState([]);
  const [userDetail, setUserDetail] = useState(null);
  useEffect(() => {
    const fetchHotSearchList = async () => {
      try {
        const response = await fetch(`${site.api}/search/hot/detail`);
        const data = await response.json();
        if (data && data.code === 200) {
          setHotSearchList(data.data);
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
  const userDataStr = localStorage.getItem("userData");
  const userData = JSON.parse(userDataStr);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${site.api}/user/detail?uid=${userData.data.account.id}`
        );
        const userDetails = response.data;
        setUserDetail(userDetails);
      } catch (error) {
        console.error(error);
        // 处理错误
      }
    }

    fetchData(); // 调用 fetchData 函数来获取用户详情和歌单数据
  }, []); // 空数组作为依赖项，确保只在组件挂载后调用一次
  return (
    <div className="">
      <div className="-mt-4">
        <Small>导航</Small>
      </div>
      <div className="flex flex-col">
        <NavButton onClick={() => router.push("/listen-now")}>
          <Layers /> 现在就听
        </NavButton>
        <NavButton onClick={() => router.push("/explore")}>
          <Hash /> 探索
        </NavButton>
        <NavButton onClick={() => router.push("/broadcast")}>
          <Radio /> 电台
        </NavButton>
      </div>

      <Small>在线</Small>
      <div className="flex flex-col">
        <NavButton onClick={() => router.push("/search")}>
          <Search /> 搜索
        </NavButton>
        <NavButton
          onClick={() => router.push(userData ? "/dashboard" : "/login")}
        >
          <User /> {userData ? `仪表盘` : "登录"}
        </NavButton>
      </div>

      <Small className="opacity-75 text-sm mt-6 mb-1">主题</Small>
      <div className="flex flex-col">
        <NavButton onClick={() => setTheme("system")}>
          <Globe /> 系统默认
        </NavButton>
        <NavButton onClick={() => setTheme("light")}>
          <Sun /> 明亮
        </NavButton>
        <NavButton onClick={() => setTheme("dark")}>
          <Moon /> 黑暗
        </NavButton>
      </div>
    </div>
  );
}
