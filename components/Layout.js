import Head from "next/head";
import moment from "moment";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import Link from "next/link";
import nav from "@/lib/nav.config";
import { motion, useScroll, useSpring } from "framer-motion";
import { useState } from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Layout({ title, desc, children }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  if (router.asPath.includes("/posts/")) {
    router.asPath = "/writing";
  }
  return (
    <div className="text-black dark:text-white selection:bg-zinc-200 dark:selection:bg-zinc-800 scroll-smooth">
      <Head>
        <title>{title}</title>
      </Head>

      <motion.div
        className="fixed w-full top-0 left-0 right-0 origin-left py-0.5 bg-black dark:bg-white z-[99999]"
        style={{ scaleX }}
      />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
      >
        <main className="text-black dark:text-white px-2 max-w-3xl mx-auto py-16">
          <div>{children}</div>
        </main>
      </motion.div>
      <motion.footer
        initial={{ opacity: 1, y: 45 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        className="bg-white/75 dark:bg-black/50 backdrop-blur-lg fixed bottom-0 w-full"
      >
        <div className="max-w-3xl mx-auto font-medium flex flex-row px-6 md:px-4 sm:px-4 py-2.5 justify-between">
          <div className="flex flex-row space-x-4 text-sm opacity-75 mt-0.5 md:mt-1 sm:mt-1">
            {nav.map((nav) => (
              <>
                <Link href={nav.href}>
                  {">"} {nav.title}
                </Link>
              </>
            ))}
          </div>
          <div className="flex flex-row space-x-4">
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              <svg
                width="15"
                height="15"
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
            <Link
              href="https://github.com/Cloudflare233"
              className="mt-0.5 md:mt-1 sm:mt-1"
            >
              <button>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </Link>
            <Link
              href="mailto:Cloudflare233@yandex.com"
              className="mt-0.5 md:mt-1 sm:mt-1"
            >
              <button>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 2C0.447715 2 0 2.44772 0 3V12C0 12.5523 0.447715 13 1 13H14C14.5523 13 15 12.5523 15 12V3C15 2.44772 14.5523 2 14 2H1ZM1 3L14 3V3.92494C13.9174 3.92486 13.8338 3.94751 13.7589 3.99505L7.5 7.96703L1.24112 3.99505C1.16621 3.94751 1.0826 3.92486 1 3.92494V3ZM1 4.90797V12H14V4.90797L7.74112 8.87995C7.59394 8.97335 7.40606 8.97335 7.25888 8.87995L1 4.90797Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
