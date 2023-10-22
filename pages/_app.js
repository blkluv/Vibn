import { useEffect, useState } from "react";
import "../styles/global.css";
import "../styles/player.css";
import "../styles/simplebar.min.css";
import { AnimatePresence } from "framer-motion";

import { ThemeProvider } from "next-themes";
import "@fontsource/noto-sans-sc/300.css";
import "@fontsource/noto-sans-sc/400.css";
import "@fontsource/noto-sans-sc/500.css";
import "@fontsource/noto-sans-sc/700.css";
import Navigation from "@/components/layout/Navigation";
import Link from "next/link";

import Player from "@/components/layout/Player";
import { SongIdsProvider } from "@/components/layout/SongIdsContext";
import { SongIdsContext } from "@/components/layout/SongIdsContext";

export default function MyApp({ Component, pageProps }) {
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }
  return (
    <ThemeProvider attribute="class">
      <SongIdsProvider>
        <AnimatePresence>
          <div className="max-w-3xl mx-auto px-4 md:px-8 sm:px-10 py-16">
            <div className="flex flex-row justify-between">
              <Link href="/">
                <h1 className="font-semibold">Music</h1>
              </Link>
              <div className="space-x-4 flex flex-row">
                <Player />
                <Navigation />
              </div>
            </div>
            <Component {...pageProps} />
          </div>
        </AnimatePresence>
      </SongIdsProvider>
    </ThemeProvider>
  );
}
