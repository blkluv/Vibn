import Head from "next/head";
import moment from "moment";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import Link from "next/link";
import nav from "@/lib/nav.config";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Layout({ title, children }) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  return (
    <div className="selection:bg-zinc-200 dark:selection:bg-zinc-800">
      <Head>
        <title>{title}</title>
      </Head>

      <div className="max-w-[45rem] px-6 mx-auto flex flex-row justify-between mt-16">
        <div className="flex flex-row space-x-4">
          {nav.map((nav) => (
            <button className="">
              <Link
                href={nav.href}
                className={cn(
                  "",
                  router.asPath === nav.href
                    ? "font-semibold opacity-100 border-b-2 border-b-zinc-300 dark:border-b-zinc-700"
                    : "opacity-75"
                )}
              >
                {nav.title}
              </Link>
            </button>
          ))}
        </div>
        <div className="flex flex-row space-x-4">
          <button
            alt="sitemap"
            className="opacity-75 hover:opacity-100 transition-all duration-300 focus:ring-4 dark:focus:ring-zinc-700 dark:focus:bg-zinc-800 dark:hover:bg-zinc-800 focus:ring-zinc-300 rounded-md p-1 hover:bg-zinc-100 focus:bg-zinc-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-[1.1rem] h-[1.1rem] main-grid-item-icon"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            >
              <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
              <line x1="8" x2="8" y1="2" y2="18" />
              <line x1="16" x2="16" y1="6" y2="22" />
            </svg>
          </button>
          <button
            alt="toogle theme"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="opacity-75 hover:opacity-100 transition-all duration-300 focus:ring-4 dark:focus:ring-zinc-700 dark:focus:bg-zinc-800 dark:hover:bg-zinc-800 focus:ring-zinc-300 rounded-md p-1 hover:bg-zinc-100 focus:bg-zinc-100"
          >
            {theme === "light" && (
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  class="w-[1.1rem] h-[1.1rem] main-grid-item-icon"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              </div>
            )}
            {theme === "dark" && (
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  class="w-[1.1rem] h-[1.1rem] main-grid-item-icon"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                >
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" x2="12" y1="1" y2="3" />
                  <line x1="12" x2="12" y1="21" y2="23" />
                  <line x1="4.22" x2="5.64" y1="4.22" y2="5.64" />
                  <line x1="18.36" x2="19.78" y1="18.36" y2="19.78" />
                  <line x1="1" x2="3" y1="12" y2="12" />
                  <line x1="21" x2="23" y1="12" y2="12" />
                  <line x1="4.22" x2="5.64" y1="19.78" y2="18.36" />
                  <line x1="18.36" x2="19.78" y1="5.64" y2="4.22" />
                </svg>
              </div>
            )}
          </button>
        </div>
      </div>

      <main className="max-w-[45rem] px-6 mx-auto mt-8 mb-16 prose dark:prose-invert">
        <main>{children}</main>
      </main>
    </div>
  );
}
