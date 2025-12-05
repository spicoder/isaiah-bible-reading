'use client';
import { motion, useScroll } from 'framer-motion';

export const ProgressBar = () => {
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed top-0 left-0 right-0 h-2 bg-stone-200 z-50 origin-left">
      <motion.div
        className="h-full bg-gradient-to-r from-amber-400 to-red-500"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
};