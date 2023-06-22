import { useEffect, useState } from 'react';

import '../styles/global.css'
import '@fontsource-variable/syne';
import { ThemeProvider } from 'next-themes';

export default function MyApp({ Component, pageProps }) {
    const [showChild, setShowChild] = useState(false);
    useEffect(() => {
        setShowChild(true)
    }, [])

    if (!showChild) {
        return (
            <div>
                loading...
            </div>
        )
    }
    return (
        <ThemeProvider attribute='class'>
            <Component {...pageProps} />
        </ThemeProvider>
    )
}