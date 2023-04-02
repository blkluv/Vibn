import Head from "next/head";
import Link from "next/link";
import { useTheme } from "next-themes";
import * as ScrollArea from '@radix-ui/react-scroll-area';
import Blur from './Blur'
import Footer from "./Footer";


function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Layout({ children, title }) {
  const { theme, setTheme } = useTheme();
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
        <div className="max-w-[37.5rem] mx-auto">
          <div className="mb-16">
            <Link href="/" className="border-none">
              <div>
                <h1 className="font-medium border-none no-underline">Geng Yue</h1>
                <p className="opacity-75 inter">A real & constant iker</p>
              </div>
            </Link>
          </div>
          <main>
            {children}
          </main>
        </div>
      </div>
      <Footer />
    </div >
  )
}
