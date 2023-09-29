import { useTheme } from "next-themes";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

let allTabs = [
  {
    id: "/",
    name: "Home",
  },
  {
    id: "/blog",
    name: "Blog",
  },
  {
    id: "/design",
    name: "Design",
  },
];

export const Navbar = () => {
  const tabsRef = useRef([]);
  const [activeTabIndex, setActiveTabIndex] = useState();
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  if (router.asPath.includes("/blog/")) {
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1], filter: ["blur(10px)", "blur(0px)"] }}
      transition={{ duration: 1, delay: 0.9 }}
      className="z-50 text-sm md:text-base sm:text-base bottom-2 md:bottom-4 sm:bottom-6 fixed inset-x-0 max-w-[19.5rem] md:max-w-[23rem] sm:max-w-[23rem] justify-center items-center w-auto h-[3.125rem] inline-flex mx-auto space-x-1 py-1"
    >
      <span
        className="absolute bottom-0 top-0 -z-10 flex overflow-hidden py-2 transition-all duration-300"
        style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
      >
        <span className="h-full w-full bg-black dark:bg-white rounded-full" />
      </span>
      {allTabs.map((tab, index) => {
        const isActive = router.asPath === tab.id;

        return (
          <button
            key={index}
            ref={(el) => (tabsRef.current[index] = el)}
            className={`${
              isActive ? `text-white dark:text-black` : `opacity-75 hover:opacity-100`
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
        className="my-auto cursor-pointer select-none rounded-full px-4 text-center flex flex-row space-x-2 -ml-4"
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
        <span className="flex">
          <span className="hidden md:block sm:block">Theme</span>
        </span>
      </button>
    </motion.div>
  );
};

export default Navbar;
