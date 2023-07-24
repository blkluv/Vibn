import { useEffect, useState } from "react";
import "../styles/global.css";

import "@fontsource/noto-sans-sc/400.css";
import "@fontsource/noto-sans-sc/500.css";
import "@fontsource/noto-sans-sc/700.css";
import "@fontsource-variable/inter";

import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "@/components/Navbar";

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
      <Navbar />
      <Analytics />
    </ThemeProvider>
  );
}
