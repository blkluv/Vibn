import { useTheme } from "next-themes";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import NavButton from "../ui/buttons/NavButton";
import { Hash } from "../icons/HashIcon";
import { Layers } from "../icons/LayerIcon";
import { Radio } from "../icons/RadioIcon";
import { Search } from "../icons/SearchIcon";
import { Moon } from "../icons/MoonIcon";
import { Globe } from "../icons/GlobeIcon";
import { Sun } from "../icons/SunIcon";
import { User } from "../icons/UserIcon";
import Player from "./Player";
import { List } from "../icons/ListIcon";

export const Navbar = () => {
  const [search, setSearch] = useState(false);
  const [keyword, setKeyword] = useState("");
  const { theme, setTheme } = useTheme();

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // 拼接搜索路径并进行跳转
      const url = `/search?keywords=${encodeURIComponent(keyword)}`;
      router.push(url);
    }
  };
  const router = useRouter();
  const userDataStr = localStorage.getItem("userData");
  const userData = JSON.parse(userDataStr);

  return (
    <>
      <motion.div
        className="fixed w-full"
        initial={{ top: -1000 }}
        animate={{ top: search ? [-1000, 36] : -1000 }}
      >
        <div className="max-w-md mx-auto">
          <div className="relative flex flex-row">
            <div className="absolute text-neutral-600 dark:text-neutral-400 left-2 top-2.5 z-[40]">
              <Search />
            </div>
            <input
              type="search"
              className="bg-white/75 dark:bg-black/75 backdrop-blur-lg rounded-lg px-10 py-2 font-medium text-lg focus:outline-none"
              placeholder="按回车搜索"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ y: [50, 0] }}
        transition={{ type: "spring", duration: 1.5 }}
        className="z-[100] bg-white/75 dark:bg-black/50 rounded-lg backdrop-blur-3xl border-neutral-300/50 dark:border-neutral-700/75 text-sm md:text-base sm:text-base bottom-0 md:bottom-4 sm:bottom-6 fixed inset-x-0 max-w-[23.5rem] md:max-w-[28rem] sm:max-w-[28rem] overflow-x-auto inline-flex mx-auto px-4 md:px-1.5 sm:px-1.5 py-1"
      >
        <div className="flex flex-row space-x-1">
          <NavButton onClick={() => router.push("/explore")}>
            <Hash />
          </NavButton>
          <NavButton onClick={() => router.push("/listen-now")}>
            <Layers />
          </NavButton>
          <NavButton onClick={() => router.push("/list")}>
            <List />
          </NavButton>
          <NavButton
            onClick={() => router.push(userData ? "/dashboard" : "/login")}
          >
            <User />
          </NavButton>
          <NavButton onClick={() => setSearch(search === true ? false : true)}>
            <Search />
          </NavButton>
          <NavButton
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "light" && <Moon />}
            {theme === "dark" && <Sun />}
            {theme === "system" && <Globe />}
          </NavButton>
          <div className="ml-2">
            <Player />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;
