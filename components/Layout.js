import Head from "next/head";
import moment from "moment";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import Link from "next/link";
import nav from "@/lib/nav.config";
import { motion } from "framer-motion";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Layout({ title, subtitle, children }) {
  const { theme, setTheme } = useTheme();
  const buildTime = process.env.BUILD_TIME;
  const router = useRouter();
  if (router.asPath.includes("/posts/")) {
    router.asPath = "/writing";
  }
  return (
    <div className="text-black dark:text-white selection:bg-black dark:selection:bg-white selection:text-white dark:selection:text-black scroll-smooth">
      <Head>
        <title>{title}</title>
      </Head>

      <div className="flex flex-col px-4 md:px-8 sm:px-12 py-4">
        <h1>Geng Yue</h1>
        <div className="mt-4 z-50 sticky top-0 flex flex-row justify-between">
          <h1>{subtitle}</h1>
          <div className="flex flex-row space-x-6">
            <button>Now</button>
            <button>Menu</button>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 300 }}
      >
        <main className="px-4 md:px-8 sm:px-12 py-8">{children}</main>
      </motion.div>

      <footer className="px-4 md:px-8 sm:px-12 py-4">
        <div className="flex flex-col md:flex-row sm:flex-row justify-between">
          <div className="flex space-x-1.5 order-1 md:order-2 sm:order-2">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                class="main-grid-item-icon"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              >
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
            </div>
            <span>Site last built {buildTime}</span>
          </div>
          <div className="order-2 md:order-1 sm:order-1">
            <p>Copyright © 2023 All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
