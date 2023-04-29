import "../styles/globals.css";
import "../styles/clock.css";

import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'

import { useState, useEffect } from "react";
import { ChakraProvider } from '@chakra-ui/react';

import Navbar from '../components/Navbar';
import Footer from "../components/Footer";

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
      <Component {...pageProps} />
      <Footer />
    </ChakraProvider>
  )
}

export default MyApp;
