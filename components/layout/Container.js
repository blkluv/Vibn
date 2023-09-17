import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import BlogList from "../ui/BlogList";
import AboutList from "../ui/AboutList";

export default function Container({ children, title, posts }) {
  const router = useRouter();
  return (
    <div className="whitespace-no-wrap break-words flex">
      <Head>
        <title>{title}</title>
      </Head>
      <div className="px-8 md:px-8 py-4 md:py-4 sm:p-8 flex flex-row space-x-8 w-full md:w-full sm:w-1/3 absolute md:absolute sm:static top-0">
        <h1
          className="hover:opacity-75 hover:cursor-pointer"
          onClick={() => router.push("/")}
        >
          Geng Yue
        </h1>
        <p className="opacity-75">Student</p>
      </div>
      <AnimatePresence initial={false}>
        <div className="p-8 mt-8 md:mt-8 sm:mt-0 w-full md:w-2/3 sm:w-1/3 mx-auto">
          <motion.main
            key={router.asPath}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1] }}
            exit={{ opacity: 0 }}
            className="max-w-xl mx-auto"
          >
            {children}
          </motion.main>
        </div>
      </AnimatePresence>
      <div className="hidden md:flex sm:flex w-auto md:w-1/3 sm:w-1/3 p-8 sticky top-0 justify-end">
        <div className="w-1/2">
          <BlogList posts={posts} />
        </div>
      </div>
    </div>
  );
}
