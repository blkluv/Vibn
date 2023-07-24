import { useTheme } from "next-themes";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";

let allTabs = [
  {
    id: "/",
    name: "简介",
  },
  {
    id: "/blog",
    name: "博客",
  },
  {
    id: "/lab",
    name: "实验室",
  },
];

export const Navbar = () => {
  const tabsRef = useRef([]);
  const [activeTabIndex, setActiveTabIndex] = useState();
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  if (router.asPath.includes("/posts/")) {
    router.asPath = "/blog";
  }

  useEffect(() => {
    const activeIndex = allTabs.findIndex((tab) => router.asPath === tab.id);
    setActiveTabIndex(activeIndex);
  }, [router.asPath]);

  useEffect(() => {
    if (activeTabIndex === null) {
      return;
    }

    const setTabPosition = () => {
      const currentTab = tabsRef.current[activeTabIndex];
      setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
      setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
    };

    setTabPosition();
  }, [activeTabIndex]);

  return (
    <div className="bg-white/50 dark:bg-black/25 bottom-8 md:bottom-14 sm:bottom-14 fixed inset-x-0 backdrop-blur-lg w-[95%] h-14 flex max-w-[35rem] mx-auto border dark:border-neutral-900 dark:shadow-neutral-950 shadow-lg rounded-full px-2 space-x-2">
      <span
        className="absolute bottom-0 top-0 -z-10 flex overflow-hidden rounded-full py-2 transition-all duration-300"
        style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
      >
        <span className="h-full w-full rounded-full bg-black dark:bg-white py-4" />
      </span>
      {allTabs.map((tab, index) => {
        const isActive = router.asPath === tab.id;

        return (
          <button
            key={index}
            ref={(el) => (tabsRef.current[index] = el)}
            className={`${
              isActive
                ? `text-white dark:text-black font-medium`
                : `hover:opacity-75`
            } my-auto cursor-pointer select-none rounded-full px-4 text-center`}
            onClick={() => {
              setActiveTabIndex(index);
              router.push(tab.id);
            }}
          >
            {tab.name}
          </button>
        );
      })}

      <button
        className="my-auto cursor-pointer select-none rounded-full px-4 text-center flex flex-row space-x-2"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mt-0.5"
        >
          <path
            d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM7.49988 1.82689C4.36688 1.8269 1.82707 4.36672 1.82707 7.49972C1.82707 10.6327 4.36688 13.1725 7.49988 13.1726V1.82689Z"
            fill="currentColor"
            fill-rule="evenodd"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span className="font-medium flex">
          <span className="hidden md:block sm:block">切换</span>主题
        </span>
      </button>
    </div>
  );
};

export default Navbar;
