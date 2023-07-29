import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function BlurImage({ src, desc }) {
  const [ref, inView] = useInView({
    triggerOnce: false, // 只触发一次动画
    threshold: 0.1, // 图片进入视口的阈值，根据需要进行调整
  });

  return (
    <div className="overflow-x-auto">
      <motion.img
        ref={ref}
        src={src}
        className="rounded-xl w-full"
        initial={{ filter: "blur(16px)" }}
        animate={inView ? { filter: "blur(0px)" } : { filter: "blur(16px)" }}
        transition={{ duration: 0.5, delay: 0.5 }}
      />
      <p className="text-base opacity-75 -mt-6">{desc}</p>
    </div>
  );
}

