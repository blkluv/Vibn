import "../styles/globals.css";
import "../styles/clock.css";

import { useState, useEffect } from "react";
import { ThemeProvider } from 'next-themes';

function MyApp({ Component, pageProps }) {
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true)
  }, [])

  if (!showChild) {
    return null
  }
  return (
    <ThemeProvider themes={['yellow','pink','green']} attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp;
