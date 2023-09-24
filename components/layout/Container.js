import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Container({ children, title }) {
  const router = useRouter();
  return (
    <div className="leading-relaxed text-justify text-align-last-right hyphen-auto">
      <Head>
        <title>{title}</title>
      </Head>
      <AnimatePresence initial={false}>
        <motion.main
          key={router.asPath}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1] }}
          exit={{ opacity: 0 }}
          className="max-w-2xl mx-auto px-6 py-28 md:py-32 sm:py-36"
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </div>
  );
}
