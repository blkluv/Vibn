import { useEffect, useState } from "react";
import "../styles/global.css";
import { AnimatePresence } from "framer-motion";

import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "@/components/layout/Navbar";

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
      <AnimatePresence>
        <Component {...pageProps} />
      </AnimatePresence>
      <Navbar />
      <div className="bg-gradient-to-t from-white to-white/0 dark:from-black dark:to-black/0 fixed bottom-0 py-24 w-full pointer-events-none z-40">

      </div>
      <Analytics />
    </ThemeProvider>
  );
}
