import Head from "next/head";
import moment from "moment";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import Link from "next/link";
import nav from "@/lib/nav.config";
import { motion } from "framer-motion";
import { useState } from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Layout({ title, subtitle, children }) {
  const [open, setOpen] = useState(false);
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
        <Link href="/">
          <h1>Geng Yue</h1>
        </Link>
        <div className="mt-4 z-50 sticky top-0 flex flex-row justify-between">
          <Link href={router.asPath}>
            <h1>{subtitle}</h1>
          </Link>
          <div className="flex flex-row space-x-6">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <svg
                className="w-4 h-4 -mt-0.5"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM7.49988 1.82689C4.36688 1.8269 1.82707 4.36672 1.82707 7.49972C1.82707 10.6327 4.36688 13.1725 7.49988 13.1726V1.82689Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <button onClick={() => setOpen(true)}>Menu</button>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5 }}
        className={cn(
          "fixed top-0 right-0 w-full md:w-1/3 sm:w-1/4  bg-white dark:bg-black z-50 h-full py-14",
          open === false ? "hidden" : "block"
        )}
      >
        <div className="flex flex-row space-x-6 ml-[16.55rem] md:ml-36 sm:ml-[16.55rem]">
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <svg
              className="w-4 h-4 -mt-0.5"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM7.49988 1.82689C4.36688 1.8269 1.82707 4.36672 1.82707 7.49972C1.82707 10.6327 4.36688 13.1725 7.49988 13.1726V1.82689Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <button onClick={() => setOpen(false)}>Close</button>
        </div>

        <div className="my-10 text-3xl md:text-lg sm:text-lg">
          {nav.map((nav) => {
            return (
              <div className="px-8">
                <Link href={nav.href}>{nav.title}</Link>
              </div>
            );
          })}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
      >
        <main className="text-black dark:text-white px-4 md:px-8 sm:px-12 py-8">
          {children}
        </main>
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
