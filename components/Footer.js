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
        <div className="text-[0.95rem] inter opacity-70 bottom-0 w-full border-t dark:border-t-zinc-800 py-3">
            <div className="max-w-[37.5rem] px-5 md:px-0 sm:px-0 mx-auto text-sm flex flex-row justify-between">
                <div className="opacity-75 mt-0.5">
                    <span>{site.now}</span>
                </div>
                <div className="opacity-75 flex flex-row space-x-4">
                    <span>2023</span>
                    <Clock
                        hourHandLength="60"
                        minuteHandLength="75"
                        hourHandWidth="1"
                        minuteHandWidth="1"
                        secondHandLength="85"
                        size="27"
                        className="-mt-[0.1rem]"
                        value={value} />
                </div>
            </div>
        </div>
    )
}