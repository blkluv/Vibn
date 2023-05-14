import "../styles/globals.css";
import "../styles/clock.css";

import { useState, useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true)
  }, [])

  if (!showChild) {
    return null
  }
  return (
        <Component {...pageProps} />
  )
}

export default MyApp;
