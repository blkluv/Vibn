import BetaLayout from "@/components/BetaLayout";
import { motion } from "framer-motion";
import Link from 'next/link'

export default function Error() {
  return (
    <BetaLayout title="找不到此页面">
      <h1 className="font-medium text-3xl mb-8">
        404 - 找不到此页面
      </h1>

      <p className="">大概哪里出问题了，不妨刷新？</p>

      <Link href="/" className="no-underline">
        <motion.button className="flex flex-row bg-zinc-100 dark:bg-zinc-900 rounded-xl px-8 py-2 text-center mt-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 mt-1 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
            />
          </svg>

          <span className="no-underline font-medium text-opacity-75">回到主页</span>
        </motion.button>
      </Link>
    </BetaLayout>
  );
}
