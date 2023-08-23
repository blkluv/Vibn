import { useEffect, useState } from "react";
import "../styles/global.css";

import 'inter-ui/inter-latin.css'

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
    <ThemeProvider attribute="class" defaultTheme="system">
      <Component {...pageProps} />
      <Analytics />
    </ThemeProvider>
  );
}
