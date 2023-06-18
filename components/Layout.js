import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Layout({ title, children }) {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
  
        <main className="max-w-6xl px-4 mx-auto mt-8">
          {children}
        </main>

    </div>
  )
}
