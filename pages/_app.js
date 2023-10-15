import { useEffect, useState } from "react";
import "../styles/global.css";
import "../styles/player.css";
import "../styles/simplebar.min.css";
import { AnimatePresence } from "framer-motion";

import { ThemeProvider } from "next-themes";
import "@fontsource/noto-sans-sc/400.css";
import "@fontsource/noto-sans-sc/500.css";
import "@fontsource/noto-sans-sc/700.css";

import Player from "@/components/layout/Player";
import { SongIdsProvider } from "@/components/layout/SongIdsContext";

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
          <Component {...pageProps} />
        </AnimatePresence>
        <Player />
      </SongIdsProvider>
    </ThemeProvider>
  );
}
