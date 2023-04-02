import "../styles/globals.css";
import "../styles/clock.css";

import "@fontsource/inter/500.css"
import "@fontsource/tiro-bangla/latin-400.css"
import "@fontsource/tiro-bangla/latin-400-italic.css"

import { useState } from "react";
import { useEffect } from 'react'
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }) {
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true)
  }, [])

  if (!showChild) {
    return null
  }
  return (
    <ThemeProvider attribute="class" forcedTheme={Component.theme || null}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp;
