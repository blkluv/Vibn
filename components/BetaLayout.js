import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "./Navbar";

export default function BetaLayout({ children, title }) {
  return (
    <div className="selection:bg-neutral-200 dark:selection:bg-neutral-800 scroll-smooth tracking-wider">
      <Head>
        <title>{title}</title>
      </Head>

      <div className="max-w-2xl px-6 py-24 md:py-36 sm:py-32 mx-auto">
        {children}
      </div>

    </div>
  );
}