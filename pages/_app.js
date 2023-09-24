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
      <Analytics />
    </ThemeProvider>
  );
}
