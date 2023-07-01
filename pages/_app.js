import { useEffect, useState } from 'react';
import '../styles/global.css'

import '@fontsource/aileron/400.css';
import '@fontsource/aileron/600.css';
import '@fontsource/aileron/400-italic.css';
import '@fontsource/aileron/600-italic.css';

import { ThemeProvider } from 'next-themes';

export default function MyApp({ Component, pageProps }) {
    const [showChild, setShowChild] = useState(false);
    useEffect(() => {
        setShowChild(true)
    }, [])

    if (!showChild) {
        return (
            <div>
                Fetching File...
            </div>
        )
    }
    return (
        <ThemeProvider attribute='class' defaultTheme='light'>
            <Component {...pageProps} />
        </ThemeProvider>
    )
}