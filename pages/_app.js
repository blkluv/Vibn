import { useEffect, useState } from 'react';
import '../styles/global.css'

import '@fontsource-variable/inter'

import { ThemeProvider } from 'next-themes';

export default function MyApp({ Component, pageProps }) {
    const [showChild, setShowChild] = useState(false);
    useEffect(() => {
        setShowChild(true)
    }, [])

    if (!showChild) {
        return null
    }
    return (
        <ThemeProvider attribute='class' defaultTheme='light'>
            <Component {...pageProps} />
        </ThemeProvider>
    )
}