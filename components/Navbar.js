import { useEffect, useState } from 'react';
import Link from 'next/link';
import nav from '@/lib/nav.config';
import Menu from './Menu';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className='top-0 sticky w-full bg-black text-white px-4'>
            <div className='max-w-6xl mx-auto flex justify-between'>
                <div className='flex flex-row space-x-6'>
                    <button onClick={() => setIsOpen(isOpen === false ? true : false)}>
                        {isOpen === false ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        )}
                    </button>
                    <Link href="/" className='bg-red-600 px-2 py-2'>
                        <h1 className="font-bold">IKER</h1>
                    </Link>
                    {nav.map((nav) => (
                        <button className='hidden md:block sm:block'>
                            <Link href={nav.href}>{nav.text}</Link>
                        </button>
                    ))}
                </div>
                <div className='flex flex-row space-x-6 py-2'>
                    <button className='flex flex-row space-x-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mt-0.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                        <span>搜索</span>
                    </button>
                    <button>
                        直播
                    </button>
                </div>
            </div>
            <div className='z-[9999]'>
                {isOpen === true && (
                    <Menu />
                )}
            </div>
        </div>
    )
}