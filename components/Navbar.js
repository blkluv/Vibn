import { useTheme } from "next-themes";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

let allTabs = [
  {
    id: "/",
    name: "简介",
  },
  {
    id: "/thoughts",
    name: "想法",
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
    router.asPath = "/thoughts";
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
    <motion.div 
    initial={{ opacity: 1, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.75 }}
    className="bg-neutral-50/50 dark:bg-neutral-950/50 bottom-4 md:bottom-8 sm:bottom-8 fixed inset-x-0 backdrop-blur-lg max-w-[19rem] md:max-w-[22.9rem] sm:max-w-[22.9rem] justify-center items-center w-auto h-12 inline-flex mx-auto border-[1.5px] border-neutral-900/10 dark:border-neutral-100/5 dark:shadow-neutral-950 shadow-none rounded-full space-x-1 md:space-x-2 sm:space-x-2">
      <span
        className="absolute bottom-0 top-0 -z-10 flex overflow-hidden rounded-full py-1 transition-all duration-300"
        style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
      >
        <span className="h-full w-full rounded-full bg-neutral-200 dark:bg-neutral-900 py-2.5 md:py-4 sm:py-4" />
      </span>
      {allTabs.map((tab, index) => {
        const isActive = router.asPath === tab.id;

        return (
          <button
            key={index}
            ref={(el) => (tabsRef.current[index] = el)}
            className={`${
              isActive
                ? `text-neutral-600 dark:text-neutral-300 font-medium`
                : `text-neutral-600 dark:text-neutral-300 hover:opacity-75`
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
        className="text-neutral-600 dark:text-neutral-300 my-auto cursor-pointer select-none rounded-full px-4 text-center flex flex-row space-x-2"
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
          <span className="hidden md:block sm:block">切换主题</span>
        </span>
      </button>
    </motion.div>
  );
};

export default Navbar;
