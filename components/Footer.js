import site from "../lib/me"
import Clock from "react-clock"
import { useState, useEffect } from 'react'

export default function Footer() {
    const [value, setValue] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setValue(new Date()), 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);
    return (
        <div className="px-6 py-8 -mt-16 max-w-[56.5rem] mx-auto">
            <div className="flex flex-row justify-between">
                <div className="w-1/2 flex flex-col">
                    <h1 className="text-3xl">Navigation</h1>
                </div>
                <div className="w-1/2 flex flex-col">

                </div>
            </div>
        </div>
    )
}