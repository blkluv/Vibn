import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Layout({ title, children }) {
  const router = useRouter();
  return (
    <div
      className={cn('text-left',
        router.asPath === '/' ? 'text-white bg-[#030305] min-h-screen' : 'bg-zinc-100 min-h-screen'
      )}>
      <Head>
        <title>{title}</title>
      </Head>

      <div className="max-w-2xl  mx-auto px-6 sm:py-20 py-10">
        <div className="flex flex-row">
          <div>
            <Link href="/" className="no-underline">
              <h1 className="no-underline">Geng Yue</h1>
            </Link>
            <h2 className="opacity-75">Self-taught Developer</h2>
            <h2 className="opacity-75">Yantai, Shandong</h2>
          </div>
        </div>
        <main className="mt-16">
          {children}
        </main>
      </div>
    </div>
  )
}
