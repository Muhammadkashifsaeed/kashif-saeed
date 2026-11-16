'use client';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[80] pointer-events-none">
      <motion.div
        style={{ scaleX }}
        className="h-full origin-left bg-gradient-to-r from-[#06b6d4] via-[#22c55e] to-[#d2ff28] shadow-[0_0_12px_rgba(210,255,40,0.85)]"
        aria-hidden="true"
      />
    </div>
  );
}
