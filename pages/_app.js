import { useEffect, useState } from 'react';

import '../styles/global.css'
import '@fontsource/noto-serif-sc/300.css';
import '@fontsource/noto-serif-sc/400.css';
import '@fontsource/noto-serif-sc/500.css';
import '@fontsource/noto-serif-sc/600.css';
import '@fontsource/noto-serif-sc/700.css';

import Navbar from '@/components/Navbar';
import Menu from '@/components/Menu';


export default function MyApp({ Component, pageProps }) {
    const [showChild, setShowChild] = useState(false);
    useEffect(() => {
        setShowChild(true)
    }, [])

    if (!showChild) {
        return (
            <div>
                <Navbar />
                <div className='max-w-6xl mx-auto center py-32'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-48 h-48 center my-64">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                    <p className='opacity-75 text-center'>如果持续显示本页，请尝试刷新</p>
                </div>
                <Menu />
            </div>
        )
    }
    return (
        <div>
            <Navbar />
            <Component {...pageProps} />
            <Menu />
        </div>
    )
}