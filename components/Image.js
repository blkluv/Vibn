import { motion } from 'framer-motion';

export default function BlurImage({ src, desc }) {
  return (
    <div className="overflow-x-auto">
      <motion.img
        src={src}
        className="rounded-xl w-full"
        initial={{ filter: 'blur(16px)' }}
        animate={{ filter: 'blur(0px)' }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />
      <p className="text-base opacity-75 -mt-6">{desc}</p>
    </div>
  );
}
