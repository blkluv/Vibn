import Head from "next/head";
import Link from "next/link";
import { useTheme } from "next-themes";
import * as ScrollArea from '@radix-ui/react-scroll-area';
import Blur from './Blur'
import Footer from "./Footer";


function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Layout = ({ children, title}) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <Blur />
      <div
        className={cn(
          'bg-white dark:bg-zinc-950 px-6 py-20 md:py-24 sm:py-28'
        )}>
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <Link href="/" className="border-none">
              <div className="text-4xl">
                <h1 className="font-medium border-none no-underline serif italic">Geng Yue</h1>
                <p className="opacity-75 serif italic">A real & constant iker</p>
              </div>
            </Link>
          </div>

          <div className="opacity-50 text-lg mb-16">
            <p className="flex flex-row">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mt-0.5">
                <path d="M11.983 1.907a.75.75 0 00-1.292-.657l-8.5 9.5A.75.75 0 002.75 12h6.572l-1.305 6.093a.75.75 0 001.292.657l8.5-9.5A.75.75 0 0017.25 8h-6.572l1.305-6.093z" />
              </svg>
              <span className="ml-1">Site last build on Apr 9, 2023</span>
            </p>
            <p className="flex flex-row">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mt-0.5">
                <path fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              <span className="ml-1">© 2023 All rights reserved.</span>
            </p>
          </div>
          <main className="text-lg">
            {children}
          </main>
        </div>
      </div>
      <Footer />
    </div >
  )
}

export default Layout

