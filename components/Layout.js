import Head from "next/head";
import moment from "moment";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import Link from "next/link";
import nav from '@/lib/nav.config';

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Layout({ title, children }) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>

      <div className="max-w-[45rem] px-6 mx-auto">
        <div className="flex flex-row space-x-4 mt-16">
          {nav.map((nav) => (
            <button className="">
              <Link 
              href={nav.href}
              className={cn('',
              router.asPath === nav.href ? 'font-semibold opacity-100 border-b-2' : 'opacity-75' )}
              >{nav.title}</Link>
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-[45rem] px-6 mx-auto mt-8 mb-16 prose">
        <main>{children}</main>
      </main>
    </div>
  );
}
