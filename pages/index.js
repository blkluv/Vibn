import BetaLayout from "@/components/BetaLayout";
import { motion } from "framer-motion";

export default function Beta() {
  return (
    <BetaLayout title="Beta Released 2023-07-27">
      <motion.h1
        initial={{ y: 25, opacity: 0 }}
        animate={{ y: 0, opacity: 1}}
        transition={{ duration: 1.5 }}
        className="text-2xl md:text-3xl sm:text-3xl leading-normal md:leading-normal sm:leading-normal"
      >
        <span className="opacity-75">耿越</span>是一名现就读于
        <a href="http://www.ytyz.net">烟台一中</a>的新高二学生。
        <span className="">自由主义者。</span>{" "}
        <span className="line-through opacity-75">可能是</span>
        <a href="https://nextjs.org">Next.js</a>业余开发者。
        <span className="opacity-75">
          各种单机<span className="line-through">老</span>游戏
        </span>
        的狂热爱好者。但<span className="opacity-75">没时间玩</span>。 偶尔
        <span className="opacity-75">研究点数学</span>。可能写点
        <a href="https://tailwindcss.com">TailwindCSS</a>。
      </motion.h1>
    </BetaLayout>
  );
}
