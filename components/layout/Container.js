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
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{
            opacity: [0, 1],
            scale: [1.05, 1],
            filter: ["blur(10px)", "blur(0px)"],
          }}
          exit={{ opacity: [1, 0], scale: [1, 1.05] }}
          transition={{ duration: 1 }}
          className="max-w-2xl mx-auto px-8 py-16 md:py-32 sm:py-36"
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </div>
  );
}
