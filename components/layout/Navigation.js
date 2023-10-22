import nav from "@/lib/nav.config";
import { Drawer } from "vaul";
import Link from "next/link";
import { useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";

export default function Navigation() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const { theme, setTheme } = useTheme();

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // 拼接搜索路径并进行跳转
      const url = `/search?keywords=${encodeURIComponent(keyword)}`;
     router.push(url);
    }
  };
  return (
    <Drawer.Root shouldScaleBackground>
      <Drawer.Trigger asChild>
        <button
          type="button"
          className="text-sm rounded-full px-4 py-1 border hover:bg-neutral-100 dark:hover:bg-neutral-900 dark:border-neutral-800 cursor-pointer"
        >
          Menu
        </button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 dark:bg-white/10" />
        <Drawer.Content className="z-[9999] bg-white dark:bg-black flex flex-col rounded-t-xl h-full mt-24 max-h-[90%] fixed bottom-0 left-0 right-0">
          <div className="p-4 bg-white dark:bg-black rounded-t-[10px] flex-1">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8" />
            <div className="max-w-3xl mx-auto p-8 flex flex-col space-y-6">
              <input
                className="bg-white dark:bg-black font-semibold text-3xl focus:outline-none"
                placeholder="Press Enter to Search..."
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                onKeyPress={handleKeyPress}
              />
              {nav.map((nav) => {
                return (
                  <Link href={nav.href} className="font-semibold text-3xl">
                    {nav.title}
                  </Link>
                );
              })}{" "}
              <button
                className="font-semibold text-3xl text-left"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? "Lightmode" : "Darkmode"}
              </button>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
