import { useEffect, useState } from "react";
import "../styles/global.css";
import { AnimatePresence } from "framer-motion";

import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";

export default function MyApp({ Component, pageProps }) {
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }
  return (
    <>
      <AnimatePresence>
        <Component {...pageProps} />
      </AnimatePresence>

      <Analytics />
    </>
  );
}
