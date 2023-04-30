import "../styles/globals.css";
import "../styles/clock.css";
import "../styles/prism.css"

import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'

import { useState, useEffect } from "react";
import { ChakraProvider } from '@chakra-ui/react';
import { PageTransition } from 'next-page-transitions'

import Navbar from '../components/Navbar';
import Footer from "../components/Footer";

const TIMEOUT = 400

function MyApp({ Component, pageProps }) {
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true)
  }, [])

  if (!showChild) {
    return null
  }
  return (
    <ChakraProvider>
      <Navbar />
      <PageTransition
        timeout={TIMEOUT}
        classNames="page-transition"
        loadingDelay={500}
        loadingTimeout={{
          enter: TIMEOUT,
          exit: 0,
        }}
        loadingClassNames="loading-indicator"
      >
        <Component {...pageProps} />
      </PageTransition>
      <Footer />
      <style jsx global>{`
        .page-transition-enter {
          opacity: 0;
          transform: translate3d(0, 20px, 0);
        }
        .page-transition-enter-active {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          transition: opacity ${TIMEOUT}ms, transform ${TIMEOUT}ms;
        }
        .page-transition-exit {
          opacity: 1;
        }
        .page-transition-exit-active {
          opacity: 0;
          transition: opacity ${TIMEOUT}ms;
        }
        .loading-indicator-appear,
        .loading-indicator-enter {
          opacity: 0;
        }
        .loading-indicator-appear-active,
        .loading-indicator-enter-active {
          opacity: 1;
          transition: opacity ${TIMEOUT}ms;
        }
      `}</style>
    </ChakraProvider>
  )
}

export default MyApp;
